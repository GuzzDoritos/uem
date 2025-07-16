def formatar_sobrenome_nome_separados(nome: str, sobrenome: str) -> str:
    '''
    Recebe como entradas um nome (str) e um sobrenome (str) e, utilizando essas entradas, retorna uma str no formato "sobrenome, nome".
    Exemplos:
    >>> formatar_sobrenome_nome_separados(nome = "jose", sobrenome = "silva")
    'silva, jose'
    >>> formatar_sobrenome_nome_separados(nome = "reimu", sobrenome = "hakurei")
    'hakurei, reimu'
    >>> formatar_sobrenome_nome_separados(nome = "miku", sobrenome = "hatsune")
    'hatsune, miku'
    '''

    return sobrenome + ", " + nome