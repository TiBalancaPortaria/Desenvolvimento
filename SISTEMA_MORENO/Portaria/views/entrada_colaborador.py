from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from django.core.cache import cache
from django.db.models import Subquery, OuterRef
from django.utils import timezone
from rest_framework.response import Response
from django.utils.dateparse import parse_date
from Portaria.models import EntradaColaborador, RHFuncionario
from Portaria.serializer import PortariaColaboradorSerializer

class CustomPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 200

class PortariaColaboradorViewSet(viewsets.ModelViewSet):
    serializer_class = PortariaColaboradorSerializer
    http_method_names = ['get', 'post']
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Subquery para pegar o nome do colaborador ativo correspondente ao crachá
        colaborador_nome = RHFuncionario.objects.filter(
            fun_chapa=OuterRef("rh_func_chapa"),
            fun_status='A'   # <-- ESSA LINHA É FUNDAMENTAL
        ).values("fun_nome")[:1]

        queryset = EntradaColaborador.objects.annotate(
            colaborador_nome=Subquery(colaborador_nome)
        ).order_by('-horario_registrado')

        # Filtros via query params
        cracha = self.request.query_params.get("cracha")
        nome = self.request.query_params.get("nome")
        data = self.request.query_params.get("data")  # apenas uma data

        if cracha:
            queryset = queryset.filter(rh_func_chapa__icontains=cracha)

        if nome:
            chaps_filtrados = RHFuncionario.objects.filter(
                fun_nome__icontains=nome,
                fun_status='A'
            ).values_list("fun_chapa", flat=True)
            queryset = queryset.filter(rh_func_chapa__in=chaps_filtrados)

        if data:
            queryset = queryset.filter(horario_registrado__date=parse_date(data))

        return queryset

    @swagger_auto_schema(tags=["Entrada_colaboradores"])
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data["data_registro"] = timezone.now()

        rh_func_chapa = data.get('rh_func_chapa')

        # Cache do colaborador por 5 minutos
        cache_key = f"colaborador_{rh_func_chapa}"
        colaborador = cache.get(cache_key)

        if not colaborador:
            colaborador = RHFuncionario.objects.filter(
                fun_chapa=rh_func_chapa,
                fun_status='A'
            ).first()

            if colaborador:
                cache.set(cache_key, colaborador, 300)
            else:
                return Response(
                    {"error": "Colaborador não encontrado ou não ativo."},
                    status=status.HTTP_404_NOT_FOUND
                )

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Limpar cache relacionado após criação
        cache.delete(f"entradas_colaborador_{rh_func_chapa}")

        return Response(serializer.data, status=201)

    @swagger_auto_schema(tags=["Entrada_colaboradores"])
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        chapa = request.query_params.get('rh_func_chapa')
        data_inicio = request.query_params.get('data_inicio')
        data_fim = request.query_params.get('data_fim')

        if chapa:
            queryset = queryset.filter(rh_func_chapa=chapa)

        if data_inicio:
            queryset = queryset.filter(data_registro__gte=data_inicio)
        if data_fim:
            queryset = queryset.filter(data_registro__lte=data_fim)

        if not any([chapa, data_inicio, data_fim]):
            from datetime import timedelta
            thirty_days_ago = timezone.now() - timedelta(days=30)
            queryset = queryset.filter(data_registro__gte=thirty_days_ago)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    @swagger_auto_schema(tags=["Entrada_colaboradores"])
    def colaborador_hoje(self, request):
        chapa = request.query_params.get('rh_func_chapa')
        if not chapa:
            return Response({"error": "rh_func_chapa é obrigatório"}, status=400)

        cache_key = f"colaborador_hoje_{chapa}_{timezone.now().date()}"
        data = cache.get(cache_key)

        if not data:
            hoje = timezone.now().date()
            queryset = self.get_queryset().filter(
                rh_func_chapa=chapa,
                data_registro__date=hoje
            )
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data
            cache.set(cache_key, data, 60)

        return Response(data)

    @action(detail=False, methods=['get'])
    @swagger_auto_schema(tags=["Entrada_colaboradores"])
    def recentes(self, request):
        cache_key = "entradas_recentes"
        data = cache.get(cache_key)

        if not data:
            queryset = self.get_queryset()[:100]
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data
            cache.set(cache_key, data, 30)

        return Response(data)
