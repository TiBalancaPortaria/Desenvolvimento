from django.db import models

from Users.models import User

class Finalidade(models.Model): # Finalidade de visita(Trabalho, Entrega, Visita, Entrevista)
     id = models.AutoField(primary_key=True)
     nome = models.CharField(max_length=255)
     descricao = models.CharField(max_length=255)
     
     def __str__(self):
          return self.nome

class Empresa (models.Model): # Empresa que o visitante trabalha(Se houver)
     id = models.AutoField(primary_key=True)
     nome = models.CharField(max_length=255)
     cnpj = models.CharField(max_length=255)
     cep = models.CharField(max_length=255)
     telefone = models.CharField(max_length=255)
     
     def __str__(self):
          return self.nome
     
class Visitante(models.Model): # cadastro de visitante
     id = models.AutoField(primary_key=True)
     nome = models.CharField(max_length=255, unique=True)
     cpf = models.CharField(max_length=255)
     telefone = models.CharField(max_length=255)
     
     def __str__(self):
          return self.nome
     
class NotaFiscal(models.Model): # Nota fiscal de entrega (se houver)
     id = models.AutoField(primary_key=True)
     numero = models.CharField(max_length=255)
     
     def __str__(self):
          return self.numero
     


class Portaria(models.Model):
     id = models.AutoField(primary_key=True)
     visitante = models.ForeignKey(Visitante, on_delete=models.CASCADE)
     nota_entrada = models.ManyToManyField(NotaFiscal, related_name='portarias_de_entrada', blank=True)
     nota_saida = models.ManyToManyField(NotaFiscal, related_name='portarias_de_saida', blank=True)
     placa = models.CharField(max_length=255)
     data_entrada = models.DateTimeField(auto_now_add=True)
     data_saida = models.DateTimeField(null=True, blank=True)
     finalidade = models.ForeignKey(Finalidade, on_delete=models.CASCADE)
     empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
     observacao = models.TextField(null=True, blank=True)
     
     def __str__(self):
          return self.visitante.nome
     

class RHFuncionario(models.Model):
    fun_chapa = models.CharField(max_length=20, primary_key=True)
    fun_nome = models.CharField(max_length=150)
    fun_status = models.CharField(max_length= 150)

    class Meta:
        db_table = 'vw_colaborador'  # nome exato da tabela existente
        managed = False  # Django não altera a tabela


class EntradaColaborador(models.Model):
    TIPO_REGISTRO = [
        ('entrada', 'Entrada'),
        ('saida', 'Saída'),
    ]

    # Armazena apenas o código do funcionário, sem FK
    rh_func_chapa = models.CharField(max_length=20)
    motivo = models.CharField(max_length=100)
    tipo = models.CharField(max_length=7, choices=TIPO_REGISTRO)
    horario_registrado = models.DateTimeField()
    data_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "entrada_colaborador"  # novo nome da tabela

    def __str__(self):
        nome = self.get_funcionario_nome()
        return f"{nome or self.rh_func_chapa} - {self.tipo.capitalize()} em {self.horario_registrado.strftime('%d/%m/%Y %H:%M')}"

    def get_funcionario_nome(self):
        func = RHFuncionario.objects.filter(fun_chapa=self.rh_func_chapa, fun_status='A').first()
        if func:
            return func.fun_nome
        return None


     


