# urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter



from Portaria.views.cria_finalidade import FinalidadeViewSet
from Portaria.views.empresaView import EmpresaViewSet
from Portaria.views.portaria import PortariaViewSet
from Portaria.views.rh_funcionarios import RHFuncionarioViewSet
from Portaria.views.visitanteView import VisitanteViewSet
from Portaria.views.entrada_colaborador import PortariaColaboradorViewSet


router = DefaultRouter()
router.register(r'portaria', PortariaViewSet, basename='portaria')
router.register(r'visitante', VisitanteViewSet, basename='visitante')
router.register(r'empresa', EmpresaViewSet, basename='empresa')
router.register(r'finalidade', FinalidadeViewSet, basename='finalidade')
router.register(r'portariaColaborador', PortariaColaboradorViewSet, basename='entrada_colaboradores')
router.register(r'rhfuncionarios', RHFuncionarioViewSet, basename='rhfuncionarios')


urlpatterns = [
    path('', include(router.urls)),
]
