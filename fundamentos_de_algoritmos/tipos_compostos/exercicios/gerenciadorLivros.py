from enum import Enum, auto
from dataclasses import dataclass

class Status(Enum):
    EMPRESTADO = auto()
    DISPONIVEL = auto()

class Genero(Enum):
    TERROR = auto()
    SUSPENSE = auto()
    ROMANCE = auto()
    FANTASIA = auto()
    MISTERIO = auto()
    AVENTURA = auto()

@dataclass
class Livro:
    titulo: str
    autor: str
    isbn: str
    anoPublicacao: int
    genero: Genero
    status: Status = Status.DISPONIVEL

def verificarGeneroLivro(livro: Livro, genero: Genero) -> bool:
    '''
    Informa se um determinado livro corresponde a um gênero que o usuário deseja verificar.
    Exemplos:
    >>> verificarGeneroLivro(Livro("O Cão Dos Baskervilles", "Sir Arthur Conan Doyle", "1234", 1943, Genero.MISTERIO, Status.DISPONIVEL), Genero.TERROR)
    False
    >>> verificarGeneroLivro(Livro("A Culpa é Das Estrelas", "John Green", "5678", 2009, Genero.ROMANCE, Status.EMPRESTADO), Genero.MISTERIO)
    False
    >>> verificarGeneroLivro(Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "3333", 1954, Genero.FANTASIA, Status.DISPONIVEL), Genero.FANTASIA)
    True'''
    if livro.genero.value == genero.value:
        return True
    else:
        return False
    
def oLivroEstaDisponivel(livro: Livro) -> bool:
    '''
    Informa se um determinado livro está disponivel.
    Exemplos:
    >>> oLivroEstaDisponivel(Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "3333", 1954, Genero.FANTASIA, Status.DISPONIVEL))
    True
    >>> oLivroEstaDisponivel(Livro("A Culpa é Das Estrelas", "John Green", "5678", 2009, Genero.ROMANCE, Status.EMPRESTADO))
    False'''

    if livro.status == Status.DISPONIVEL:
        return True
    else:
        return False
    
def emprestar(livro: Livro) -> bool:
    '''
    Verifica se um livro está disponivel, e caso esteja, altera o status para EMPRESTADO e retorna True. Caso contrário, retorna
    False.
    Exemplos:
    >>> emprestar(Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "3333", 1954, Genero.FANTASIA, Status.DISPONIVEL))
    True
    >>> emprestar(Livro("A Culpa é Das Estrelas", "John Green", "5678", 2009, Genero.ROMANCE, Status.EMPRESTADO))
    False'''

    if livro.status == Status.DISPONIVEL:
        livro.status = Status.EMPRESTADO
        return True
    else:
        return False