from django.contrib.auth.models import Permission

def check_permission(user, permission_to, method):
     if not user.is_authenticated:
          return False  # Se o usuário não estiver autenticado, retorna falso

     # Mapeamento de métodos HTTP para permissões do Django
     method_permissions = {
          'GET': f'view_{permission_to}',
          'POST': f'add_{permission_to}',
          'PUT': f'change_{permission_to}',
          'PATCH': f'change_{permission_to}',
          'DELETE': f'delete_{permission_to}',
     }

     # Obtém a permissão correspondente ao método
     required_permission = method_permissions.get(method.upper())

     if not required_permission:
          return False  # Se o método não for reconhecido, nega o acesso

     # Verifica se o usuário tem a permissão necessária
     return user.has_perm(f'{permission_to}.{required_permission}')
