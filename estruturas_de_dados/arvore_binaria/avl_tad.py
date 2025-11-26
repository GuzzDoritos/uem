from __future__ import annotations
from dataclasses import dataclass

from typing import TypeVar, Generic

# Tipo genérico T precisa ser int ou float ou str
T = TypeVar('T', int, float, str)


@dataclass
class No(Generic[T]):
    """Representa um nó de uma árvore. Contém uma chave do tipo T (valor de
    um tipo sujeito a uma relação de ordem) e as referências para subárvore 
    esquerda e subárvore direita."""
    chave: T
    altura: int = 0
    esquerda: No[T]|None = None
    direita: No[T]|None = None

class AVL(Generic[T]):
    """Estrutura que mantém a propriedade da árvore binária de busca, isto é,
    para cada nó v pertencente à árvore, se o nó u pertence à subárvore 
    esquerda de v, então o valor da chave de u é menor que o valor da chave 
    de v; por outro lado, se u pertence à subárvore direita de v, então o 
    valor da chave de u é maior que o valor da chave de v. Não insere 
    valores repetidos. Mantém o fator de balanceamento <= 1, isto é
    para todo nó v, o valor absoluto da diferença entre as alturas
    da subárvore à esquerda de v e subárvore à direita de v é menor ou 
    igual a 1."""

    def __init__(self):
        """Cria uma árvore binária sem elementos."""
        self.__raiz = None

    def vazia(self) -> bool:
        """Verifica se a árvore está vazia, isto é, devolve True se não possui
        nenhum vértice; caso contrário, devolve False.
        Exemplos:
        >>> arvore = AVL()
        >>> arvore.vazia()
        True
        >>> arvore.insere(10)
        >>> arvore.vazia()
        False
        """
        return self.__raiz == None
    
    def __str__(self) -> str:
        return self.__exibe_pre_ordem(self.__raiz)
    
    def __atualizar_altura(self, no: No[T]|None) -> None:
        """Atualiza o valor da altura após operações de inserção ou remoção.
        """
        if no is not None:
            altura_subarvore_esquerda = -1
            altura_subarvore_direita = -1
            if no.esquerda is not None:
                altura_subarvore_esquerda = no.esquerda.altura
            if no.direita is not None:
                altura_subarvore_direita = no.direita.altura
            no.altura = max(altura_subarvore_esquerda, altura_subarvore_direita) + 1
    

    def insere(self, chave: T) -> None:
        """Faz a inserção do valor ``chave`` como um nó folha na árvore, 
        respeitando a propriedade de árvore binária de busca balanceada
        AVL. 
        Exemplos:
        >>> arvore = AVL()
        >>> arvore.insere(10)
        >>> print(arvore)
        (10 () ())
        >>> arvore.insere(20)
        >>> print(arvore)
        (10 () (20 () ()))
        >>> arvore.insere(30)
        >>> print(arvore)
        (20 (10 () ()) (30 () ()))
        >>> arvore.insere(0)
        >>> print(arvore)
        (20 (10 (0 () ()) ()) (30 () ()))
        >>> arvore.insere(-10)
        >>> print(arvore)
        (20 (0 (-10 () ()) (10 () ())) (30 () ()))
        >>> arvore.insere(15)
        >>> print(arvore)
        (10 (0 (-10 () ()) ()) (20 (15 () ()) (30 () ())))
        """
        self.__raiz = self.__insereNo(self.__raiz, chave)

    def __insereNo(self, no: No[T]|None, chave: T) -> No[T]|None:
        """Efetua a inserção de um novo nó contendo ``chave`` na subárvore 
        com raiz ``no``. Devolve uma referência para o nó raiz da subárvore na
        qual o elemento chave foi inserido.
        """
        if no is None:
            no = No(chave)
        else:
            if chave < no.chave:
                no.esquerda = self.__insereNo(no.esquerda, chave)
            else:
                no.direita = self.__insereNo(no.direita, chave)
            self.__atualizar_altura(no)
            no = self.__balancear(no)
        return no

    def remove(self, chave: T) -> None:
        """Remove da árvore o nó contendo o valor ``chave`` e mantém a
        propriedade da árvore binária de busca AVL. Caso a remoção seja de um nó 
        com dois filhos, considera como sucessor o nó com o menor valor 
        maior do que o valor ``chave`` (nó mais a esquerda da subárvore a direita).
        Exemplos:
        >>> arvore = AVL()
        >>> for item in [50, 30, 70, 20, 40, 60, 80, 10, 35, 65]:
        ...     arvore.insere(item)
        >>> print(arvore)
        (50 (30 (20 (10 () ()) ()) (40 (35 () ()) ())) (70 (60 () (65 () ())) (80 () ())))
        >>> arvore.remove(10)
        >>> print(arvore)
        (50 (30 (20 () ()) (40 (35 () ()) ())) (70 (60 () (65 () ())) (80 () ())))
        >>> arvore.remove(50)
        >>> print(arvore)
        (60 (30 (20 () ()) (40 (35 () ()) ())) (70 (65 () ()) (80 () ())))
        """
        self.__raiz = self.__removeNo(self.__raiz, chave)


    def __removeNo(self, no: No[T] | None, chave: T) -> No[T]|None:
        """Função que efetua a remoção do nó contendo ``chave`` na subárvore 
        com raiz ``no``. Devolve uma referência para o nó raiz da subárvore na
        qual o elemento chave foi removido.
        """
        if no is not None:
            if no.chave < chave:
                no.direita = self.__removeNo(no.direita, chave)
            elif no.chave > chave:
                no.esquerda = self.__removeNo(no.esquerda, chave)
            else:
                if no.esquerda is not None and no.direita is not None:
                    sucessor = self.__sucessor(no)
                    assert sucessor is not None, 'Falhou em encontrar um sucessor existente!!!'
                    no.chave, sucessor.chave = sucessor.chave, no.chave
                    no.direita = self.__removeNo(no.direita, chave)
                elif no.esquerda is not None:
                    no = no.esquerda
                else:
                    no = no.direita
            self.__atualizar_altura(no)
            no = self.__balancear(no)
        return no

    def __sucessor(self, no: No[T]|None) -> No[T]|None:
        '''Devolve o sucessor de um ``no``, isto é, o nó com o menor valor
        maior (ou igual) ao valor de ``no.chave``.
        Exemplos contendo gambiarra (pois a princípio uma função privada não
        deveria estar visível para o usuário - verificar name mangling):
        >>> arvore = AVL()
        >>> for item in [50, 30, 70, 20, 40, 60, 80, 10, 35, 65]:
        ...     arvore.insere(item)
        >>> no = arvore._AVL__sucessor(arvore.buscar(50))
        >>> no.chave
        60
        >>> no = arvore._AVL__sucessor(arvore.buscar(30))
        >>> no.chave
        35
        >>> no = arvore._AVL__sucessor(arvore.buscar(70))
        >>> no.chave
        80
        >>> no = arvore._AVL__sucessor(arvore.buscar(90))
        >>> no == None
        True
        '''
        if no is None or no.direita is None:
            return None
        sucessor = no.direita
        while sucessor.esquerda is not None:
            sucessor = sucessor.esquerda
        return sucessor
        

    def __exibe_pre_ordem(self, raiz: No[T]|None) -> str:
        '''Exibe a representação parentizada da estrutura em pré-ordem,
        isto é: 
        - uma árvore vazia é representada por ();
        - uma árvore não vazia é representada pelo conteúdo do nó ``raiz``, 
        seguido da representação da subárvore esquerda, seguida da 
        representação da subárvore direita, circundados por parênteses.
        '''
        if raiz is None:
            return '()'
        return f'({raiz.chave} {self.__exibe_pre_ordem(raiz.esquerda)} {self.__exibe_pre_ordem(raiz.direita)})'

    def buscar(self, elemento: T) -> No[T]|None:
        '''Devolve o nó contendo o ``elemento`` se estiver na árvore; 
        caso contrário, devolve None.
        Exemplo
        >>> arvore = AVL()
        >>> for item in [8, 17, 4, 2, 9, 13, 7]:
        ...     arvore.insere(item)
        >>> no = arvore.buscar(4)
        >>> no.chave
        4
        >>> no = arvore.buscar(13)
        >>> no.chave
        13
        >>> arvore.buscar(10) == None
        True
        '''
        no = self.__raiz
        while no is not None:
            if elemento == no.chave:
                return no
            elif elemento < no.chave:
                no = no.esquerda
            else:
                no = no.direita
        return None
    
    def __fator_balanceamento(self, no: No[T]|None) -> int:
        """Calcula o fator de balanceamento de ``no``, isto é,
        a diferença de altura entre as subárvores de ``no``.
        Em uma árvore AVL, o fator de balanceamento será um inteiro 
        no intervalo [-2, 2]. 
        """
        if no is None:
            return 0
        altura_subarvore_esquerda = -1
        altura_subarvore_direita = -1
        if no.esquerda is not None:
            altura_subarvore_esquerda = no.esquerda.altura
        if no.direita is not None:
            altura_subarvore_direita = no.direita.altura
        return altura_subarvore_esquerda - altura_subarvore_direita
    
    def __rotaciona_esquerda(self, no: No[T]) -> No[T]:
        """Efetua uma rotação à esquerda, fazendo com que o filho a
        direita de ``no`` se torne nova raiz da subárvore, sua 
        subárvore esquerda passa a ser subárvore direita de ``no``,
        e ``no`` passa a ser filho a esquerda da nova raiz. Assume
        que altura de ``no`` é maior ou igual a 1."""
        assert no.direita is not None, 'Erro ao rotacionar a esquerda.'
        nova_raiz = no.direita
        no.direita = nova_raiz.esquerda
        nova_raiz.esquerda = no
        self.__atualizar_altura(no)
        self.__atualizar_altura(nova_raiz)
        return nova_raiz


    def __rotaciona_direita(self, no: No[T]) -> No[T]:
        '''Efetua uma rotação à direita, fazendo com que o filho a
        esquerda de **no** se torne nova raiz da subárvore, sua 
        subárvore direita passa a ser subárvore esquerda de **no**,
        e **no** passa a ser filho a direita da nova raiz. Assume
        que altura de **no** é maior ou igual a 1.'''
        assert no is not None and no.esquerda is not None, 'Erro ao rotacionar a direita.'
        nova_raiz = no.esquerda
        no.esquerda = nova_raiz.direita
        nova_raiz.direita = no
        self.__atualizar_altura(no)
        self.__atualizar_altura(nova_raiz)
        return nova_raiz

    def __balancear(self, no: No[T]|None) -> No[T]|None:
        '''Efetua o balanceamento de uma subárvore enraizada em ``no``.'''
        if no is not None:
            fb = self.__fator_balanceamento(no)
            if fb == -2:
                assert no.direita is not None, 'Erro ao balancear direita.'
                if self.__fator_balanceamento(no.direita) == 1:
                    no.direita = self.__rotaciona_direita(no.direita)
                no = self.__rotaciona_esquerda(no)
            elif fb == 2:
                assert no.esquerda is not None, 'Erro ao balancear esquerda.'
                if self.__fator_balanceamento(no.esquerda) == -1:
                    no.esquerda = self.__rotaciona_esquerda(no.esquerda)
                no = self.__rotaciona_direita(no)
        return no