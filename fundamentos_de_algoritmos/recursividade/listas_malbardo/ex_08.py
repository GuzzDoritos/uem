def juntar_numeros(n: int) -> str:
    if n == 1:
        return "1"
    else:
        return juntar_numeros(n - 1) + "," + str(n)

print(juntar_numeros(5))