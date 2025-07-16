def soma_matriz(matriz: list) -> int:
    """
    Recebe uma matriz de 4 linhas e 3 colunas e retorna a soma de todos os seus elementos
    >>> m1: list = [[1, 1, 1],[1, 1, 1],[1, 1, 1],[1, 1, 1]]
    >>> m2: list = [[1, 2, 3],[4, 5, 6],[7, 8, 9],[1, 2, 3]]
    >>> m3: list = [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]]
    >>> m4: list = [[-12, 515, 12],[-1512, 4738, 16],[742, 384, -17574],[2767, 574, 126236]]
    >>> soma_matriz(m1)
    12
    >>> soma_matriz(m2)
    51
    >>> soma_matriz(m3)
    0
    >>> soma_matriz(m4)
    116886
    """
    
    soma: int = 0
    
    for i in range(len(matriz) - 1):
        for j in range(len(matriz[i]) - 1):
            soma = soma + matriz[i][j]
    
    return soma