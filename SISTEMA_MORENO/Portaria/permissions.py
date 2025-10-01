from rest_framework.permissions import BasePermission

class IsPortaria(BasePermission):
    """
    Permissão personalizada para permitir acesso apenas a usuários do grupo 'Portaria'.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.groups.filter(name='Portaria').exists()


class IsRH(BasePermission):
    """
    Permissão personalizada para permitir acesso apenas a usuários do grupo 'RH'.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.groups.filter(name='RH').exists()




