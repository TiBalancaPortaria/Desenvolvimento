from rest_framework.exceptions import APIException

class RequiredFieldException(APIException):
     status_code = 400
     default_detail = 'Campo obrigatório'
     default_code = 'required_field'
     
class NomeObrigatorio(APIException):
     status_code = 400
     default_code = 'required_field'
     default_detail = 'Nome Obrigatorio'
     

