from Portaria.permissions import IsRH
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from Portaria.models import RHFuncionario
from Portaria.serializer import RHFuncionarioSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache
from rest_framework.pagination import PageNumberPagination

class FuncionarioPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'  
    max_page_size = 200

class RHFuncionarioViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RHFuncionario.objects.all()
    serializer_class = RHFuncionarioSerializer
    permission_classes = [IsAuthenticated, IsRH]
    pagination_class = FuncionarioPagination  
    http_method_names = ['get']

    def get_queryset(self):
        queryset = super().get_queryset()
        cracha = self.request.query_params.get("cracha")
        nome = self.request.query_params.get("nome")
        if cracha:
            queryset = queryset.filter(fun_chapa__icontains=cracha)
        if nome:
            queryset = queryset.filter(fun_nome__icontains=nome)
        return queryset
