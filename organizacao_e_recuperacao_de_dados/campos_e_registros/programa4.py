def main():
    le_registros()

def le_registros():
    NOME_ARQ = input('Informe o nome do arquivo a ser lido: ')
    try:
        ENTRADA = open(NOME_ARQ, 'rb')
    except:
        raise FileNotFoundError(f"Arquivo {NOME_ARQ} não encontrado no diretório.")
    
    BUFFER = leia_reg(ENTRADA)

    registros = 1

    while BUFFER:
        print(f"--Registro #{registros}--")
        registros += 1
        LISTA = BUFFER.split('|')
        contador = 1

        for CAMPO in LISTA:
            if CAMPO:
                print(f"\tCampo #{contador}: {CAMPO}")
            contador += 1

        BUFFER = leia_reg(ENTRADA)
    ENTRADA.close()

def leia_reg(ENTRADA):
    TAM = ENTRADA.read(2)

    TAM = int.from_bytes(TAM, 'little')

    if TAM > 0:
        BUFFER = ENTRADA.read(TAM)
        BUFFER = BUFFER.decode()
        return BUFFER
    else:
        return ''



if __name__ == "__main__":
    main()