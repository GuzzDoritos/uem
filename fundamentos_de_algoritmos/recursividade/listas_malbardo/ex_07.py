def produto(n: int) -> int:
    if n == 1:
        return n
    else:
        return n * produto(n - 1)