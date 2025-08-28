from __future__ import annotations
from copy import deepcopy

class Arranjo:
    def __init__(self, tamanho: int, valor_inicial: int):
        self.tamanho = tamanho
        self.valor_inicial = valor_inicial
        self.__itens = []
        for _ in range(tamanho):
            self.__itens.append(deepcopy(valor_inicial))

    def __getitem__(self, pos: int):
        '''
        Retorna um item na posição *pos*.
        >>> arranjo1 = Arranjo(5, 0)
        >>> arranjo1[2] = 4
        >>> arranjo1[1] = 7
        >>> arranjo1[2]
        4
        >>> arranjo1[1]
        7
        >>> arranjo1[4]
        0
        '''
        
        return self.__itens[pos]

    def __setitem__(self, pos: int, valor: int):
        '''
        Altera um item na posição *pos*, alterando para um *valor*.
        >>> arranjo1 = Arranjo(3, 0)
        >>> print(arranjo1)
        [0, 0, 0]
        >>> arranjo1[2] = 5
        >>> print(arranjo1)
        [0, 0, 5]
        '''
        self.__itens[pos] = valor

    def __iter__(self):
        '''
        Itera todos os elementos de um arranjo.
        >>> arranjo1 = Arranjo(3, 0)
        >>> for item in arranjo1:
        ...     print("boop")
        boop
        boop
        boop
        '''
        return iter(self.__itens)

    def __len__(self):
        '''
        Retorna o tamanho do arranjo.
        >>> arranjo1 = Arranjo(10, 2)
        >>> len(arranjo1)
        10
        '''
        return len(self.__itens)
    
    def __str__(self):
        return str(self.__itens)


# Exercicios
# 1. Crie um arranjo com 10 posições inicializado com -1
arranjo1 = Arranjo(10, -1)
# 2. Associe cada posição do arranjo com o valor do seu índice
arranjo2 = Arranjo(5, 0)
index = 0
for item in arranjo2:
    item = index
    index += 1
print(arranjo2)
# 3. Tente inserir um elemento na posição 10
#    Tente fazer um append() --> para testes


teste = Arranjo(3, 0)
print(teste)