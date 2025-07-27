def repeticao(n: int, v: int) -> list[int]:
    lista: list[int] = [v]
    if n == 0:
        lista = []
        return lista
    else:
        return lista + repeticao(n - 1, v)