from enum import Enum, auto
from dataclasses import dataclass

class NiveisTemperatura(Enum):
    CONGELANTE = 5.0
    FRIA = 19.0
    AMENA = 27.0
    QUENTE = 36.0
    MUITO_QUENTE = 37.0

class NiveisAlerta(Enum):
    NENHUM = auto()
    BAIXO = auto()
    MODERADO = auto()
    ALTO = auto()
    EXTREMO = auto()


@dataclass
class Temperatura:
    valor: float

def classificarTemperatura(temperatura: Temperatura) -> Enum:
    '''
    Recebe uma temperatura, analisa o seu valor, e classifica de acordo com esse valor, indo de CONGELANTE até MUITO_QUENTE.
    Exemplos:
    >>> classificarTemperatura(Temperatura(26.0))
    'AMENA'
    >>> classificarTemperatura(Temperatura(18.0))
    'FRIA'
    >>> classificarTemperatura(Temperatura(30))
    'QUENTE'
    >>> classificarTemperatura(Temperatura(2.0))
    'CONGELANTE'
    >>> classificarTemperatura(Temperatura(36.0))
    'QUENTE'
    >>> classificarTemperatura(Temperatura(37.0))
    'MUITO_QUENTE'
    '''

    if temperatura.valor <= NiveisTemperatura.CONGELANTE.value:
        nivel = NiveisTemperatura.CONGELANTE
    elif temperatura.valor <= NiveisTemperatura.FRIA.value:
        nivel = NiveisTemperatura.FRIA
    elif temperatura.valor <= NiveisTemperatura.AMENA.value:
        nivel = NiveisTemperatura.AMENA
    elif temperatura.valor <= NiveisTemperatura.QUENTE.value:
        nivel = NiveisTemperatura.QUENTE
    elif temperatura.valor >= NiveisTemperatura.MUITO_QUENTE.value:
        nivel = NiveisTemperatura.MUITO_QUENTE
    
    return nivel.name

def definirNivelAlerta(temperatura: Temperatura) -> Enum:
    '''
    Define um nivel de alerta dependendo da classificação da temperatura.
    Exemplos:
    >>> definirNivelAlerta(Temperatura(26.0))
    'NENHUM'
    >>> definirNivelAlerta(Temperatura(18.0))
    'BAIXO'
    >>> definirNivelAlerta(Temperatura(30))
    'MODERADO'
    >>> definirNivelAlerta(Temperatura(2.0))
    'ALTO'
    >>> definirNivelAlerta(Temperatura(37.0))
    'EXTREMO'
    '''
    nivel = classificarTemperatura(temperatura)

    alerta: str
    match nivel:
        case NiveisTemperatura.AMENA.name:
            alerta = NiveisAlerta.NENHUM
        case NiveisTemperatura.FRIA.name:
            alerta = NiveisAlerta.BAIXO
        case NiveisTemperatura.QUENTE.name:
            alerta = NiveisAlerta.MODERADO
        case NiveisTemperatura.CONGELANTE.name:
            alerta = NiveisAlerta.ALTO
        case NiveisTemperatura.MUITO_QUENTE.name:
            alerta = NiveisAlerta.EXTREMO

    return alerta.name
        

