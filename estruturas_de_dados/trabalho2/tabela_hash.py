from typing import Generic, TypeVar

K = TypeVar("K", int, float, str)

class TabelaHash(Generic[K]):
    """
    Implementa um Conjunto (Set) usando tabela hash com sondagem linear.

    Exemplos:
    >>> th = TabelaHash(5)
    >>> th.inserir(10)
    >>> th.contem(10)
    True
    >>> th.contem(5)
    False
    >>> th.remover(10)
    >>> th.contem(10)
    False
    >>> th.tamanho()
    0
    """

    _DELETED = object()

    def __init__(self, capacidade: int = 1000) -> None:
        self.tabela: list[K | object | None] = [None] * capacidade
        self.num_elementos = 0

    def _hash(self, chave: K) -> int:
        """Calcula o hash da chave."""
        return hash(chave) % len(self.tabela)

    def _rehash(self, chave: K, i: int) -> int:
        """Função de re-hash para sondagem linear."""
        return (hash(chave) + i) % len(self.tabela)

    def tamanho(self) -> int:
        """
        Retorna o número de elementos atualmente armazenados.

        Exemplos:
        >>> th = TabelaHash(3)
        >>> th.inserir(1)
        >>> th.inserir(2)
        >>> th.tamanho()
        2
        """
        return self.num_elementos

    def inserir(self, chave: K) -> None:
        """
        Insere uma chave no conjunto. Se já existir, não faz nada.

        Exemplos:
        >>> th = TabelaHash(3)
        >>> th.inserir(5)
        >>> th.inserir(5)  # inserir duplicado não aumenta tamanho
        >>> th.tamanho()
        1
        """
        if self.num_elementos == len(self.tabela):
            raise IndexError('Tabela cheia.')

        idx = self._hash(chave)
        i = 0
        idx_base = idx
        idx_apagado = None

        while self.tabela[idx] is not None:
            if self.tabela[idx] is TabelaHash._DELETED:
                if idx_apagado is None:
                    idx_apagado = idx
            elif self.tabela[idx] == chave:
                return
            i += 1
            idx = self._rehash(chave, i)
            if idx == idx_base:
                break

        if idx_apagado is not None:
            self.tabela[idx_apagado] = chave
        else:
            self.tabela[idx] = chave
        
        self.num_elementos += 1

    def contem(self, chave: K) -> bool:
        """
        Retorna True se a chave está no conjunto, False caso contrário.

        Exemplos:
        >>> th = TabelaHash(3)
        >>> th.inserir("a")
        >>> th.contem("a")
        True
        >>> th.contem("b")
        False
        """
        idx = self._hash(chave)
        idx_base = idx
        i = 0
        
        while self.tabela[idx] is not None:
            if self.tabela[idx] is not TabelaHash._DELETED:
                if self.tabela[idx] == chave:
                    return True
            i += 1
            idx = self._rehash(chave, i)
            if idx == idx_base:
                return False
        return False

    def remover(self, chave: K) -> None:
        """
        Remove a chave usando o marcador de apagado.

        Exemplos:
        >>> th = TabelaHash(3)
        >>> th.inserir(7)
        >>> th.remover(7)
        >>> th.contem(7)
        False
        """
        idx = self._hash(chave)
        i = 0
        idx_base = idx
        
        while self.tabela[idx] is not None:
            if self.tabela[idx] is not TabelaHash._DELETED and self.tabela[idx] == chave:
                self.tabela[idx] = self._DELETED
                self.num_elementos -= 1
                return
            i += 1
            idx = self._rehash(chave, i)
            if idx == idx_base:
                return
