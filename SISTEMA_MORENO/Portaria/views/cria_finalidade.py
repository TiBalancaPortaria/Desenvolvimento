from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from Portaria.models import Finalidade
from Portaria.serializer import FinalidadeSerializer
from Portaria.utils.exceptions import RequiredFieldException
from Users.auth import Authentication
from drf_yasg.utils import swagger_auto_schema


class FinalidadeViewSet(viewsets.ModelViewSet):
    queryset = Finalidade.objects.all()
    http_method_names = ['get', 'post']
    serializer_class = FinalidadeSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=["Finalidade"])
    def create(self, request, *args, **kwargs):
        nome = request.data.get('nome')
        descricao = request.data.get('descricao', None)

        if not nome:
            raise RequiredFieldException()

        finalidade = Finalidade.objects.create(nome=nome, descricao=descricao)
        serializer = self.get_serializer(finalidade)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    @swagger_auto_schema(tags=["Finalidade"])
    def list(self, request, *args, **kwargs):
        nome = request.query_params.get('nome', None)

        if nome:
            queryset = Finalidade.objects.filter(nome__icontains=nome)
        else:
            queryset = self.queryset

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
