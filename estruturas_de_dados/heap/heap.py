from typing import TypeVar

T = TypeVar("T", int, float, str)


class HeapMaximo:
    """
    Implementa um Heap Máximo usando uma lista interna. Caso uma lista de valores
    seja fornecida no construtor, o heap será construído automaticamente.
    """

    def __init__(self, valores: list[T] | None = None) -> None:
        """Inicializa o heap. Se uma lista de `valores` for fornecida, o heap
        será construído a partir dela (faz uma cópia rasa dos dados).

        Exemplos:
        >>> h = HeapMaximo([3, 1, 10])
        >>> h.consultar_maximo()
        10
        >>> h2 = HeapMaximo()
        >>> h2.vazio()
        True
        """
        self.__dados: list[T] = []

        if valores is not None:
            self.__dados = valores[:]
            self.__construir_heap()


    def __len__(self) -> int:
        """Devolve o número de elementos no heap.

        Exemplos:
        >>> h = HeapMaximo([1, 2, 3])
        >>> len(h)
        3
        """
        return len(self.__dados)


    def vazio(self) -> bool:
        """Verifica se o heap está vazio.

        Exemplos:
        >>> h = HeapMaximo()
        >>> h.vazio()
        True
        >>> h.inserir(1)
        >>> h.vazio()
        False
        """
        return len(self.__dados) == 0

    def __str__(self) -> str:
        return str(self.__dados)


    def __pai(self, i: int) -> int:
        '''Devolve o índice do pai do elemento na posição `i`.'''
        return (i - 1) // 2


    def __esq(self, i: int) -> int:
        '''Devolve o índice do filho esquerdo do elemento na posição `i`.'''
        return 2 * i + 1


    def __dir(self, i: int) -> int:
        '''Devolve o índice do filho direito do elemento na posição `i`.'''
        return 2 * i + 2


    def __subir(self, i: int) -> None:
        '''Move o elemento na posição `i` para cima na árvore do heap,
        trocando-o com seu pai enquanto a propriedade do heap máximo
        for violada (ou seja, enquanto o elemento for maior que seu pai).
        '''
        pai = self.__pai(i)
        while i > 0 and self.__dados[pai] < self.__dados[i]:
            self.__dados[pai], self.__dados[i] = self.__dados[i], self.__dados[pai]
            i = pai
            pai = self.__pai(i)

    def __descer(self, i: int) -> None:
        '''Move o elemento na posição `i` para baixo na árvore do heap,
        trocando-o com o filho de maior valor enquanto a propriedade do
        heap máximo for violada.
        '''
        tam = len(self.__dados)

        while True:
            esq = self.__esq(i)
            dir_ = self.__dir(i)

            maior = i
            if esq < tam and self.__dados[esq] > self.__dados[maior]:
                maior = esq
            if dir_ < tam and self.__dados[dir_] > self.__dados[maior]:
                maior = dir_

            if maior == i:
                break
            
            self.__dados[i], self.__dados[maior] = self.__dados[maior], self.__dados[i]

            i = maior

    def __construir_heap(self) -> None:
        '''Constrói o heap máximo a partir da lista interna `__dados`.'''
        for i in range((len(self.__dados) - 2) // 2, -1, -1):
            self.__descer(i)

    def inserir(self, elemento: T) -> None:
        """Insere um novo `elemento` no heap.

        Exemplos:
        >>> h = HeapMaximo()
        >>> h.inserir(5)
        >>> h.inserir(12)
        >>> h.inserir(3)
        >>> h.consultar_maximo()
        12
        """
        self.__dados.append(elemento)
        self.__subir(len(self.__dados) - 1)


    def extrair_maximo(self) -> T:
        """Remove e devolve o maior elemento do heap.

        Exemplos:
        >>> h = HeapMaximo([4, 10, 7, 2])
        >>> h.extrair_maximo()
        10
        >>> h.extrair_maximo()
        7
        """
        if self.vazio():
            raise IndexError('Heap vazio.')

        maximo = self.__dados[0]
        self.__dados[0], self.__dados[len(self.__dados) - 1] = self.__dados[len(self.__dados) - 1], self.__dados[0]
        self.__dados.pop()
        self.__descer(0)

        return maximo

    def consultar_maximo(self) -> T:
        """Devolve o maior elemento do heap sem removê-lo.

        Exemplos:
        >>> h = HeapMaximo([8, 2, 5])
        >>> h.consultar_maximo()
        8
        """
        if self.vazio():
            raise IndexError('Heap vazio.')
        return self.__dados[0]