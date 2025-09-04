from filo_stack import Pilha

def balanceada(expressao: str) -> bool:
    '''
    Determina se uma sequência de parênteses de uma **expressão** está corretamente balanceada, 
    isto é, se cada parêntese de abertura possui um parêntese correspondente de fechamento na
    ordem correta.

    Exemplos:
    >>> balanceada('()')
    True
    >>> balanceada('(())')
    True
    >>> balanceada('(()())')
    True
    >>> balanceada('abc')
    True
    >>> balanceada('((a + b) * (c - d))')
    True
    >>> balanceada('((()))')
    True
    >>> balanceada('c.append(len(f(a) + f(b)))')
    True
    >>> balanceada('(')
    False
    >>> balanceada(')')
    False
    >>> balanceada('())')
    False
    >>> balanceada('((())')
    False
    >>> balanceada('(()))')
    False
    >>> balanceada('((a + b) * (c - d)')
    False
    >>> balanceada('c.append(len(f(a) + f)b()))')
    False
    '''
    exp_parenteses = ""
    
    for i in expressao:
        if i == "(" or i == ")":
            exp_parenteses += i
    
    pilha_teste = Pilha(len(exp_parenteses))

    for j in exp_parenteses:
        if j == "(":
            pilha_teste.empilha(1)
        elif j == ")":
            try:
                pilha_teste.desempilha()
            except ValueError:
                return False
    
    return True if pilha_teste.quantidade == 0 else False

if __name__ == '__main__':
    expressao = input('Escreva a expressão com parênteses a ser verificada: ')
    if balanceada(expressao):
        print('Válida')
    else:
        print('Inválida')