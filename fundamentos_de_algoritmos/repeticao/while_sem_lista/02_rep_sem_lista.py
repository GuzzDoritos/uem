def codificar_mensagem(msg: str) -> str:
    '''
    Codifica uma mensagem, através da troca de um caractere pelo seu vizinho.
    Para toda mensagem que tiver quantidade de caracteres ímpar, será adicionado um # no final.
    >>> msg_1: str = "Esta é uma mensagem."
    >>> msg_2: str = "Quantidade ímpar."
    >>> codificar_mensagem(msg_1)
    'sEaté u amm neaseg.m'
    >>> codificar_mensagem(msg_2)
    'uQnaitadedí pmra#.'
    '''

    msg_c: str = ""

    i: int = 0

    if not len(msg) % 2 == 0:
        msg = msg + "#"

    while i < len(msg) - 1:
        msg_c = msg_c + msg[i + 1] + msg[i]
        i = i + 2


    return msg_c