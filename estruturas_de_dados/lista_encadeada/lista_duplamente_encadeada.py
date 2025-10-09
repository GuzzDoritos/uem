from __future__ import annotations
from dataclasses import dataclass
from typing import Any

@dataclass
class No:
    dado: Any = None
    anterior: No | None = None
    proximo: No | None = None

class ListaDuplamenteEncadeada:
    def __init__(self):
        '''Define uma lista duplamente encadeada vazia.'''
        self.__inicio = No()
        self.__fim = self.__inicio
        self.__numero_elementos = 0
    

    def __str__(self) -> str:
        """Mostra os elementos presentes na lista.
        Exemplo:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.insere(10)
        >>> lista.insere(20)
        >>> print(lista)
        [10, 20]
        """
        aux = self.__inicio.proximo

        resp = "["
        while aux is not None:
            resp += f'{aux.dado}'
            if aux.proximo is not None:
                resp += ", "
            aux = aux.proximo
        resp += "]"

        return resp

    def __len__(self) -> int:
        """Devolve a quantidade de elementos que estão na lista.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> len(lista)
        0
        >>> lista.insere(5)
        >>> len(lista)
        1
        >>> lista.insere(7)
        >>> len(lista)
        2
        """
        return self.__numero_elementos

    def vazia(self) -> bool:
        """Devolve True se a lista está vazia; False caso contrário.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.vazia()
        True
        >>> lista.insere(1)
        >>> lista.vazia()
        False
        """
        return self.__inicio.proximo == None

    def esvaziar(self) -> None:
        """Remove todos os elementos da lista.
        Exemplo:      
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.insere(10)
        >>> lista.insere(20)
        >>> lista.esvaziar()
        >>> len(lista)
        0
        """
        self.__inicio.proximo = None
        self.__fim = self.__inicio
        self.__numero_elementos = 0

    def buscar(self, elemento: int) -> int:
        """Devolve a posição (índice) da primeira ocorrência do *elemento* na lista 
        se ele estiver presente. Caso contrário, devolve -1. 
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.insere(7)
        >>> lista.insere(3)
        >>> lista.insere(7)
        >>> lista.buscar(7)
        0
        >>> lista.buscar(3)
        1
        >>> lista.buscar(10)
        -1
        """
        indice = 0
        aux = self.__inicio.proximo
        while aux is not None:
            if aux.dado == elemento:
                return indice
            aux = aux.proximo
            indice += 1
        return -1

    def insere(self, elemento: int, i: int|None = None) -> None:
        """Insere o *elemento* na *i*-ésima posicao da lista. Caso a *i*-ésima posição
        não tenha sido especificada, insere na última posição da lista.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.insere(5)
        >>> lista.insere(10)
        >>> lista.insere(15, 1)
        >>> print(lista)
        [5, 15, 10]
        >>> lista.insere(20, -4)
        Traceback (most recent call last):
        ...
        IndexError: índice inválido
        >>> lista.insere(25, 5)
        Traceback (most recent call last):
        ...
        IndexError: índice inválido
        """

        if i is not None and (i < 0 or i > self.__numero_elementos):
            raise IndexError("índice inválido")
        
        novo = No(elemento, self.__fim)

        if i == None or i == self.__numero_elementos:
            self.__fim.proximo = novo
            self.__fim = novo
        else:
            aux = self.__inicio
            for _ in range(i):
                aux = aux.proximo
            aux.proximo.anterior = novo
            novo.proximo = aux.proximo
            aux.proximo = novo
            
        self.__numero_elementos += 1

    def remove(self, i = None) -> None:
        """Remove o elemento da *i*-ésima posicao da lista. Caso a *i*-ésima posição
        não tenha sido especificada, remove o elemento da última posição da lista.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.insere(5)
        >>> lista.insere(10)
        >>> lista.insere(15)
        >>> lista.remove(1)
        >>> print(lista)
        [5, 15]
        >>> lista.remove()
        >>> print(lista)
        [5]
        >>> lista.remove(-2)
        Traceback (most recent call last):
        ...
        IndexError: índice inválido
        >>> lista.remove(10)
        Traceback (most recent call last):
        ...
        IndexError: índice inválido
        >>> lista.esvaziar()
        >>> lista.remove()
        Traceback (most recent call last):
        ...
        IndexError: lista vazia
        """
        
        if i is not None and (i < 0 or i > self.__numero_elementos):
            raise IndexError("índice inválido")
        if self.vazia():
            raise IndexError("lista vazia")
        
        if i is None or i == self.__numero_elementos:
            self.__fim = self.__fim.anterior
            self.__fim.proximo = None
        else:
            aux = self.__inicio
            for _ in range(i):
                aux = aux.proximo
            aux.proximo = aux.proximo.proximo
            self.__fim = self.__fim.anterior

        self.__numero_elementos -= 1

    def __getitem__(self, i: int):
        """Devolve o elemento na posição *i* da lista.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.insere(10)
        >>> lista.insere(20)
        >>> lista.insere(30)
        >>> lista[0]
        10
        >>> lista[2]
        30
        >>> lista[3]
        Traceback (most recent call last):
        ...
        IndexError: índice fora dos limites
        >>> lista[-1]
        Traceback (most recent call last):
        ...
        IndexError: índice fora dos limites
        """

        if i < 0 or i > self.__numero_elementos - 1:
            raise IndexError("índice fora dos limites")

        aux = self.__inicio.proximo
        for _ in range(i):
            aux = aux.proximo
        return aux.dado

    def __setitem__(self, i, valor):
        """Atribui o valor à posição *i* da lista.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.insere(100)
        >>> lista.insere(200)
        >>> lista[1] = 999
        >>> lista[1]
        999
        >>> lista[2] = 50
        Traceback (most recent call last):
        ...
        IndexError: índice fora dos limites
        >>> lista[-1] = 0
        Traceback (most recent call last):
        ...
        IndexError: índice fora dos limites
        """

        if i < 0 or i > self.__numero_elementos - 1:
            raise IndexError("índice fora dos limites")
        
        aux = self.__inicio.proximo
        for _ in range(i):
            aux = aux.proximo
        aux.dado = valor    
