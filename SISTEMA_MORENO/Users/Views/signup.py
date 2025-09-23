from Users.auth import Authentication
from Users.models import User
from Users.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class SignupView(APIView):
     def post(self, request) -> None:  # Cria um novo usuário
          nome = request.data.get('nome')
          email = request.data.get('email')
          password = request.data.get('password')

          if not nome or not email or not password:
               return Response({'error': 'O nome, email e senha são obrigatórios'}, status=400)
          
          if User.objects.filter(email=email).exists():
               return Response({'error': 'Email já cadastrado'})

          # Chamada correta do método signup
          user = Authentication.signup(email=email, password=password, nome=nome)  # Corrigido
          serializer = UserSerializer(user)

          return Response({'user': serializer.data})
