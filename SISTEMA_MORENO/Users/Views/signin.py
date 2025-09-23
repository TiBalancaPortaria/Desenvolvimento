from Users.auth import Authentication
from Users.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import APIException

from rest_framework import status

class SigninView(APIView):
    def post(self, request) -> Response:
        try:
            email = request.data.get('email')
            password = request.data.get('password')

            if not email or not password:
                return Response({'error': 'O email e a senha são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

            user = Authentication.signin(email, password)
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
            # Captura as exceções de autenticação e responde 401 com mensagem
            return Response({'error': str(e.detail)}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            # Para outros erros inesperados, responder 500
            return Response({'error': 'Erro interno no servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

