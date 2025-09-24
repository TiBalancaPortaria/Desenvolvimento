from rest_framework.exceptions import APIException
from .models import User
from django.contrib.auth.hashers import check_password, make_password

class Authentication:

    @staticmethod
    def signin(username=None, password=None):
        if not username or not password:
            raise APIException("O username e a senha são obrigatórios")

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise APIException("Usuário ou senha inválidos")

        if not check_password(password, user.password):
            raise APIException("Usuário ou senha inválidos")

        return user

    @staticmethod
    def signup(username=None, email=None, password=None, nome=None):
        if not username or username == '':
            raise APIException("O username é obrigatório")
        if not nome or nome == '':
            raise APIException("O nome é obrigatório")
        if not email or email == '':
            raise APIException("O email é obrigatório")
        if not password or password == '':
            raise APIException("A senha é obrigatória")

        if User.objects.filter(username=username).exists():
            raise APIException("Username já cadastrado")
        if User.objects.filter(email=email).exists():
            raise APIException("Email já cadastrado")

        password_hash = make_password(password)

        created_user = User.objects.create(
            username=username,
            email=email,
            password=password_hash,
            nome=nome,
            # centro_de_custo pode ser adicionado aqui se quiser
        )

        return created_user
