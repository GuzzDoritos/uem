from arranjo import Array

class Pilha:
    def __init__ (self, tam_max: int) -> None:
        '''
        Cria uma pilha vazia com tamanho máximo igual a **tam_max**.
        '''
        self.__elementos = Array(tam_max, None)
        self.__quantidade = 0

    def vazia(self) -> bool:
        '''
        Informa se há elementos na pilha, isto é, devolve True se a pilha está vazia e False caso contrário.
        Exemplos:
        >>> pilha = Pilha(5)
        >>> pilha.vazia()
        True
        >>> pilha.empilha(1)
        >>> pilha.vazia()
        False
        >>> pilha.desempilha()
        >>> pilha.vazia()
        True
        '''
        return True if self.__quantidade == 0 else False

    def cheia(self) -> bool:
        '''
        Informa se a quantidade de elementos na pilha alcançou seu limite. Devolve True se a pilha está cheia e
        False caso contrário.
        Exemplos:
        >>> pilha = Pilha(2)
        >>> pilha.empilha(10)
        >>> pilha.cheia()
        False
        >>> pilha.empilha(20)
        >>> pilha.cheia()
        True
        '''
        return True if self.__quantidade == len(self.__elementos) else False

    def empilha(self, item) -> None:
        '''
        Insere **item** na pilha. Caso a pilha esteja cheia, será lançado um erro indicando pilha cheia.
        Exemplos:
        >>> pilha = Pilha(2)
        >>> print(pilha)
        Pilha vazia.
        >>> pilha.empilha(10)
        >>> print(pilha)
        [10] <- topo
        >>> pilha.empilha(20)
        >>> print(pilha)
        [10, 20] <- topo
        >>> pilha.empilha(30)
        Traceback (most recent call last):
            ...
        ValueError: Pilha cheia
        '''
        if self.__quantidade == len(self.__elementos):
            raise ValueError("Pilha cheia")

        self.__elementos[self.__quantidade] = item
        self.__quantidade += 1            
    
    def desempilha(self) -> None:
        '''
        Remove o elemento do topo da pilha. Caso a pilha esteja vazia, será lançado um erro indicando pilha vazia.
        Exemplos:
        >>> pilha = Pilha(3)
        >>> pilha.empilha(10)
        >>> pilha.empilha(20)
        >>> pilha.empilha(30)
        >>> print(pilha)
        [10, 20, 30] <- topo
        >>> pilha.desempilha()
        >>> print(pilha)
        [10, 20] <- topo
        >>> pilha.desempilha()
        >>> print(pilha)
        [10] <- topo
        >>> pilha.desempilha()
        >>> print(pilha)
        Pilha vazia.
        >>> pilha.desempilha()
        Traceback (most recent call last):
            ...
        ValueError: Pilha vazia.
        '''
        if self.__quantidade == 0:
            raise ValueError("Pilha vazia.")

        self.__elementos[self.__quantidade - 1] = None
        self.__quantidade -= 1

    def topo(self):
        '''
        Devolve o elemento que está no topo da pilha (sem removê-lo). Caso a pilha esteja vazia, será lançado um erro indicando pilha vazia. 
        Exemplos:
        >>> pilha = Pilha(3)
        >>> pilha.empilha(10)
        >>> pilha.empilha(20)
        >>> pilha.empilha(30)
        >>> pilha.topo()
        30
        >>> pilha.desempilha()
        >>> pilha.topo()
        20
        >>> pilha.desempilha()
        >>> pilha.topo()
        10
        >>> pilha.desempilha()
        >>> pilha.topo()
        Traceback (most recent call last):
            ...
        ValueError: Pilha vazia.
        '''
        if self.vazia():
            raise ValueError("Pilha vazia.")

        return self.__elementos[self.__quantidade - 1]

    def __str__(self) -> str:
        '''
        Exibe todos os elementos da pilha (da base até o topo).
        '''
        if self.vazia():
            return "Pilha vazia."
        temp_arr = []
        for i in range(self.__quantidade):
            temp_arr.append(self.__elementos[i])

        return f"{str(temp_arr)} <- topo"

    def __len__(self) -> int:
        return self.__quantidade

    def esvazia(self) -> None:
        '''
        Descarta todos os elementos da pilha.
        Exemplos:
        >>> pilha = Pilha(3)
        >>> pilha.empilha(10)
        >>> pilha.empilha(20)
        >>> pilha.empilha(30)
        >>> print(pilha)
        [10, 20, 30] <- topo
        >>> pilha.esvazia()
        >>> print(pilha)
        Pilha vazia.
        '''
        for elemento in self.__elementos:
            elemento = None
        self.__quantidade = 0