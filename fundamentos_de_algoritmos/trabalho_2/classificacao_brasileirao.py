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
    
    jogos = le_arquivo(sys.argv[1]) # type: ignore

    

    # TODO: solução da pergunta 1

    classificacao_campeonato(jogos)

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

class Tabela(Enum):
    '''Representa os valores de estruturação da tabela de classificação.'''
    ESPACOS_COLUNA = 3
    PRIMEIRA_LINHA_TITULO = "TIMES"
    PRIMEIRA_LINHA_PONTOS = " P "
    PRIMEIRA_LINHA_VITORIAS = " V "
    PRIMEIRA_LINHA_SALDOS = " S "

@dataclass
class Time:
    '''Representa a instância de um time.
    nome (string): nome do time
    pontos (int): quantidade de pontos de um time
    gols_feitos (int): quantidade de gols feitos
    gols_sofridos (int): quantidade de gols sofridos
    saldo_gols (int): gols feitos - gols sofridos
    vitorias (int): número de vitórias'''
    nome: str
    pontos: int
    gols_feitos: int
    gols_sofridos: int
    saldo_gols: int
    vitorias: int

@dataclass
class Jogo:
    '''Representa a instância de um jogo.
    anfitriao (string): nome do time anfitrião
    gols_anfitriao (int): qtd. de gols do time anfitrião
    visitante (string): nome do time visitante
    gols_visitante (int): qtd. de gols do time visitante
    '''

    anfitriao: str
    gols_anfitriao: int
    visitante: str
    gols_visitante: int

def classificacao_campeonato(jogos_fonte: list[str]):
    '''Retorna a classificação do campeonato, a partir da análise do arquivo fonte de *jogos_f*,
     em uma tabela, organizado por critérios na seguinte prioridade: pontos, número de vitórias,
     saldo de gols e ordem alfabética.
     TODO: Exemplos'''

    jogos_temp: list[list[str]] = []
    
    for i in range(len(jogos_fonte)):
        jogos_temp.append(separar_string(jogos_fonte[i]))

    jogos: list[Jogo] = criar_jogos(jogos_temp)
    times: list[Time] = criar_times(jogos)

    imprimir_tabela(times)

def imprimir_tabela(lista_times: list[Time]):
    print("yo")

def ordenar_times(lista_times: list[Time]):
    '''Recebe uma *lista_times*, e então os ordena por seus pontos totais.
    Caso haja empate, o desempate será realizado na seguinte ordem:
    1. Vitórias
    2. Saldo de gols
    3. Ordem alfabética
    TODO: Exemplos'''

    

def criar_jogos(lista: list[list[str]]) -> list[Jogo]:
    '''Recebe uma *lista* de jogos em formato string,
    criando uma nova lista com cada jogo representado por
    tipo composto.
    Exemplos:
    >>> lista_jogos_fonte = [['Sao-Paulo', '1', 'Palmeiras', '3'], ['Atletico-MG', '2', 'Flamengo', '0']]
    >>> lista_jogos = criar_jogos(lista_jogos_fonte)
    >>> lista_jogos[0].anfitriao
    'Sao-Paulo'
    '''
    lista_jogos: list[Jogo] = []

    for i in range(len(lista)):
        anfitriao: str = lista[i][ColunasJogos.ANFITRIAO.value]
        gols_anfitriao: int = int(lista[i][ColunasJogos.GOLS_ANFITRIAO.value])
        visitante: str = lista[i][ColunasJogos.VISITANTE.value]
        gols_visitante: int = int(lista[i][ColunasJogos.GOLS_VISITANTE.value])
        
        lista_jogos.append(Jogo(anfitriao, gols_anfitriao, visitante, gols_visitante))
    
    return lista_jogos

def criar_times(lista_jogos: list[Jogo]) -> list[Time]:
    '''
    Recebe uma *lista_jogos* e a partir desta, cria todos os times,
    definindo seus valores conforme tipo composto *Time*, adicionando-os
    a uma *lista_times* e retornando-a.
    Exemplos:
    >>> lista_jogos1 = [Jogo('Sao-Paulo', 1, 'Palmeiras', 3), Jogo('Atletico-MG', 2, 'Flamengo', 0)]
    >>> lista_times1 = criar_times(lista_jogos1)
    >>> lista_times1[0].nome
    'Sao-Paulo'
    >>> lista_times1[0].gols_feitos
    1
    >>> lista_times1[2].vitorias
    1
    >>> lista_times1[1].pontos
    3
    '''

    lista_times: list[Time] = []

    for i in range(len(lista_jogos)):
        pos_anfitriao: int = encontrar_pos_time(lista_times, lista_jogos[i].anfitriao)
        pos_visitante: int = encontrar_pos_time(lista_times, lista_jogos[i].visitante)
        
        anfitriao: Time = lista_times[pos_anfitriao]
        visitante: Time = lista_times[pos_visitante]

        anfitriao.gols_feitos += lista_jogos[i].gols_anfitriao
        anfitriao.gols_sofridos += lista_jogos[i].gols_visitante
        anfitriao.saldo_gols = anfitriao.gols_feitos - anfitriao.gols_sofridos

        visitante.gols_feitos += lista_jogos[i].gols_visitante
        visitante.gols_sofridos += lista_jogos[i].gols_anfitriao
        visitante.saldo_gols = visitante.gols_feitos - visitante.gols_sofridos

        if anfitriao.gols_feitos == visitante.gols_feitos:
            anfitriao.pontos += 1
            visitante.pontos += 1
        elif anfitriao.gols_feitos > visitante.gols_feitos:
            anfitriao.vitorias += 1
            anfitriao.pontos += 3
        else:
            visitante.vitorias += 1
            visitante.pontos += 3

    return lista_times

def encontrar_pos_time(times: list[Time], nome_time: str) -> int:
    '''
    Verifica se um time com nome *nome_time* se encontra
    em uma lista *times*, e retorna sua posição. Se não tiver esse time,
    cria o mesmo, adiciona à lista e retorna o novo index.
    >>> time_sp = Time('Sao-Paulo', 3, 2, 1, 1, 2)
    >>> time_pl = Time('Palmeiras', 1, 5, 4, 4, 1)
    >>> time_ag = Time('Atletico-MG', 2, 1, 12, 19, 1)
    >>> time_fl = Time('Flamengo', 5, 5, 0, 3, 4)
    >>> times1: list[Time] = [time_sp, time_pl, time_fl]
    >>> times2: list[Time] = [time_ag, time_fl, time_sp]
    >>> times3: list[Time] = [time_fl]
    >>> times4: list[Time] = []
    >>> encontrar_pos_time(times1, 'Sao-Paulo')
    0
    >>> encontrar_pos_time(times2, 'Flamengo')
    1
    >>> encontrar_pos_time(times3, 'Atletico-MG')
    1
    >>> encontrar_pos_time(times4, 'Santos')
    0
    >>> encontrar_pos_time(times2, 'Palmeiras')
    3
    '''

    existe: bool = False
    index: int = 0

    for i in range(len(times)):
        if times[i].nome == nome_time:
            existe = True
            index = i

    if not existe:
        novo_time: Time = Time(nome_time, 0, 0, 0, 0, 0)
        times.append(novo_time)
        index = len(times) - 1

    return index

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