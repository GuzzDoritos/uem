import sys
from dataclasses import dataclass
from enum import Enum

def main():
    if len(sys.argv) < 2:
        print('Nenhum nome de arquivo informado.')
        sys.exit(1)
    
    if len(sys.argv) > 2:
        print('Muitos parâmetros. Informe apenas um nome de arquivo.')
        sys.exit(1)
    
    jogos = le_arquivo(sys.argv[1])
    
    # TODO: solução da pergunta 1

    

    # TODO: solução da pergunta 2
    # TODO: solução da pergunta 3
    
def le_arquivo(nome: str) -> list[str]:
    '''
    Lê o conteúdo do arquivo *nome* e devolve uma lista onde cada elemento
    representa uma linha.
    Por exemplo, se o conteúdo do arquivo for
    Sao-Paulo 1 Atletico-MG 2
    Flamengo 2 Palmeiras 1
    a resposta produzida é
    [‘Sao-Paulo 1 Atletico-MG 2’, ‘Flamengo 2 Palmeiras 1’]
    '''

    try:
        with open(nome) as f:
            return f.readlines()
    except IOError as e:
        print(f'Erro na leitura do arquivo "{nome}": {e.errno} - {e.strerror}.')
        sys.exit(1)

class ColunasJogos(Enum):
    '''Representa o significado de cada posição na lista da string de um jogo separado.'''
    ANFITRIAO = 0
    GOLS_ANFITRIAO = 1
    VISITANTE = 2
    GOLS_VISITANTE = 3

@dataclass
class Time:
    '''Representa a instância de um time.
    nome (string): nome do time
    pontos (int): quantidade de pontos de um time
    gols_feitos (int): quantidade de gols feitos
    gols_sofridos (int): quantidade de gols sofridos'''
    nome: str
    pontos: int
    gols_feitos: int
    gols_sofridos: int


def verificar_time(nome_time: str, times: Time) -> bool:
    '''
    Verifica se um time com nome *nome_time* se encontra
    em uma lista *times*.
    >>> time_sp = Time('Sao-Paulo', 3, 2, 1)
    >>> time_pl = Time('Palmeiras', 1, 5, 4)
    >>> time_ag = Time('Atletico-MG', 2, 1, 12)
    >>> time_fl = Time('Flamengo', 5, 5, 0)
    >>> times1 = [time_sp, time_pl, time_fl]
    >>> times2 = [time_ag, time_p]
    '''

    return True

def separar_string(string: str) -> list[str]:
    '''
    Recebe uma *string* e retorna uma lista com todos as palavras separadas em elementos individuais, de acordo com os espaços.
    Exemplos:
    >>> separar_string("Sao-Paulo 1 Palmeiras 3")
    ['Sao-Paulo', '1', 'Palmeiras', '3']
    >>> separar_string("Atletico-MG 2 Flamengo 0")
    ['Atletico-MG', '2', 'Flamengo', '0']
    '''
    lista: list[str] = []
    
    temp: str = ""
    for i in range(len(string)):
        if string[i] == " ":
            lista.append(temp)
            temp = ""
        else:
            temp = temp + string[i]
            if string[i] == string[-1]:
                lista.append(temp)
        
    return lista

if __name__ == '__main__':
    main()