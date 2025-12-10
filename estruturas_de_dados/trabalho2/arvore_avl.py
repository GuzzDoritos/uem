from __future__ import annotations
from dataclasses import dataclass
from typing import TypeVar, Generic

T = TypeVar('T', int, float, str)

@dataclass
class No(Generic[T]):
    chave: T
    altura: int = 0
    esquerda: No[T] | None = None
    direita: No[T] | None = None


class ArvoreAVL:
    """Implementação de Árvore AVL adaptada para funcionar como Conjunto.

    Exemplos:
    >>> avl = ArvoreAVL()
    >>> avl.inserir(10)
    >>> avl.inserir(5)
    >>> avl.inserir(15)
    >>> avl.contem(10)
    True
    >>> avl.contem(7)
    False
    >>> avl.remover(10)
    >>> avl.contem(10)
    False
    >>> avl.tamanho()
    2
    """

    def __init__(self):
        self.__raiz = None
        self.__qtd = 0

    def vazia(self) -> bool:
        """Retorna True se a árvore está vazia.

        Exemplos:
        >>> avl = ArvoreAVL()
        >>> avl.vazia()
        True
        >>> avl.inserir(1)
        >>> avl.vazia()
        False
        """
        return self.__raiz is None

    def tamanho(self) -> int:
        """Retorna a quantidade de elementos no conjunto.

        Exemplos:
        >>> avl = ArvoreAVL()
        >>> avl.inserir(1)
        >>> avl.inserir(2)
        >>> avl.tamanho()
        2
        """
        return self.__qtd

    def contem(self, chave: int) -> bool:
        """Retorna True se a chave existe, False caso contrário.

        Exemplos:
        >>> avl = ArvoreAVL()
        >>> avl.inserir(3)
        >>> avl.contem(3)
        True
        >>> avl.contem(9)
        False
        """
        no = self.buscar(chave)
        return no is not None

    def inserir(self, chave: int) -> None:
        """Insere uma chave na AVL.

        Exemplos:
        >>> avl = ArvoreAVL()
        >>> avl.inserir(4)
        >>> avl.inserir(4)  # não duplica
        >>> avl.tamanho()
        1
        """
        self.__raiz = self.__insereNo(self.__raiz, chave)

    def remover(self, chave: int) -> None:
        """Remove uma chave, se existir.

        Exemplos:
        >>> avl = ArvoreAVL()
        >>> avl.inserir(8)
        >>> avl.remover(8)
        >>> avl.contem(8)
        False
        """
        if self.contem(chave):
            self.__raiz = self.__removeNo(self.__raiz, chave)
            self.__qtd -= 1

    # --------------------- AVL Interno ---------------------

    def __insereNo(self, no: No[T] | None, chave: T) -> No[T] | None:
        if no is None:
            no = No(chave)
            self.__qtd += 1
        elif chave < no.chave:
            no.esquerda = self.__insereNo(no.esquerda, chave)
        elif chave > no.chave:
            no.direita = self.__insereNo(no.direita, chave)
        else:
            return no  # já existe

        self.__atualizar_altura(no)
        return self.__balancear(no)

    def __removeNo(self, no: No[T] | None, chave: T) -> No[T] | None:
        if no is not None:
            if chave < no.chave:
                no.esquerda = self.__removeNo(no.esquerda, chave)
            elif chave > no.chave:
                no.direita = self.__removeNo(no.direita, chave)
            else:
                if no.esquerda and no.direita:
                    sucessor = self.__sucessor(no)
                    no.chave = sucessor.chave
                    no.direita = self.__removeNo(no.direita, sucessor.chave)
                elif no.esquerda:
                    no = no.esquerda
                else:
                    no = no.direita

            if no is not None:
                self.__atualizar_altura(no)
                no = self.__balancear(no)

        return no

    def buscar(self, elemento: T) -> No[T] | None:
        """Busca uma chave na árvore.

        Exemplos:
        >>> avl = ArvoreAVL()
        >>> avl.inserir(3)
        >>> avl.buscar(3).chave
        3
        >>> avl.buscar(7) is None
        True
        """
        no = self.__raiz
        while no is not None:
            if elemento == no.chave:
                return no
            elif elemento < no.chave:
                no = no.esquerda
            else:
                no = no.direita
        return None

    def __atualizar_altura(self, no: No[T] | None) -> None:
        if no is not None:
            alt_esq = no.esquerda.altura if no.esquerda else -1
            alt_dir = no.direita.altura if no.direita else -1
            no.altura = max(alt_esq, alt_dir) + 1

    def __fator_balanceamento(self, no: No[T] | None) -> int:
        if no is None:
            return 0
        alt_esq = no.esquerda.altura if no.esquerda else -1
        alt_dir = no.direita.altura if no.direita else -1
        return alt_esq - alt_dir

    def __rotaciona_esquerda(self, no: No[T]) -> No[T]:
        nova_raiz = no.direita
        no.direita = nova_raiz.esquerda
        nova_raiz.esquerda = no
        self.__atualizar_altura(no)
        self.__atualizar_altura(nova_raiz)
        return nova_raiz

    def __rotaciona_direita(self, no: No[T]) -> No[T]:
        nova_raiz = no.esquerda
        no.esquerda = nova_raiz.direita
        nova_raiz.direita = no
        self.__atualizar_altura(no)
        self.__atualizar_altura(nova_raiz)
        return nova_raiz

    def __balancear(self, no: No[T] | None) -> No[T] | None:
        if no is not None:
            fb = self.__fator_balanceamento(no)
            if fb == -2:
                if self.__fator_balanceamento(no.direita) == 1:
                    no.direita = self.__rotaciona_direita(no.direita)
                no = self.__rotaciona_esquerda(no)
            elif fb == 2:
                if self.__fator_balanceamento(no.esquerda) == -1:
                    no.esquerda = self.__rotaciona_esquerda(no.esquerda)
                no = self.__rotaciona_direita(no)
        return no

    def __sucessor(self, no: No[T] | None) -> No[T] | None:
        sucessor = no.direita
        while sucessor.esquerda is not None:
            sucessor = sucessor.esquerda
        return sucessor
