NOME_ARQ = 'pessoasGOTfixo.dat'
TAMANHO_REGISTRO = 64
TAMANHO_CABECA = 4


def main():
    busca_rrn()

def busca_rrn():
    ENTRADA = open(NOME_ARQ, 'rb')
    CAB = ENTRADA.read(TAMANHO_CABECA)
    TOTAL_REG = int.from_bytes(CAB, 'little')
    RRN = int(input("digita ai")) - 1
    

    if RRN >= TOTAL_REG:
        raise ValueError('you dum dum')
    
    OFFSET = RRN * 64 + 4
    ENTRADA.seek(OFFSET)
    REG = ENTRADA.read(TAMANHO_REGISTRO).decode("utf-8").split("|")

    for CAMPO in REG:
        print(CAMPO)
    ENTRADA.close()



if __name__ == "__main__":
    main()