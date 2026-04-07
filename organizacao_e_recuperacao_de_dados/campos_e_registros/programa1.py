def main():
    escreve_campos()

def escreve_campos():
    FILE_NAME = input('Informe o nome do arquivo:')
    saida = open(FILE_NAME, 'w', encoding='utf-8')
    SOBRENOME = input('Informe o seu sobrenome')
    listaInfo = [
        'Digite o seu nome: ', 
        'Digite a sua cidade: ', 
        'Digite o seu endereço: ', 
        'Digite o seu estado: ', 
        'Digite o seu CEP: ']

    while SOBRENOME:
        infoValores = []
        infoValores.append(SOBRENOME+"|")

        for info in listaInfo:
            valor = input(info)
            infoValores.append(valor+'|')
        
        saida.writelines(infoValores)

        SOBRENOME = input('Informe o seu sobrenome')
    saida.close();

if __name__ == "__main__":
    main()
