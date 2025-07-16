from enum import Enum, auto
from dataclasses import dataclass

class Prioridade(Enum):
    BAIXA = auto()
    MEDIA = auto()
    ALTA = auto()

@dataclass
class Tarefa:
    titulo: str
    descricao: str
    prazo: str
    prioridade: Prioridade = Prioridade.BAIXA

@dataclass
class Funcionario:
    nome: str
    tarefa: Tarefa

def funcionarioEstaDisponivel(funcionario: Funcionario) -> bool:
    '''
    Verifica se um funcionario esta disponivel. Se está, retorna True. Caso contrário, retorna False
    Exemplo:
    >>> funcionarioEstaDisponivel(Funcionario("Joao", None))
    True
    >>> funcionarioEstaDisponivel(Funcionario("Giovana", Tarefa("Roubar o mouse do Joao", "Ir até o cubículo do Joao e roubar o mouse dele sem ele perceber", "HOJE", Prioridade.ALTA)))
    False'''

    if funcionario.tarefa == None:
        return True
    else:
        return False
    
def tarefaTemMaiorPrioridade(tarefa_atual: Tarefa, tarefa_nova: Tarefa) -> bool:
    '''Compara duas tarefas, uma atual e uma nova, e verifica se a nova é de maior prioridade. Se sim, retornar True. Se não, retornar False.
    Exemplos:
    >>> tarefaTemMaiorPrioridade(tarefa_atual = Tarefa("a", "a", "a", Prioridade.ALTA), tarefa_nova = Tarefa("b", "b", "b", Prioridade.MEDIA))
    False
    >>> tarefaTemMaiorPrioridade(tarefa_atual = Tarefa("c", "c", "c", Prioridade.BAIXA), tarefa_nova = Tarefa("d", "d", "d", Prioridade.MEDIA))
    True'''

    if tarefa_nova.prioridade.value > tarefa_atual.prioridade.value:
        return True
    else:
        return False
    
def atribuirTarefa(funcionario: Funcionario, tarefa: Tarefa) -> bool:
    '''Atribui uma tarefa a um funcionario se estiver disponivel (sem tarefa), retornando true. Se não estiver disponivel, retorna false.
    Exemplos:
    >>> atribuirTarefa(Funcionario("Joao", None), Tarefa("a", "a", "a", Prioridade.ALTA))
    True
    >>> atribuirTarefa(Funcionario("Giovana", Tarefa("Roubar o mouse do Joao", "Ir até o cubículo do Joao e roubar o mouse dele sem ele perceber", "HOJE", Prioridade.ALTA)), Tarefa("a", "a", "a", Prioridade.ALTA))
    False'''

    if funcionarioEstaDisponivel(funcionario):
        funcionario.tarefa = tarefa
        return True
    else:
        return False
