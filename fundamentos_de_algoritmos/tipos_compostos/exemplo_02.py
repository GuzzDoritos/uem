from enum import Enum
from dataclasses import dataclass

@dataclass
class Aluno:
    codigo: int
    nome: str
    notaProva: float
    notaTrabalho: float
    notaParticipacao: float

class PesoAvaliacao(Enum):
    PROVA = 0.6
    TRABALHO = 0.3
    PARTICIPACAO = 0.1

def calcularNotaFinal(aluno: Aluno) -> float:
    '''
    Calcula a notaFinal de um aluno com base na média ponderada entre notaProva, notaTrabalho, notaParticipação, e seus respectivos pesos.
    Exemplo:
    >>> calcularNotaFinal(Aluno(1, "Leandro", 7, 8, 6))
    7.2
    '''

    somaPesos = PesoAvaliacao.PROVA.value + PesoAvaliacao.TRABALHO.value + PesoAvaliacao.PARTICIPACAO.value
    provaPonderada = aluno.notaProva * PesoAvaliacao.PROVA.value
    trabalhoPonderada = aluno.notaTrabalho * PesoAvaliacao.TRABALHO.value
    participacaoPonderada = aluno.notaParticipacao * PesoAvaliacao.PARTICIPACAO.value

    mediaPonderada = (provaPonderada + trabalhoPonderada + participacaoPonderada) / somaPesos

    return mediaPonderada