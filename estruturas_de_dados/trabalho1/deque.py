from __future__ import annotations
from typing import Any
from dataclasses import dataclass

@dataclass
class No:
    dado: Any|None = None
    anterior: No|None = None
    proximo: No|None = None

class Deque:
    def __init__(self):
        '''Cria uma deque - fila de duas pontas - vazia.'''
        self.__inicio = None
        self.__fim = None
        self.__tam = 0

    def tamanho(self):
        '''Retorna o valor inteiro representando o tamanho do deque.
        >>> deque = Deque()
        >>> deque.insere_direita(2)
        >>> deque.insere_esquerda(1)
        >>> deque.tamanho()
        2'''
        return self.__tam
    
    def vazia(self):
        '''Retorna se o deque está vazio.
        >>> deque = Deque()
        >>> deque.vazia()
        True
        >>> deque.insere_direita(1)
        >>> deque.vazia()
        False'''
        return self.__inicio == None
    
    def esvazia(self):
        '''Esvazia o deque.
        >>> deque = Deque()
        >>> deque.insere_esquerda(3)
        >>> deque.insere_esquerda(2)
        >>> deque.insere_esquerda(1)
        >>> print(deque)
        [1, 2, 3]
        >>> deque.esvazia()
        >>> print(deque)
        []'''
        self.__inicio = None
        self.__fim = None

    def __str__(self):
        """Mostra os elementos presentes no deque.
        Exemplo:
        >>> deque = Deque()
        >>> print(deque)
        []
        >>> deque.insere_direita(10)
        >>> deque.insere_direita(20)
        >>> print(deque)
        [10, 20]
        """
        if self.vazia():
            return '[]'
        
        aux = self.__inicio

        resp = '['
        while aux is not None:
            resp += f'{aux.dado}'
            if aux.proximo is not None:
                resp += ', '
            aux = aux.proximo
        resp += ']'

        return resp

    def insere_esquerda(self, elemento):
        '''Insere um elemento na ponta esquerda da deque.
        >>> deque = Deque()
        >>> deque.insere_esquerda(30)
        >>> print(deque)
        [30]
        >>> deque.insere_esquerda(20)
        >>> print(deque)
        [20, 30]
        >>> deque.insere_esquerda(10)
        >>> print(deque)
        [10, 20, 30]
        '''
        novo = No(elemento)
        if self.vazia():
            self.__inicio = novo
            self.__fim = novo
        else:
            novo.proximo = self.__inicio
            self.__inicio.anterior = novo
            self.__inicio = novo
        self.__tam += 1

    def insere_direita(self, elemento):
        '''Insere um elemento na ponta direita da deque.
        >>> deque = Deque()
        >>> deque.insere_esquerda(30)
        >>> print(deque)
        [30]
        >>> deque.insere_esquerda(20)
        >>> print(deque)
        [20, 30]
        >>> deque.insere_esquerda(10)
        >>> print(deque)
        [10, 20, 30]
        '''
        novo = No(elemento)
        if self.vazia():
            self.__inicio = novo
            self.__fim = novo
        else:
            self.__fim.proximo = novo
            novo.anterior = self.__fim
            self.__fim = novo
        self.__tam += 1

    def remove_esquerda(self):
        '''Remove o elemento na ponta esquerda da deque.
        >>> deque = Deque()
        >>> deque.insere_esquerda(3)
        >>> deque.insere_esquerda(2)
        >>> deque.insere_esquerda(1)
        >>> print(deque)
        [1, 2, 3]
        >>> deque.remove_esquerda()
        >>> print(deque)
        [2, 3]
        >>> deque.remove_esquerda()
        >>> print(deque)
        [3]
        >>> deque.remove_esquerda()
        >>> print(deque)
        []
        >>> deque.remove_esquerda()
        Traceback (most recent call last):
        ...
        IndexError: Deque vazio.
        '''
        if self.vazia():
            raise IndexError("Deque vazio.")
        
        if self.__inicio.proximo == None:
            self.__inicio = None
            self.__fim = None
        else:
            self.__inicio = self.__inicio.proximo
            self.__inicio.anterior = None
        self.__tam -= 1

    def remove_direita(self):
        '''Remove o elemento na ponta direita da deque.
        >>> deque = Deque()
        >>> deque.insere_direita(1)
        >>> deque.insere_direita(2)
        >>> deque.insere_direita(3)
        >>> print(deque)
        [1, 2, 3]
        >>> deque.remove_direita()
        >>> print(deque)
        [1, 2]
        >>> deque.remove_direita()
        >>> print(deque)
        [1]
        >>> deque.remove_direita()
        >>> print(deque)
        []
        >>> deque.remove_direita()
        Traceback (most recent call last):
        ...
        IndexError: Deque vazio.'''
        if self.vazia():
            raise IndexError("Deque vazio.")
        if self.__fim.anterior == None:
            self.__inicio = None
            self.__fim = None
        else:
            self.__fim = self.__fim.anterior
            self.__fim.proximo = None
        self.__tam -= 1
        

    def esquerda(self):
        '''Retorna o elemento na ponta esquerda, sem removê-lo
        >>> deque = Deque()
        >>> deque.insere_direita(1)
        >>> deque.insere_direita(2)
        >>> deque.insere_direita(3)
        >>> print(deque)
        [1, 2, 3]
        >>> deque.esquerda()
        1'''
        if self.vazia():
            raise IndexError("Deque vazio.")
        return self.__inicio.dado

    def direita(self):
        '''Retorna o elemento na ponta direita, sem removê-lo
        >>> deque = Deque()
        >>> deque.insere_direita(1)
        >>> deque.insere_direita(2)
        >>> deque.insere_direita(3)
        >>> print(deque)
        [1, 2, 3]
        >>> deque.direita()
        3'''
        if self.vazia():
            raise IndexError("Deque vazio.")
        return self.__fim.dado