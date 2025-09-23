# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from Portaria.models import Empresa
from Portaria.serializer import EmpresaSerializer
from Portaria.utils.exceptions import RequiredFieldException
from drf_yasg.utils import swagger_auto_schema

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    http_method_names = ['get', 'post']
    serializer_class = EmpresaSerializer
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(tags=["Empresa"])
    def create(self, request):
        nome = request.data.get('nome')
        cnpj = request.data.get('cnpj')
        cep = request.data.get('cep')
        telefone = request.data.get('telefone', None)

        if not nome or not cnpj or not cep:
            raise RequiredFieldException()

        empresa = Empresa.objects.create(nome=nome, cnpj=cnpj, cep=cep, telefone=telefone)
        serializer = EmpresaSerializer(empresa)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @swagger_auto_schema(tags=["Empresa"])
    def list(self, request):
        nome = request.query_params.get('nome', None)
        if nome:
            empresas = Empresa.objects.filter(nome__icontains=nome)
        else:
            empresas = Empresa.objects.all()
        serializer = EmpresaSerializer(empresas, many=True)
        return Response(serializer.data)
