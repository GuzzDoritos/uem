def main():
    le_campos()

def le_campos():
    NOME_ARQ = input('Informe o nome do arquivo a ser lido: ')
    ENTRADA = open(NOME_ARQ, 'r')
    contador = 1
    CAMPO = leia_campo(ENTRADA)
    while CAMPO:
        print(f"\tcampo #{contador}: {CAMPO}")
        contador += 1
        CAMPO = leia_campo(ENTRADA)
    ENTRADA.close()


def leia_campo(ENTRADA):
    CAMPO = ''
    C = ENTRADA.read(1)
    while C and C != '|':
        CAMPO = CAMPO + C
        C = ENTRADA.read(1)
    return CAMPO


    
if __name__ == "__main__":
    main()
