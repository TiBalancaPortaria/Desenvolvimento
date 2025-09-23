from rest_framework import serializers
from Portaria.models import Portaria, EntradaColaborador, RHFuncionario, Visitante, Empresa, Finalidade, NotaFiscal

class VisitanteSerializer(serializers.ModelSerializer):
     class Meta:
          model = Visitante
          fields = '__all__'

class EmpresaSerializer(serializers.ModelSerializer):
     class Meta:
          model = Empresa
          fields = '__all__'

class FinalidadeSerializer(serializers.ModelSerializer):
     class Meta:
          model = Finalidade
          fields = '__all__'

class NotaFiscalSerializer(serializers.ModelSerializer):
     class Meta:
          model = NotaFiscal
          fields = '__all__'

class PortariaColaboradorSerializer(serializers.ModelSerializer):
    colaborador = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EntradaColaborador
        fields = "__all__"

    def get_colaborador(self, obj):
        # Se o queryset já anotou o nome ativo
        if hasattr(obj, 'colaborador_nome') and obj.colaborador_nome:
            return obj.colaborador_nome
        # fallback seguro
        colaborador = RHFuncionario.objects.filter(
            fun_chapa=obj.rh_func_chapa,
            fun_status='A'
        ).first()
        return colaborador.fun_nome if colaborador else "Desconhecido"



# refatorando o código acima para adicionar um filtro de pesquisa por data de entrada e saída
class PortariaFilterSerializer(serializers.ModelSerializer):
     data_entrada = serializers.DateTimeField(format='%d/%m/%Y %H:%M:%S', read_only=True)
     data_saida = serializers.DateTimeField(format='%d/%m/%Y %H:%M:%S', read_only=True)
     
     



class RHFuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = RHFuncionario
        fields = ['fun_chapa', 'fun_nome' , 'fun_status']  # só campos que você quer mostrar

class PortariaSerializer(serializers.ModelSerializer):
     visitante = VisitanteSerializer()  # Exibe os dados completos do visitante
     data_entrada = serializers.DateTimeField(format='%d/%m/%Y %H:%M:%S', read_only=True)
     data_saida = serializers.DateTimeField(format='%d/%m/%Y %H:%M:%S', read_only=True)
     empresa = EmpresaSerializer()  # Exibe os dados completos da empresa
     finalidade = FinalidadeSerializer()  # Exibe os dados completos da finalidade
     nota_entrada = NotaFiscalSerializer(many=True)  # Exibe detalhes das notas de entrada
     nota_saida = NotaFiscalSerializer(many=True)  # Exibe detalhes das notas de saída

     class Meta:
          model = Portaria
          fields = '__all__'
          depth = 1  # Garante que chaves estrangeiras sejam serializadas com detalhes
