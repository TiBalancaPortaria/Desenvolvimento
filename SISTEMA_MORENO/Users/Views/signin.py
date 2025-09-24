from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import APIException
from Users.auth import Authentication
from Users.serializers import UserSerializer


class SigninView(APIView):

    @swagger_auto_schema(
        operation_description="Autenticação de usuário usando username e password",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["username", "password"],
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description="Nome de usuário"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description="Senha do usuário"),
            },
        ),
        responses={
            200: openapi.Response("Login bem-sucedido", UserSerializer),
            400: "Campos obrigatórios faltando",
            401: "Credenciais inválidas",
        },
    )
    def post(self, request) -> Response:
        try:
            username = request.data.get('username')
            password = request.data.get('password')

            if not username or not password:
                return Response({'error': 'O username e a senha são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

            user = Authentication.signin(username=username, password=password)
            if not user:
                return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

            serializer = UserSerializer(user)
            token = RefreshToken.for_user(user)

            return Response({
                'user': serializer.data,
                'refresh': str(token),
                'access': str(token.access_token)
            }, status=status.HTTP_200_OK)

        except APIException as e:
            return Response({'error': str(e.detail)}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception:
            return Response({'error': 'Erro interno no servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
