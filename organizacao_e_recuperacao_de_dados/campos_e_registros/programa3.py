def main():
    escreve_registros()

def escreve_registros():
    NOME_ARQ = input('Informe o nome do arquivo a ser escrito: ')
    try:
        SAIDA = open(NOME_ARQ, 'wb')
    except:
        raise FileNotFoundError(f"Arquivo {NOME_ARQ} não encontrado no diretório.")
    
    CAMPO = input("Digite o seu sobrenome: ")
    while CAMPO:
        BUFFER = ""
        BUFFER += f"{CAMPO}|"
        campos = [
            'Digite o seu nome: ', 
            'Digite a sua cidade: ', 
            'Digite o seu endereço: ', 
            'Digite o seu estado: ', 
            'Digite o seu CEP: ']
        
        for campo in campos:
            CAMPO = input(campo)
            BUFFER += f"{CAMPO}|"
        
        BUFFER = BUFFER.encode()
        TAM = len(BUFFER).to_bytes(2, 'little')

        SAIDA.write(TAM)
        SAIDA.write(BUFFER)

        CAMPO = input("Digite o seu sobrenome: ")

    SAIDA.close()


if __name__ == "__main__":
    main()
