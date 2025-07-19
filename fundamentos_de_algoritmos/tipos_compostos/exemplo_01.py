# Uma empresa de e-commerce precisa gerenciar um catálogo de produtos. 
# Cada produto tem um código, nome, preço, categoria e estoque disponível. 
# A empresa também precisa calcular o valor do frete com base no peso e dimensões do produto.
# Regras de negócio:
# O frete base é calculado com base no peso do produto; peso * 0.5
# O frete por volume é calculado com base no volume do produto; volume * 0.001
# O frete por seguro é calculado com base no valor do produto; valor_produto * 0.01
# O multiplicador regional é aplicado com base na região de destino na soma do frete base, volume e seguro; 
# se destino for "sul", multiplicador = 1.0; 
# se destino for "sudeste", multiplicador = 1.1; 
# se destino for "centro-oeste", multiplicador = 1.2; 
# se destino for "nordeste", multiplicador = 1.3; 
# se destino for "norte", multiplicador = 1.4

from enum import Enum, auto
from dataclasses import dataclass
import math

class TaxasFrete(Enum):
    BASE_PESO = 0.5
    VOLUME = 0.001
    SEGURO = 0.01

class Regiao(Enum):
    '''Lista as regiões brasileiras disponíveis. Também proporciona os multiplicadores de frete.'''
    SUL = 1.0
    SUDESTE = 1.1
    CENTRO_OESTE = 1.2
    NORDESTE = 1.3
    NORTE = 1.4

class Categoria(Enum):
    SMARTPHONE = auto()
    BELEZA = auto()
    JOGOS = auto()

@dataclass
class Produto:
    '''
    Representa um produto.
    Código deve ser um string
    Peso deve ser int.
    Altura deve ser int.
    Largura deve ser int.
    Profundidade deve ser int.
    Valor deve ser float.
    Categoria deve ser ENUM.
    '''
    codigo: str
    peso: float
    altura: float
    largura: float
    profundidade: float
    valor: float
    categoria: Categoria

def arrendondar_decimais(numero: float, decimais: int) -> float:
    fator: float = 10 ** decimais
    return math.ceil(numero * fator) / fator

def calcular_frete(produto: Produto, regiao: Regiao) -> float:
    """
    Calcula o valor do frete com base no peso, dimensões e valor do produto, e na região de destino.
    regras de negócio:
    - O frete base é calculado com base no peso do produto; peso * 0.5
    - O frete por volume é calculado com base no volume do produto; volume * 0.001
    - O frete por seguro é calculado com base no valor do produto; valor_produto * 0.01
    - O multiplicador regional é aplicado com base na região de destino na soma do frete base, volume e seguro;
    Exemplos:
    >>> calcular_frete(produto2, Regiao.NORDESTE)
    16.58
    >>> calcular_frete(produto1, Regiao.SUDESTE)
    14.3
    """
    volume = produto.altura * produto.largura * produto.profundidade
    
    # Base de cálculo
    frete_base = produto.peso * TaxasFrete.BASE_PESO.value
    
    # Ajuste por volume
    frete_volume = volume * TaxasFrete.VOLUME.value
    
    # Ajuste por valor (seguro)
    frete_seguro = produto.valor * 0.01
    
    # Multiplicador regional
    multiplicador = regiao.value
    
    frete = (frete_base + frete_volume + frete_seguro) * multiplicador

    return arrendondar_decimais(frete, 2)


produto1 = Produto("P001", 2.0, 20.0, 30.0, 15.0, 299.99, Categoria.JOGOS)
produto2 = Produto("P002", 1.5, 20.0, 30.0, 15.0, 299.99, Categoria.BELEZA)

frete = calcular_frete(produto1, Regiao.SUDESTE)
print(f"Frete para o produto {produto1.codigo} da categoria {produto1.categoria.name}: R$ {frete:.2f}")