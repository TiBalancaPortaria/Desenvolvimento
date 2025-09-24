from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from Users.auth import Authentication
from Users.models import User
from Users.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class SignupView(APIView):
    @swagger_auto_schema(
        operation_description="Cria um novo usuário",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description="Username do usuário"),
                'nome': openapi.Schema(type=openapi.TYPE_STRING, description="Nome completo"),
                'email': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL, description="Email"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_PASSWORD, description="Senha"),
            },
            required=['username', 'nome', 'email', 'password'],
        ),
        responses={201: UserSerializer}
    )
    def post(self, request):
        username = request.data.get('username')
        nome = request.data.get('nome')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not nome or not email or not password:
            return Response({'error': 'O nome, username, email e senha são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email já cadastrado'}, status=status.HTTP_400_BAD_REQUEST)

        user = Authentication.signup(
            username=username,
            email=email,
            password=password,
            nome=nome
        )

        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_201_CREATED)
