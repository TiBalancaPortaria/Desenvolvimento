# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from Portaria.models import Portaria, Visitante, Finalidade, Empresa
from Portaria.serializer import PortariaSerializer
from Portaria.utils.exceptions import RequiredFieldException
from drf_yasg.utils import swagger_auto_schema

class PortariaViewSet(viewsets.ModelViewSet):
    queryset = Portaria.objects.all()
    http_method_names = ['get', 'post', 'put']
    serializer_class = PortariaSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=["Portaria"])
    
    def create(self, request):
        visitante_id = request.data.get('visitante')
        data_entrada = request.data.get('data_entrada')
        data_saida = request.data.get('data_saida', None)
        placa = request.data.get('placa', None)
        finalidade_id = request.data.get('finalidade')
        nota_entrada = request.data.get('nota_entrada', [])
        nota_saida = request.data.get('nota_saida', [])
        empresa_id = request.data.get('empresa', None)
        observacao = request.data.get('observacao', None)

        if not visitante_id or not finalidade_id:
            raise RequiredFieldException()

        try:
            visitante = Visitante.objects.get(id=visitante_id)
        except Visitante.DoesNotExist:
            raise NotFound("Visitante não encontrado.")

        try:
            finalidade = Finalidade.objects.get(id=finalidade_id)
        except Finalidade.DoesNotExist:
            raise NotFound("Finalidade não encontrada.")

        try:
            empresa = Empresa.objects.get(id=empresa_id)
        except Empresa.DoesNotExist:
            empresa = None

        portaria = Portaria.objects.create(
            visitante=visitante,
            placa=placa,
            finalidade=finalidade,
            empresa=empresa,
            observacao=observacao,
            data_entrada=data_entrada,
            data_saida=data_saida,
        )

        if nota_entrada:
            portaria.nota_entrada.set(nota_entrada)

        if nota_saida:
            portaria.nota_saida.set(nota_saida)

        serializer = PortariaSerializer(portaria)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @swagger_auto_schema(tags=["Portaria"])
    def update(self, request, pk=None):
        try:
            portaria = Portaria.objects.get(pk=pk)
        except Portaria.DoesNotExist:
            raise NotFound("Portaria não encontrada.")

        data_saida = request.data.get('data_saida')
        nota_saida = request.data.get('nota_saida', [])
        observacao = request.data.get('observacao', None)

        if not data_saida:
            raise RequiredFieldException()

        portaria.data_saida = data_saida
        portaria.observacao = observacao
        portaria.nota_saida.set(nota_saida)
        portaria.save()

        serializer = PortariaSerializer(portaria)
        return Response(serializer.data)

    @swagger_auto_schema(tags=["Portaria"])
    def list(self, request):
        visitante_id = request.query_params.get('visitante', None)
        finalidade_id = request.query_params.get('finalidade', None)
        empresa_id = request.query_params.get('empresa', None)

        if visitante_id:
            queryset = queryset.filter(visitante__id=visitante_id)
        if finalidade_id:
            queryset = queryset.filter(finalidade__id=finalidade_id)
        if empresa_id:
            queryset = queryset.filter(empresa__id=empresa_id)

        serializer = PortariaSerializer(queryset, many=True)
        return Response(serializer.data)
    