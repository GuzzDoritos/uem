def posicoes_ocorrencia_nome(nomes: list[str], procurado: str) -> list[int]:
    '''
    Determina em quais posições um determinado nome se encontra em uma lista.
    Exemplos:
    >>> posicoes_ocorrencia_nome(['suika', 'reimu', 'suika', 'marisa', 'reimu'], 'suika')
    [0, 2]
    >>> posicoes_ocorrencia_nome(['ganondorf', 'link', 'navi', 'link', 'zelda', 'navi'], 'zelda')
    [4]
    >>> posicoes_ocorrencia_nome(['luigi', 'mario', 'luigi', 'mario', 'luigi', 'mario'], 'luigi')
    [0, 2, 4]
    '''

    posicoes: list[int] = []
    # posicao_atual: int = 0

    # for nome in nomes:
    #     if nome == procurado:
    #         posicoes.append(posicao_atual)
    #     posicao_atual += 1

    for i in range(0, len(nomes) - 1):
        if nomes[i] == procurado:
            posicoes.append(i)

    return posicoes