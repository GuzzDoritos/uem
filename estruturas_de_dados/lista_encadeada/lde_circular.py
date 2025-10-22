from __future__ import annotations
from typing import Any
from dataclasses import dataclass

@dataclass
class No:
    elemento: Any|None = None
    anterior: No|None = None
    proximo: No|None = None

class ListaDuplamenteEncadeada:
    def __init__(self) -> None:
        '''Cria uma lista duplamente encadeada vazia.'''
        self.__inicio = No()
        self.__inicio.proximo = self.__inicio
        self.__inicio.anterior = self.__inicio
        self.__numero_elementos = 0

    def vazia(self) -> bool:
        '''Devolve True se a lista não possui elementos e False caso contrário.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.vazia()
        True
        >>> lista.insere(1)
        >>> lista.vazia()
        False
        '''
        return self.__inicio.proximo == self.__inicio
    
    def __len__(self) -> int:
        '''Devolve a quantidade de elementos que estão na lista.    
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> len(lista)
        0
        >>> lista.insere(1)
        >>> len(lista)
        1
        >>> lista.insere(2)
        >>> lista.insere(3)
        >>> len(lista)
        3
        '''
        return self.__numero_elementos

    def __str__(self) -> str:
        '''Devolve a representação da lista em formato de string.'''
        aux = self.__inicio.proximo

        resp = "["
        while aux is not self.__inicio:
            resp += f'{aux.elemento}'
            if aux.proximo is not self.__inicio:
                resp += ", "
            aux = aux.proximo
        resp += "]"

        return resp

    def insere(self, item: Any, posicao: int = None) -> None:
        '''Insere um novo nó contendo o elemento **item** em uma **posição** específica na lista duplamente encadeada. A 
        contagem das posições começa em 0 (ou seja, a 
        primeira posição da lista é a posição 0), e o valor de 
        **posicao** deve ser entre 0 e a quantidade de elementos 
        (inserção após o último elemento da lista atual). Se não 
        for informada a posição, a inserção será feita no final da
        lista.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.insere(1, 0)
        >>> print(lista)
        [1]
        >>> lista.insere(2, 1)
        >>> print(lista)
        [1, 2]
        >>> lista.insere(3, 1)
        >>> print(lista)
        [1, 3, 2]
        >>> lista.insere(4, 2)
        >>> print(lista)
        [1, 3, 4, 2]
        >>> lista.insere(6, 5)
        Traceback (most recent call last):
            ...
        IndexError: índice inválido.
        '''
        if posicao is not None and (posicao < 0 or posicao > self.__numero_elementos):
            raise IndexError("índice inválido.")
        
        novo = No(item)

        if posicao == None or posicao == self.__numero_elementos:
            self.__inicio.anterior.proximo = novo
            novo.anterior = self.__inicio.anterior
            novo.proximo = self.__inicio
            self.__inicio.anterior = novo
        else:
            aux = self.__inicio
            for _ in range(posicao):
                aux = aux.proximo
            aux.proximo.anterior = novo
            novo.anterior = aux
            novo.proximo = aux.proximo
            aux.proximo = novo
            
        self.__numero_elementos += 1


    def remove(self, posicao: int = None) -> None:
        '''Remove o nó que está em uma **posicao** específica
        na lista duplamente encadeada. As posições começam em 0 e o
        valor de **posicao** deve estar entre 0 e a 
        quantidade de elementos - 1 (último elemento da lista).
        Se posição não for especificada, remove do fim.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> for i in range(10):
        ...    lista.insere(i * 10)
        >>> print(lista)
        [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
        >>> lista.remove(2)
        >>> print(lista)
        [0, 10, 30, 40, 50, 60, 70, 80, 90]
        >>> lista.remove(7)
        >>> print(lista)
        [0, 10, 30, 40, 50, 60, 70, 90]
        >>> lista.remove(4)
        >>> print(lista)
        [0, 10, 30, 40, 60, 70, 90]
        >>> lista.remove(0)
        >>> print(lista)
        [10, 30, 40, 60, 70, 90]
        >>> lista.remove(5)
        >>> print(lista)
        [10, 30, 40, 60, 70]
        '''
        if posicao is not None and (posicao < 0 or posicao > self.__numero_elementos):
            raise IndexError("índice inválido")
        if self.vazia():
            raise IndexError("lista vazia")
        
        if posicao is None or posicao == self.__numero_elementos:
            self.__fim = self.__fim.anterior
            self.__fim.proximo = None
        else:
            aux = self.__inicio
            for _ in range(posicao):
                aux = aux.proximo
            aux.proximo = aux.proximo.proximo
            self.__fim = self.__fim.anterior

        self.__numero_elementos -= 1

    def consulta(self, i: int) -> Any:
        '''Devolve o conteúdo do nó localizado na posição *i* da lista duplamente encadeada sem removê-lo.
        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> lista.consulta(0)
        Traceback (most recent call last):
            ...
        ValueError: Lista vazia.
        >>> lista.insere(1)
        >>> lista.insere(2)
        >>> lista.insere(3)
        >>> print(lista)
        [1, 2, 3]
        >>> lista.consulta(2)
        3
        >>> lista.consulta(0)
        1
        >>> lista.consulta(1)
        2
        '''
        if self.__numero_elementos == 0:
            raise ValueError("Lista vazia.")
        elif i < 0 or i > self.__numero_elementos - 1:
            raise IndexError("índice fora dos limites")

        aux = self.__inicio.proximo
        for _ in range(i):
            aux = aux.proximo
        return aux.elemento

    def busca_indice(self, elemento: Any) -> int:
        '''
        Devolve a posição do primeiro **elemento** encontrado na lista (considera
        0 a primeira posição da lista). Caso **elemento** não esteja na lista
        duplamente encadeada, o resultado será -1.

        Exemplos:
        >>> lista = ListaDuplamenteEncadeada()
        >>> for i in range(10):
        ...    lista.insere(i * 10)
        >>> lista.busca_indice(45)
        -1
        >>> lista.busca_indice(20)
        2
        >>> lista.busca_indice(70)
        7
        '''
        indice = 0
        aux = self.__inicio.proximo
        while aux is not None:
            if aux.elemento == elemento:
                return indice
            aux = aux.proximo
            indice += 1
        return -1