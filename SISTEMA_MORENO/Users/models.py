from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("O username é obrigatório")
        if not email:
            raise ValueError("O email é obrigatório")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("O superusuário precisa ter is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("O superusuário precisa ter is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True, default='usuario_default')
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    centro_de_custo = models.CharField(max_length=255)

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="user_custom_groups",  # Evita conflitos
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="user_custom_permissions",  # Evita conflitos
        blank=True
    )

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "nome"]

    objects = UserManager()  # Adicionamos o UserManager

    def __str__(self):
        return self.username


class CentroDeCusto(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255)

    def __str__(self):
        return self.nome
    

    
