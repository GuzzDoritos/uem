from __future__ import annotations
from arranjo import Array

class DynamicArrayIterator:
    def __init__(self, dynamic_array):
        self._array = dynamic_array
        self._index = 0

    def __next__(self):
        if self._index < len(self._array):
            value = self._array._DynamicArray__array[self._index]
            self._index += 1
            return value
        else:
            raise StopIteration

    def __iter__(self):
        return self




class DynamicArray:
    '''
    Implementa uma estrutura de arranjo dinâmico (similar ao list), usando uma 
    estrutura de arranjo estático.
    '''
    def __init__(self, num_elementos: int = 0, valor_preenchimento = None) -> None:
        '''
        Cria uma instância de arranjo dinâmico. Opcionalmente, pode ser informada a
        quantidade de elementos **num_elementos** e o valor inicial em cada posição
        **valor_preenchimento**. A capacidade alocada para o arranjo inicialmente é
        um elemento a mais que o número de elementos. 
        '''
        self.__num_elementos = num_elementos
        self.__capacidade = num_elementos + 1
        self.__array = Array(self.__capacidade, valor_preenchimento)

    def __len__(self) -> int:
        '''
        Devolve o número de elementos armazenados no arranjo.
        
        Exemplos: 
        >>> arranjo = DynamicArray()
        >>> len(arranjo)
        0
        >>> arranjo.append(10)
        >>> arranjo.__len__()
        1
        >>> arranjo.append(20)
        >>> arranjo.__len__()
        2
        >>> arranjo.append(30)
        >>> arranjo.__len__()
        3
        '''
        return self.__num_elementos
    
    def __iter__(self):
        '''
        Devolve um iterador para o arranjo dinâmico. 
        '''
        return DynamicArrayIterator(self)
    
    def __str__(self) -> str:
        '''
        Devolve uma string legível dos dados armazenados no arranjo.
        
        Exemplos:
        >>> a = DynamicArray()
        >>> print(a)
        []
        >>> a.append(1)
        >>> print(a)
        [1]
        >>> a.append(2)
        >>> print(a)
        [1, 2]
        >>> a.append(3)
        >>> print(a)
        [1, 2, 3]
        '''
        if self.__num_elementos == 0:
            return '[]'
        resp = f'[{self.__array[0]}'
        for i in range(1, self.__num_elementos):
            resp += f', {self.__array[i]}'
        resp += ']'

        return resp

    def append(self, item) -> None:
        '''
        Adiciona **item** no final do arranjo.

        Exemplos: 
        >>> arranjo = DynamicArray()
        >>> arranjo.append(10)
        >>> print(arranjo)
        [10]
        >>> arranjo.append(20)
        >>> print(arranjo)
        [10, 20]
        >>> arranjo.append(30)
        >>> print(arranjo)
        [10, 20, 30]
        '''
        if self.__num_elementos == self.__capacidade:
            self.__capacidade *= 2
            novo_array = Array(self.__capacidade)
            for i in range(self.__num_elementos):
                novo_array[i] = self.__array[i]
            self.__array = novo_array
        self.__array[self.__num_elementos] = item
        self.__num_elementos += 1

    def removeAt(self, indice: int) -> None:
        '''
        Remove o item especificado por **indice**. Considera que **indice** 
        é um valor válido para remoção, isto é, o arranjo não pode estar 
        vazio e 0 <= **indice** < número de elementos.

        Exemplos:
        >>> arranjo = DynamicArray()
        >>> for i in range(10):
        ...     arranjo.append(i*10)
        >>> arranjo.removeAt(3)
        >>> print(arranjo)
        [0, 10, 20, 40, 50, 60, 70, 80, 90]
        >>> arranjo.removeAt(6)
        >>> print(arranjo)
        [0, 10, 20, 40, 50, 60, 80, 90]
        >>> arranjo.removeAt(7)
        >>> print(arranjo)
        [0, 10, 20, 40, 50, 60, 80]
        '''
        assert self.__num_elementos > 0, 'Não é possível remover elementos de arranjo vazio.' 
        assert indice >= 0 and indice < self.__num_elementos, 'Valor de índice inválido.'

        for i in range(indice, self.__num_elementos):
            self.__array[i] = self.__array[i + 1]
        self.__num_elementos -= 1



# Exercício após terminar de implementar os métodos acima.
# Implemente o método __add__(self, outro) para fazer a concatenação de dois arranjos dinâmicos.