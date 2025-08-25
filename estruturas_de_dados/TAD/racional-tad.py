from __future__ import annotations


class Racional:
    def __init__(self, numerador: int, denominador: int) -> None:
        """Inicializa um número racional com o *numerador* e *denominador*
        dados, simplificando a fração. Lança uma exceção ValueError se o 
        denominador for zero.
        Exemplos:
        >>> num1 = Racional(4, 6)
        >>> print(num1)
        2/3
        >>> num2 = Racional(-10, -20)
        >>> print(num2)
        1/2
        >>> num3 = Racional(3, -9)
        >>> print(num3)
        -1/3
        >>> Racional(1, 0)
        Traceback (most recent call last):
            ...
        ValueError: Denominador não pode ser zero.
        """
        if denominador == 0:
            raise ValueError("Denominador não pode ser zero.")

        self.numerador = numerador
        self.denominador = denominador
        self.simplificar()
        
    
    @staticmethod
    def mdc(a: int, b: int) -> int:
        """Calcula o máximo divisor comum (MDC) entre os inteiros *a* e *b*.
        Exemplo:
        >>> Racional.mdc(12, 18)
        6
        >>> Racional.mdc(7, 5)
        1
        >>> Racional.mdc(0, 10)
        10
        >>> Racional.mdc(0, 0) # embora indeterminado, por conveniência devolve 0
        0
        """
        if b == 0:
            return abs(a)
        return Racional.mdc(b, a % b)
    
    @staticmethod
    def mmc(a: int, b: int) -> int:
        """Calcula o mínimo múltiplo comum (MMC) entre dois inteiros.
        >>> Racional.mmc(4, 6)
        12
        >>> Racional.mmc(7, 5)
        35
        >>> Racional.mmc(0, 10)
        0
        """
        if a == 0 or b == 0:
            return 0
        return abs(a * b) // Racional.mdc(a, b)
   

    def simplificar(self) -> None:
        """Simplifica a fração dividindo o numerador e o denominador pelo seu 
        máximo divisor comum (MDC).
        Garante que o sinal fique no numerador e o denominador seja positivo.
        Exemplo:
        >>> num = Racional(1, 1)
        >>> num.numerador = 10
        >>> num.denominador = -20
        >>> num.simplificar()
        >>> print(num)
        -1/2
        >>> num.numerador = -6
        >>> num.denominador = -9
        >>> num.simplificar()
        >>> print(num)
        2/3
        >>> num.numerador = 0    # Convenção:
        >>> num.denominador = 5  # fração nula sempre tem denominador 1.
        >>> num.simplificar()
        >>> print(num)
        0/1
        """
        mdc = Racional.mdc(self.numerador, self.denominador)
        if mdc == 0:
            self.denominador = 1
            return

        self.numerador = self.numerador // mdc
        self.denominador = self.denominador // mdc

        if self.denominador < 0:
            self.numerador = self.numerador * -1
            self.denominador = self.denominador * -1

    def __add__(self, outro: Racional) -> Racional:
        """Soma dois números racionais.
        Exemplos:
        >>> num1 = Racional(1, 2)
        >>> num2 = Racional(1, 3)
        >>> num3 = Racional(2, 3)
        >>> print(num1 + num2) # invoca __add__ via operador binário infixado
        5/6
        >>> print(num2.__add__(num3)) # invocação direta da função __add__
        1/1
        """
        res = Racional(1, 1)
        if self.denominador == outro.denominador:
            res.numerador = self.numerador + outro.numerador
            res.denominador = self.denominador
        else:
            mmc = Racional.mmc(self.denominador, outro.denominador)
            aux1 = (mmc // self.denominador) * self.numerador
            aux2 = (mmc // outro.denominador) * outro.numerador
            res.numerador = aux1 + aux2
            res.denominador = mmc
        
        res.simplificar()
        return res
            
    def __sub__(self, outro: Racional) -> Racional:
        """Subtrai dois números racionais.
        Exemplo:
        >>> num1 = Racional(3, 4)
        >>> num2 = Racional(1, 4)
        >>> num3 = Racional(2, 3)
        >>> print(num1 - num2)
        1/2
        >>> print(num3 - num2)
        5/12
        """
        res = Racional(1, 1)
        if self.denominador == outro.denominador:
            res.numerador = self.numerador - outro.numerador
            res.denominador = self.denominador
        else:
            mmc = Racional.mmc(self.denominador, outro.denominador)
            aux1 = (mmc // self.denominador) * self.numerador
            aux2 = (mmc // outro.denominador) * outro.numerador
            res.numerador = aux1 - aux2
            res.denominador = mmc
        
        res.simplificar()
        return res


    def __mul__(self, outro: Racional) -> Racional:
        """Multiplica dois números racionais.
        Exemplo:
        >>> num1 = Racional(2, 3)
        >>> num2 = Racional(3, 4)
        >>> print(num1 * num2)
        1/2
        """
        res = Racional(1, 1)

        res.numerador = self.numerador * outro.numerador
        res.denominador = self.denominador * outro.denominador
        
        res.simplificar()
        return res


    def __truediv__(self, outro: Racional) -> Racional:
        """Divide dois números racionais.
        Exemplo:
        >>> num1 = Racional(2, 3)
        >>> num2 = Racional(4, 5)
        >>> print(num1 / num2)
        5/6
        >>> Racional(1, 2) / Racional(0, 1)
        Traceback (most recent call last):
            ...
        ZeroDivisionError: Divisão por zero.
        """
        if outro.numerador == 0:
            raise ZeroDivisionError('Divisão por zero.')
            
        res = Racional(1, 1)
        
        res.numerador = self.numerador * outro.denominador
        res.denominador = self.denominador * outro.numerador

        res.simplificar()
        return res

    def __eq__(self, outro: Racional) -> bool:
        """Devolve True se self e other são iguais; caso contrário, devolve False.
        Exemplos:
        >>> Racional(1, 2) == Racional(2, 4)
        True
        >>> Racional(1, 2) == Racional(3, 4)
        False
        """
        return self.numerador == outro.numerador and self.denominador == outro.denominador


    def __lt__(self, outro: Racional) -> bool:
        """Devolve True se self for menor que other; caso contrário, devolve False.
        >>> Racional(1, 3) < Racional(1, 2)
        True
        >>> Racional(3, 4) < Racional(1, 4)
        False
        """
        return self.numerador < outro.numerador if self.denominador == outro.denominador else self.denominador > outro.denominador
    
    def __str__(self) -> str:
        """Retorna a representação da fração no formato 'numerador/denominador'.
        >>> print(Racional(1, 2))
        1/2
        >>> print(Racional(5, 4))
        5/4
        >>> print(Racional(-3, 7))
        -3/7
        """
        return f"{self.numerador}/{self.denominador}"


    def to_decimal(self):
        """Devolve o valor decimal (ponto flutuante) da fração.
        Exemplos
        >>> Racional(1, 2).to_decimal()
        0.5
        >>> Racional(3, 4).to_decimal()
        0.75
        >>> Racional(-5, 2).to_decimal()
        -2.5
        >>> Racional(0, 3).to_decimal()
        0.0
        """
        return self.numerador / self.denominador
        

# OBSERVAÇÕES:
# Os métodos mdc e mmc usam o decorator @staticmethod indicando que:
# Não depende de nenhuma instância de Racional.
# Não precisa acessar self.numerador, nem self.denominador.
# Mas ainda faz sentido estar dentro da classe, pois é relevante para 
# a matemática de números racionais.

# Todos os operadores relacionais:
# Operador   Método especial
#    ==      __eq__(self, other)
#    !=	     __ne__(self, other)
#    <       __lt__(self, other)
#    <=      __le__(self, other)
#    >       __gt__(self, other)
#    >=      __ge__(self, other)