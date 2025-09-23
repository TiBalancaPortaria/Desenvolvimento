# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from Portaria.models import Visitante
from Portaria.serializer import VisitanteSerializer
from Portaria.utils.exceptions import RequiredFieldException
from drf_yasg.utils import swagger_auto_schema

class VisitanteViewSet(viewsets.ModelViewSet):
    queryset = Visitante.objects.all()
    http_method_names = ['get', 'post', 'put']
    serializer_class = VisitanteSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=["Visitante"])
    def create(self, request):
        nome = request.data.get('nome')
        cpf = request.data.get('cpf')
        telefone = request.data.get('telefone', None)

        if not nome or not cpf:
            raise RequiredFieldException()

        visitante = Visitante.objects.create(nome=nome, cpf=cpf, telefone=telefone)
        serializer = VisitanteSerializer(visitante)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    @swagger_auto_schema(tags=["Visitante"])
    def update(self, request, pk=None):
        try:
            visitante = Visitante.objects.get(pk=pk)
        except Visitante.DoesNotExist:
            raise NotFound("Visitante não encontrado.")

        visitante.nome = request.data.get('nome', visitante.nome)
        visitante.cpf = request.data.get('cpf', visitante.cpf)
        visitante.telefone = request.data.get('telefone', visitante.telefone)
        visitante.save()

        serializer = VisitanteSerializer(visitante)
        return Response(serializer.data, status=status.HTTP_200_OK)
    @swagger_auto_schema(tags=["Visitante"])
    def list(self, request):
        nome = request.query_params.get('nome', None)
        if nome:
            visitantes = Visitante.objects.filter(nome__icontains=nome)
        else:
            visitantes = Visitante.objects.all()
        serializer = VisitanteSerializer(visitantes, many=True)
        return Response(serializer.data)
