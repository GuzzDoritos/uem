from pilha import Pilha

def posfixa(expressao: str) -> float:
    '''
    Efetua a avaliação de uma **expressão** no formato posfixo. Considera que os operandos 
    são números inteiros e que há apenas os operadores básicos: multiplicação, divisão, subtração e adição.
    Operadores e operandos são separados por espaços em branco.

    Exemplos:
    >>> posfixa('1 2 +')      # equivalente a (1 + 2)
    3
    >>> posfixa('-1 -2 +')    # equivalente a (-1 + -2)
    -3
    >>> posfixa('1 2 + 3 *')  # equivalente a ((1 + 2) * 3)
    9
    >>> posfixa('1 2 3 + *')  # equivalente a (1 * (2 + 3))
    5
    >>> posfixa('17 10 + 3 * 9 /') # equivalente a (((17 + 10) * 3) / 9). Aqui estaria devolvendo um float e não int.
    9
    >>> posfixa('5 3 4 * + 2 -') # equivale a (((3 * 4) + 5) - 2)
    15
    '''
    # sugestão para facilitar o processamento da string
    lista = expressao.split()
    pass


if __name__ == '__main__':
    expressao = input('Escreva a expressão posfixa a ser avaliada: ')
    print(posfixa(expressao))