from arranjo import Array

class Fila:
    '''Estrutura de dados Fila Circular com implementação usando arranjo estático.'''

    def __init__ (self, tam_max: int) -> None:
        '''
        Cria uma fila vazia com capacidade para **tam_max** elementos.
        '''
        self.__elem = Array(tam_max+1)
        self.__inicio = 0
        self.__fim = 0

    def vazia(self) -> bool:
        '''
        Informa se há elementos na fila, isto é, devolve True se a fila está vazia e False caso contrário.
        
        Exemplos:
        >>> fila = Fila(5)
        >>> fila.vazia()
        True
        >>> fila.enfileira(1)
        >>> fila.vazia()
        False
        >>> fila.desenfileira()
        >>> fila.vazia()
        True
        '''
        return self.__inicio == self.__fim
        
    def numero_elementos(self) -> int:
        '''
        Devolve a quantidade de elementos que estão na fila.
        Exemplos:
        >>> fila = Fila(3)
        >>> fila.numero_elementos()
        0
        >>> fila.enfileira(10)
        >>> fila.enfileira(20)
        >>> fila.numero_elementos()
        2
        >>> fila.desenfileira()
        >>> fila.numero_elementos()
        1
        '''
        return (self.__fim - self.__inicio + len(self.__elem)) % len(self.__elem)

    def cheia(self) -> bool:
        '''
        Informa se a quantidade de elementos na fila alcançou seu limite. Devolve True se a fila está cheia e
        False caso contrário.

        Exemplos:
        >>> fila = Fila(2)
        >>> fila.enfileira(10)
        >>> fila.cheia()
        False
        >>> fila.enfileira(20)
        >>> fila.cheia()
        True
        '''
        return (self.__fim + 1) % len(self.__elem) == self.__inicio

    def enfileira(self, item) -> None:
        '''
        Insere **item** na fila. Caso a fila esteja cheia, será lançado um erro indicando fila cheia.
        
        Exemplos:
        >>> fila = Fila(2)
        >>> fila.enfileira(10)
        >>> print(fila)
        [10]
        >>> fila.enfileira(20)
        >>> print(fila)
        [10, 20]
        >>> fila.enfileira(30)
        Traceback (most recent call last):
            ...
        ValueError: fila cheia
        '''
        if self.cheia():
            raise ValueError('fila cheia')
        
        self.__elem[self.__fim] = item
        self.__fim = (self.__fim + 1) % len(self.__elem)

    
    def desenfileira(self) -> None:
        '''
        Remove o elemento do início da fila. Caso a fila esteja vazia, será lançado um erro indicando 
        fila vazia.
        
        Exemplos:
        >>> fila = Fila(3)
        >>> fila.enfileira(10)
        >>> fila.enfileira(20)
        >>> fila.enfileira(30)
        >>> print(fila)
        [10, 20, 30]
        >>> fila.desenfileira()
        >>> print(fila)
        [20, 30]
        >>> fila.desenfileira()
        >>> print(fila)
        [30]
        >>> fila.desenfileira()
        >>> print(fila)
        []
        >>> fila.desenfileira()
        Traceback (most recent call last):
            ...
        ValueError: fila vazia
        '''
        if self.vazia():
            raise ValueError('fila vazia')
        
        self.__inicio = (self.__inicio + 1) % len(self.__elem)

    def primeiro(self):
        '''
        Devolve o elemento que está no início da fila (sem removê-lo). Caso a fila esteja vazia, 
        será lançado um erro indicando fila vazia. 

        Exemplos:
        >>> fila = Fila(3)
        >>> fila.enfileira(10)
        >>> fila.enfileira(20)
        >>> fila.enfileira(30)
        >>> fila.primeiro()
        10
        >>> fila.desenfileira()
        >>> fila.primeiro()
        20
        >>> fila.desenfileira()
        >>> fila.primeiro()
        30
        >>> fila.desenfileira()
        >>> fila.primeiro()
        Traceback (most recent call last):
            ...
        ValueError: fila vazia
        '''
        if self.vazia():
            raise ValueError('fila vazia')
        
        return self.__elem[self.__inicio]

    def __str__(self) -> str:
        '''
        Exibe todos os elementos que estão na fila.
        '''
        if self.vazia():
            return '[]'
        else:
            resp = f'[{self.__elem[self.__inicio]}'
            for i in range((self.__inicio + 1), self.__inicio + self.numero_elementos()):
                resp += f', {self.__elem[i % len(self.__elem)]}'
            resp += "]"
        return resp
        
    def esvazia(self) -> None:
        '''
        Descarta todos os elementos da fila.

        Exemplos:
        >>> fila = Fila(3)
        >>> fila.enfileira(10)
        >>> fila.enfileira(20)
        >>> fila.esvazia()
        >>> print(fila)
        []
        '''
        self.__fim = 0