def maior_string(lista: list[str]) -> int:
    if len(lista) == 1:
        return len(lista[0])
    else:
        resto = maior_string(lista[1:])
        if len(lista[0]) > resto:
            return len(lista[0])
        else:
            return resto
        
print(maior_string(["tes", "test", "testando", "oi"]))