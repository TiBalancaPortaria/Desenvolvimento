from rest_framework import serializers
from Users.models import User

class UserSerializer(serializers.ModelSerializer):
    # Campo de senha write_only
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'nome', 'email', 'centro_de_custo', 'date_joined', 'password']
        extra_kwargs = {
            'is_staff': {'read_only': True},
            'date_joined': {'read_only': True},
        }

    def get_password_set(self, obj):
        return obj.password_set

    def create(self, validated_data):
        # Cria usuário usando o UserManager
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            nome=validated_data.get('nome', ''),
            centro_de_custo=validated_data.get('centro_de_custo', '')
        )
