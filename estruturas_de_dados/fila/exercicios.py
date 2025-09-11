from fila import Fila

def inverte(fila: Fila) -> None:
    ''' 
    Inverte os elementos de uma fila.

    Exemplos:
    >>> lista = [7, 3, 9, 4, 2, 1, 5]
    >>> fila = Fila(len(lista))
    >>> for elem in lista:
    ...     fila.enfileira(elem)
    >>> inverte(fila)
    >>> print(fila)
    [5, 1, 2, 4, 9, 3, 7]
    >>> lista = [1, 2, 3]
    >>> fila = Fila(len(lista))
    >>> for elem in lista:
    ...     fila.enfileira(elem)
    >>> inverte(fila)
    >>> print(fila)
    [3, 2, 1]
    '''
    pass

def rotaciona_esquerda(fila: Fila, k: int) -> None:
    '''
    Rotaciona a esquerda os **k** primeiros elementos da **fila**,
    isto é, os **k** primeiros elementos irão para o final da fila
    preservando suas respectivas ordens de chegada.

    Exemplos:
    >>> lista = [7, 3, 9, 4, 2, 1, 5]
    >>> fila = Fila(len(lista))
    >>> for elem in lista:
    ...     fila.enfileira(elem)
    >>> rotaciona_esquerda(fila, 3)
    >>> print(fila)
    [4, 2, 1, 5, 7, 3, 9]
    >>> lista = [1, 2, 3]
    >>> fila = Fila(len(lista))
    >>> for elem in lista:
    ...     fila.enfileira(elem)
    >>> rotaciona_esquerda(fila, 0)
    >>> print(fila)
    [1, 2, 3]
    >>> rotaciona_esquerda(fila, 1)
    >>> print(fila)
    [2, 3, 1]
    '''
    pass

def rotaciona_direita(fila: Fila, k: int) -> None:
    '''
    Rotaciona a direita os elementos da **fila**, colocando no 
    começo os **k** últimos elementos da fila.

    Exemplos:
    >>> lista = [7, 3, 9, 4, 2, 1, 5]
    >>> fila = Fila(len(lista))
    >>> for elem in lista:
    ...     fila.enfileira(elem)
    >>> rotaciona_direita(fila, 3)
    >>> print(fila)
    [2, 1, 5, 7, 3, 9, 4]
    >>> lista = [1, 2, 3]
    >>> fila = Fila(len(lista))
    >>> for elem in lista:
    ...     fila.enfileira(elem)
    >>> rotaciona_direita(fila, 0)
    >>> print(fila)
    [1, 2, 3]
    >>> rotaciona_direita(fila, 1)
    >>> print(fila)
    [3, 1, 2]
    '''
    pass


### DESAFIOS:
# 1) Implemente um TAD de Fila sem usar a classe Array. Use duas Pilhas. 
# 2) Implemente um TAD de Pilha sem usar a classe Array. Use duas Filas.