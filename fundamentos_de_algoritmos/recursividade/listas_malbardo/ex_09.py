def impar(n: int) -> bool:
    if n == 0:
        return False
    else:
        return par(n - 1)

def par(n: int) -> bool:
    if n == 0:
        return True
    else:
        return impar(n - 1)
    
print(par(6))
print(impar(6))
print(par(5))
print(impar(5))