from rest_framework.exceptions import AuthenticationFailed, APIException
from .models import User
from django.contrib.auth.hashers import check_password, make_password

class Authentication:
     def signin(email = None, password = None):
          user_exists = User.objects.filter(email = email).exists()
          exception_auth = APIException("Usuário ou senha inválidos")

          if not user_exists:
               raise exception_auth
          
          user = User.objects.filter(email = email).first()
          
          if not check_password(password, user.password):
               raise exception_auth
          
          return user
     def signup(email = None, password = None, nome = None):
          
          if not nome or nome == '':
               raise APIException("O nome é obrigatório")
          if not email or email == '':
               raise APIException("O email é obrigatório")
          if not password or password == '':
               raise APIException("A senha é obrigatória")
          
          password_hash = make_password(password)
          
          created_user = User.objects.create(
               email = email,
               password = password_hash,
               nome = nome,
               #centro_de_custo = centro_de_custo,

          )
          
          return created_user
     
          