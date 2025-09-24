from __future__ import annotations
from copy import deepcopy


class Array:
    def __init__ (self, tamanho: int, valor_preenchimento = None) -> None:
        ''' 
        Cria um arranjo com quantidade de elementos igual a **tamanho** 
        (inteiro maior ou igual a zero) e preenchido com 
        **valor_preenchimento** em cada posição.
        Se **valor_preenchimento** for um dado mutável, faz uma cópia
        profunda (independente) do dado.   
        
        Exemplos:
        >>> a = Array(5, 0)
        >>> print(a)
        [0, 0, 0, 0, 0]
        >>> a = Array(3)
        >>> print(a)
        [None, None, None]
        >>> a = Array(2, 'a')
        >>> print(a)
        ['a', 'a']
        >>> Array(-1)
        Traceback (most recent call last):
        ...
        ValueError: tamanho deve ser um inteiro maior ou igual a zero.
        '''
        if not isinstance(tamanho, int) or tamanho < 0:
            raise ValueError("tamanho deve ser um inteiro maior ou igual a zero.")
        self.__itens = []
        for _ in range(tamanho):
            self.__itens.append(deepcopy(valor_preenchimento))

    def __len__(self) -> int:
        '''
        Devolve a quantidade de elementos do arranjo.
        >>> a = Array(10)
        >>> len(a) # poderia usar também >>> a.__len__()
        10
        >>> a = Array(2, 'a')
        >>> len(a)
        2
        '''
        return len(self.__itens)
    
    def __str__(self) -> str:
        '''
        Devolve uma string legível dos dados armazenados no arranjo.
        
        Exemplos:
        >>> a = Array(5, 0)
        >>> print(a)
        [0, 0, 0, 0, 0]
        '''
        return str(self.__itens)
    
    def __iter__(self):
        '''
        Método que permite iterar sobre os objetos.
        '''
        return iter(self.__itens)

    def __getitem__(self, indice: int):
        '''
        Devolve valores contidos em posições indexadas no arranjo.
        Requer 0 <= indice < tamanho do arranjo.
        
        Exemplos:
        >>> a = Array(5, -1)
        >>> a[2]
        -1
        >>> a[2] = 10
        >>> a[2]
        10
        '''
        if not isinstance(indice, int) or indice < 0 or indice >= len(self.__itens):
            raise IndexError('indice deve ser um inteiro maior ou igual a zero e menor que tamanho.')
        return self.__itens[indice]
    
    def __setitem__(self, indice: int, valor) -> None:
        '''
        Atribui uma referência a **valor** à posição definida
        por **indice** no arranjo.

        Exemplos:
        >>> a = Array(5, -1)
        >>> a[2] = 10
        >>> a[2]
        10
        '''
        if not isinstance(indice, int) or indice < 0 or indice >= len(self.__itens):
            raise IndexError('indice deve ser maior ou igual a zero e menor que tamanho.')
        self.__itens[indice] = valor