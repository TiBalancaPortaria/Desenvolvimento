
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    """
    Permissão personalizada para permitir acesso apenas a usuários do grupo 'ADMINISTRADOR'.
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.groups.filter(name='ADMINISTRADOR').exists()
        )