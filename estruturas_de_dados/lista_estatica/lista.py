from arranjo import Array

class Lista:
    def __init__(self, tam):
        self.__elem = Array(tam + 1)
        self.__fim = 0

    def vazia(self) -> bool:
        '''
        Retorna True se a lista estiver vazia.
        Exemplos:
        >>> aux = [1, 2, 3]
        >>> lista1 = Lista(3)
        >>> lista2 = Lista(30)
        >>> for el in aux:
        ...     lista1.insere_fim(el)
        >>> lista1.vazia()
        False
        >>> lista2.vazia()
        True
        '''
        return self.__fim == 0

    def cheia(self) -> bool:
        '''
        Retorna True se a lista estiver cheia.
        Exemplos:
        >>> aux = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        >>> lista1 = Lista(9)
        >>> lista2 = Lista(20)
        >>> for el in aux:
        ...     lista1.insere_fim(el)
        ...     lista2.insere_fim(el)
        >>> lista1.cheia()
        True
        >>> lista2.cheia()
        False
        '''
        return self.__fim == len(self.__elem) - 1

    def __getitem__(self, pos):
        '''
        Retorna um elemento na posição *pos*.
        Exemplos:
        >>> aux = [1, 2, 3]
        >>> lista1 = Lista(4)
        >>> for el in aux:
        ...     lista1.insere_fim(el)
        >>> print(lista1)
        [1, 2, 3]
        >>> lista1[1]
        2
        '''
        if pos >= self.__fim or pos < 0:
            raise ValueError("Posição fora do campo da lista.")
        return self.__elem[pos]

    def insere_fim(self, elem) -> None:
        '''
        Insere um elemento no final da lista.
        Exemplos:
        >>> aux = [1, 2, 3]
        >>> lista1 = Lista(4)
        >>> for el in aux:
        ...     lista1.insere_fim(el)
        >>> print(lista1)
        [1, 2, 3]
        >>> lista1.insere_fim(4)
        >>> print(lista1)
        [1, 2, 3, 4]
        '''
        if self.cheia():
            raise ValueError("Lista cheia.")
        self.__elem[self.__fim] = elem
        self.__fim += 1

    def insere_pos(self, elem, pos) -> None:
        '''
        Insere um elemento antes da posição *pos*.
        Exemplos:
        >>> aux = [1, 2, 4]
        >>> lista1 = Lista(4)
        >>> for el in aux:
        ...     lista1.insere_fim(el)
        >>> print(lista1)
        [1, 2, 4]
        >>> lista1.insere_pos(elem = 3, pos = 2)
        >>> print(lista1)
        [1, 2, 3, 4]
        '''
        if self.cheia():
            raise ValueError("Lista cheia.")
        
        if pos >= self.__fim or pos < 0:
            raise ValueError("Posição fora do campo da lista.")
        if not self.vazia():
            for i in range(pos, len(self.__elem) - 1):
                self.__elem[i + 1] = self.__elem[i]
            self.__elem[pos] = elem
        else:
            self.__elem[0] = elem
        self.__fim += 1

    def remove_fim(self) -> None:
        '''
        Remove o último elemento da lista.
        Exemplos:
        >>> aux = [1, 2, 3]
        >>> lista1 = Lista(3)
        >>> for el in aux:
        ...     lista1.insere_fim(el)
        >>> print(lista1)
        [1, 2, 3]
        >>> lista1.remove_fim()
        >>> print(lista1)
        [1, 2]
        '''
        if self.vazia():
            raise ValueError("Lista vazia.")
        self.__fim -= 1

    def remove_pos(self, pos) -> None:
        '''
        Remove o elemento na posição *pos*.
        Exemplos:
        >>> aux = [1, 2, 3]
        >>> lista1 = Lista(3)
        >>> for el in aux:
        ...     lista1.insere_fim(el)
        >>> print(lista1)
        [1, 2, 3]
        >>> lista1.remove_pos(1)
        >>> print(lista1)
        [1, 3]
        '''
        if self.vazia():
            raise ValueError("Lista vazia.")
            
        for i in range(pos, self.__fim):
            self.__elem[i] = self.__elem[i + 1]
        self.__fim -= 1

    def busca(self, elem) -> bool:
        '''
        Busca e retorna True se o elemento existe na lista.
        Exemplos:
        >>> aux = [1, 2, 3, 4, 5, 6]
        >>> lista1 = Lista(6)
        >>> for el in aux:
        ...     lista1.insere_fim(el)
        >>> print(lista1)
        [1, 2, 3, 4, 5, 6]
        >>> lista1.busca(5)
        True
        >>> lista1.busca(8)
        False'''
        for i in range(self.__fim):
            if elem == self.__elem[i]:
                return True
        return False

    def esvazia(self):
        '''
        Esvazia a lista.
        Exemplos:
        >>> aux = [1, 2, 3, 4, 5, 6]
        >>> lista1 = Lista(6)
        >>> for el in aux:
        ...     lista1.insere_fim(el)
        >>> print(lista1)
        [1, 2, 3, 4, 5, 6]
        >>> lista1.esvazia()
        >>> print(lista1)
        []
        '''
        self.__fim = 0

    def __str__(self) -> str:
        '''
        Exibe todos os elementos que estão na lista.
        '''
        if self.vazia():
            return '[]'
        else:
            resp = f'[{self.__elem[0]}'
            for i in range(1, self.__fim):
                resp += f', {self.__elem[i]}'
            resp += "]"
        return resp