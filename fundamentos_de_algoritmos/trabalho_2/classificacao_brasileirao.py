import sys
from dataclasses import dataclass
from enum import Enum

class ColunasJogos(Enum):
    '''Representa o significado de cada posição na lista da string de um jogo separado.'''
    ANFITRIAO = 0
    GOLS_ANFITRIAO = 1
    VISITANTE = 2
    GOLS_VISITANTE = 3

class Tabela(Enum):
    '''Representa os valores de estruturação da tabela de classificação.'''
    ESPACOS_COLUNA = 4
    PRIMEIRA_LINHA_TITULO = "TIMES"
    PRIMEIRA_LINHA_PONTOS = "P   "
    PRIMEIRA_LINHA_VITORIAS = "V   "
    PRIMEIRA_LINHA_SALDOS = "S"

@dataclass
class Time:
    '''Representa a instância de um time.
    nome (string): nome do time
    pontos (int): quantidade de pontos de um time
    gols_feitos (int): quantidade de gols feitos
    gols_sofridos (int): quantidade de gols sofridos
    saldo_gols (int): gols feitos - gols sofridos
    vitorias (int): número de vitórias
    jogos_anfitriao (int): quantidade de vezes que jogou como anfitrião
    pontos_anfitriao (int): quantidade de pontos que ganhou como anfitrião
    aproveitamento_anfitriao (int): razão entre os pontos que ganhou e os pontos possíveis totais, como anfitrião'''
    nome: str
    pontos: int = 0
    gols_feitos: int = 0
    gols_sofridos: int = 0
    saldo_gols: int = 0
    vitorias: int = 0
    jogos_anfitriao: int = 0
    pontos_anfitriao: int = 0
    aproveitamento_anfitriao: float = 0.0

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

# SOLUÇÃO PERGUNTA 1

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
            if i == len(string) - 1:
                lista.append(temp)
        
    return lista

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
        novo_time: Time = Time(nome_time)
        times.append(novo_time)
        index = len(times) - 1

    return index

def time_maior_nome(lista_times: list[Time]) -> str:
    '''Encontra o time com o maior nome a partir de uma *lista_times*.
    Exemplos:
    >>> lista: list[Time] = [Time('Sao-Paulo'), Time('Flamengo'), Time('Red-Bull-Bragantino'), Time('Santos')]
    >>> time_maior_nome(lista)
    'Red-Bull-Bragantino'

    >>> lista2: list[Time] = [Time('Gremio'), Time('Cruzeiro'), Time('Internacional')]
    >>> time_maior_nome(lista2)
    'Internacional'

    >>> lista3: list[Time] = [Time('Palmeiras'), Time('Corinthians'), Time('Vasco')]
    >>> time_maior_nome(lista3)
    'Corinthians'
    '''
    maior_nome: str = lista_times[0].nome
    for i in range(len(lista_times)):
        if len(lista_times[i].nome) > len(maior_nome):
            maior_nome = lista_times[i].nome
    return maior_nome
        
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
    Recebe uma *lista_jogos* e, a partir dela, cria todos os times envolvidos,
    atualizando suas estatísticas (pontos, vitórias, gols, etc.) de acordo com os jogos disputados.
    Retorna uma lista com objetos do tipo composto *Time*.
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
        anfitriao.jogos_anfitriao += 1

        visitante.gols_feitos += lista_jogos[i].gols_visitante
        visitante.gols_sofridos += lista_jogos[i].gols_anfitriao
        visitante.saldo_gols = visitante.gols_feitos - visitante.gols_sofridos

        if lista_jogos[i].gols_anfitriao == lista_jogos[i].gols_visitante:
            anfitriao.pontos += 1
            anfitriao.pontos_anfitriao += 1
            visitante.pontos += 1
        elif lista_jogos[i].gols_anfitriao > lista_jogos[i].gols_visitante:
            anfitriao.vitorias += 1
            anfitriao.pontos += 3
            anfitriao.pontos_anfitriao += 3
        else:
            visitante.vitorias += 1
            visitante.pontos += 3

    return lista_times

def ordenar_times(lista_times: list[Time]):
    '''Recebe uma *lista_times*, e então os ordena por seus pontos totais.
    Exemplos:
    >>> lista1: list[Time] = [
    ...     Time("A",pontos=6), 
    ...     Time("B",pontos=3),
    ...     Time("C",pontos=7)
    ... ]
    >>> ordenar_times(lista1)
    >>> lista1[0].nome
    'C'
    >>> lista1[1].nome
    'A'
    >>> lista1[2].nome
    'B'
    '''

    n = len(lista_times)
    for i in range(n):
        maximo = i
        for j in range(i + 1, n):
            if lista_times[maximo].pontos < lista_times[j].pontos:
                maximo = j
        aux = lista_times[i]
        lista_times[i] = lista_times[maximo]
        lista_times[maximo] = aux


def desempatar_pontos(lista_times: list[Time]):
    '''
    Recebe uma *lista_times* e então organiza por ordem
    de vitórias os times que estiverem empatados por pontos
    Exemplos:
    >>> lista1: list[Time] = [
    ...     Time("A",pontos=3,saldo_gols=3,vitorias=1), 
    ...     Time("B",pontos=3,saldo_gols=3,vitorias=2)
    ... ]
    >>> desempatar_pontos(lista1)
    >>> lista1[0].nome
    'B'
    >>> lista1[1].nome
    'A'
    '''
    n = len(lista_times)

    for i in range(n):
        max_idx: int = i
        for j in range(i + 1, n):
            pontos_iguais: bool = lista_times[j].pontos == lista_times[max_idx].pontos
            if lista_times[j].vitorias > lista_times[max_idx].vitorias and pontos_iguais:
                max_idx = j
        lista_times[i], lista_times[max_idx] = lista_times[max_idx], lista_times[i]

def desempatar_vitorias(lista_times: list[Time]):
    '''
    Recebe uma *lista_times* e então organiza por ordem
    de *saldo_gols* os times que estiverem empatados por pontos E vitórias
    Exemplos:
    >>> lista1: list[Time] = [
    ...     Time("A",pontos=6,saldo_gols=2,vitorias=2), 
    ...     Time("B",pontos=6,saldo_gols=5,vitorias=2)
    ... ]
    >>> desempatar_vitorias(lista1)
    >>> lista1[0].nome
    'B'
    >>> lista1[1].nome
    'A'
    '''
    n = len(lista_times)

    for i in range(n):
        max_idx: int = i
        for j in range(i + 1, n):
            pontos_iguais: bool = lista_times[j].pontos == lista_times[max_idx].pontos
            vitorias_iguais: bool = lista_times[j].vitorias == lista_times[max_idx].vitorias
            if lista_times[j].saldo_gols > lista_times[max_idx].saldo_gols and pontos_iguais and vitorias_iguais:
                max_idx = j
        lista_times[i], lista_times[max_idx] = lista_times[max_idx], lista_times[i]

def desempatar_saldos(lista_times: list[Time]):
    '''
    Recebe uma *lista_times* e então organiza por ordem
    alfabética os times que estiverem empatados por pontos, vitórias E saldo de gols.
    Exemplos:
    >>> lista1: list[Time] = [
    ...     Time("B",pontos=6,saldo_gols=3,vitorias=2), 
    ...     Time("A",pontos=6,saldo_gols=3,vitorias=2),
    ...     Time("C",pontos=6,saldo_gols=3,vitorias=2)
    ... ]
    >>> desempatar_saldos(lista1)
    >>> lista1[0].nome
    'A'
    >>> lista1[1].nome
    'B'
    >>> lista1[2].nome
    'C'
    '''
    n = len(lista_times)

    for i in range(n):
        min_idx: int = i
        for j in range(i + 1, n):
            pontos_iguais: bool = lista_times[j].pontos == lista_times[min_idx].pontos
            vitorias_iguais: bool = lista_times[j].vitorias == lista_times[min_idx].vitorias
            saldos_iguais: bool = lista_times[j].saldo_gols == lista_times[min_idx].saldo_gols
            if lista_times[j].nome < lista_times[min_idx].nome and saldos_iguais and pontos_iguais and vitorias_iguais:
                min_idx = j
        lista_times[i], lista_times[min_idx] = lista_times[min_idx], lista_times[i]

def imprimir_tabela(lista_times: list[Time]):
    '''Realiza a impressão da tabela de classificação do Brasileirão, 
    seguindo o modelo abaixo:
    TIMES        | P   V   S
    Nome-do-Time | 3   1  -1

    Exemplo:
    >>> lista: list[Time] = [
    ...     Time('Santos',pontos=9,vitorias=3,saldo_gols=2),
    ...     Time('Sao-Paulo',pontos=7,vitorias=2,saldo_gols=-1),
    ...     Time('Flamengo',pontos=1,vitorias=0,saldo_gols=-3)
    ... ]
    >>> imprimir_tabela(lista)
    TIMES     | P   V   S
    Santos    | 9   3   2
    Sao-Paulo | 7   2  -1
    Flamengo  | 1   0  -3
    >>>
    '''

    tam: int = len(lista_times)
    tam_coluna_time: int = len(time_maior_nome(lista_times))
    coluna_time_modelo: str = " " * tam_coluna_time

    primeira_linha_titulo: str = Tabela.PRIMEIRA_LINHA_TITULO.value
    primeira_linha_pontos: str = Tabela.PRIMEIRA_LINHA_PONTOS.value
    primeira_linha_vitorias: str = Tabela.PRIMEIRA_LINHA_VITORIAS.value
    primeira_linha_saldos: str = Tabela.PRIMEIRA_LINHA_SALDOS.value

    primeira_linha_titulo = primeira_linha_titulo + ( " " * (len(coluna_time_modelo) - len(primeira_linha_titulo))) + " | "

    primeira_linha = primeira_linha_titulo + primeira_linha_pontos + primeira_linha_vitorias + primeira_linha_saldos

    print(primeira_linha)

    for i in range(tam):
        nome_linha: str = lista_times[i].nome
        nome_linha = nome_linha + ( " " * (len(coluna_time_modelo) - len(nome_linha))) + " | "

        pontos: str = str(lista_times[i].pontos)
        vitorias: str = str(lista_times[i].vitorias)
        saldo_gols: str = str(lista_times[i].saldo_gols)

        vitorias_recuo: int = 0
        if lista_times[i].saldo_gols < 0:
            vitorias_recuo = 1

        pontos = pontos + ( " " * (Tabela.ESPACOS_COLUNA.value - len(pontos)))
        vitorias = vitorias + ( " " * (Tabela.ESPACOS_COLUNA.value - len(vitorias) - vitorias_recuo))

        linha: str = nome_linha + pontos + vitorias + saldo_gols

        print(linha)

def classificacao_campeonato(times: list[Time]):
    '''Retorna a classificação do campeonato, a partir da análise do arquivo fonte de *jogos_f*,
     em uma tabela, organizado por critérios na seguinte prioridade: pontos, número de vitórias,
     saldo de gols e ordem alfabética.
     Exemplo para a tabela presente na função *imprimir_tabela*'''
    ordenar_times(times)

    desempatar_pontos(times)
    desempatar_vitorias(times)
    desempatar_saldos(times)

    imprimir_tabela(times)

# FINAL SOLUÇÃO PERGUNTA 1

# COMEÇO SOLUÇÃO PERGUNTA 2

def maior_aproveitamento(times: list[Time]):
    '''
    Verifica e informa qual(is) time(s) na lista *times* possui(em)
    a maior taxa de aproveitamento jogando como anfitrião,
    sendo representada pela razão entre os pontos ganhos como anfitrião, e os
    pontos totais possíveis.
    Exemplo:
    >>> lista: list[Time] = [
    ...     Time('A',jogos_anfitriao=2,pontos_anfitriao=1),
    ...     Time('B',jogos_anfitriao=2,pontos_anfitriao=3),
    ...     Time('C',jogos_anfitriao=1,pontos_anfitriao=1),
    ... ]
    >>> maior_aproveitamento(lista)
    O time com maior aproveitamento como anfitrião é: B
    A maior taxa de aproveitamento é: 50.0%
    
    >>> lista2: list[Time] = [
    ...     Time('A',jogos_anfitriao=2,pontos_anfitriao=3),
    ...     Time('B',jogos_anfitriao=2,pontos_anfitriao=3),
    ...     Time('C',jogos_anfitriao=1,pontos_anfitriao=1),
    ... ]
    >>> maior_aproveitamento(lista2)
    Os times com maior aproveitamento como anfitriões são: A, B
    A maior taxa de aproveitamento é: 50.0%

    '''

    lista: list[Time] = []
    maior: Time = times[0]

    for i in range(len(times)):
        max_pontos: int = times[i].jogos_anfitriao * 3
        times[i].aproveitamento_anfitriao = times[i].pontos_anfitriao / max_pontos

        if times[i].aproveitamento_anfitriao > maior.aproveitamento_anfitriao:
            maior = times[i]
        
    lista.append(maior)

    for i in range(len(times)):
        if times[i].aproveitamento_anfitriao == maior.aproveitamento_anfitriao and times[i] != maior:
            lista.append(times[i])
    
    if len(lista) > 1: 
        msg_times: str = "Os times com maior aproveitamento como anfitriões são: "
    else:
        msg_times: str = "O time com maior aproveitamento como anfitrião é: "

    for i in range(len(lista)):
        if i == len(lista) - 1:
            msg_times = msg_times + lista[i].nome
        else:
            msg_times = msg_times + lista[i].nome + ", "

    taxa_aproveitamento: str = str(maior.aproveitamento_anfitriao * 100)[:4] + "%"

    print(msg_times)
    print("A maior taxa de aproveitamento é: " + taxa_aproveitamento)

# FINAL SOLUÇÃO PERGUNTA 2

# COMEÇO SOLUÇÃO PERGUNTA 3

def defesa_menos_vazada(times: list[Time]):
    '''
    Verifica qual time teve a menor quantidade de gols sofridos
    da lista *times*.
    Exemplos:
    >>> lista1: list[Time] = [
    ...     Time('A',gols_sofridos=7),
    ...     Time('B',gols_sofridos=2),
    ...     Time('C',gols_sofridos=5)
    ... ]
    >>> defesa_menos_vazada(lista1)
    O time com a defesa menos vazada foi B, com apenas 2 gols sofridos.'''
    melhor_defesa: Time = times[0]
    for i in range(len(times)):
        if times[i].gols_sofridos < melhor_defesa.gols_sofridos:
            melhor_defesa = times[i]

    print("O time com a defesa menos vazada foi " + melhor_defesa.nome + ", com apenas " + str(melhor_defesa.gols_sofridos) + " gols sofridos.")

# FINAL SOLUÇÃO PERGUNTA 3

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

def main():
    if len(sys.argv) < 2:
        print('Nenhum nome de arquivo informado.')
        sys.exit(1)
    
    if len(sys.argv) > 2:
        print('Muitos parâmetros. Informe apenas um nome de arquivo.')
        sys.exit(1)
    
    jogos_fonte: list[str] = le_arquivo(sys.argv[1])

    jogos_temp: list[list[str]] = []
    
    for i in range(len(jogos_fonte)):
        jogos_temp.append(separar_string(jogos_fonte[i]))

    jogos: list[Jogo] = criar_jogos(jogos_temp)
    times: list[Time] = criar_times(jogos)

    classificacao_campeonato(times)
    print()

    maior_aproveitamento(times)
    print()

    defesa_menos_vazada(times)

if __name__ == '__main__':
    main()