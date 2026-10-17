# Padrões de Projeto e Critérios de Avaliação (Programação Funcional - UEM)

Este documento sintetiza os padrões exigidos no **Trabalho Prático 1** e nas notas de aula do curso (Slides 01 a 05 — *Prof. Marco A. L. Barbosa / DIN-UEM*). Utilize este guia como referência para validar os exercícios já desenvolvidos e orientar a implementação dos próximos.

---

## 1. Critérios de Avaliação do Trabalho Prático 1

De acordo com o enunciado oficial do trabalho (`Trabalho1.pdf`), a avaliação considera:
1. **Corretude:** Atendimento estrito aos requisitos do enunciado e aos casos de borda.
2. **Indentação do código:** Alinhamento correto de parênteses e expressões idiomáticas do Racket.
3. **Nomeação de variáveis e funções:** Identificadores expressivos em minúsculas separados por hífen (`kebab-case`). Constantes em letras maiúsculas (`SCREAMING_SNAKE_CASE` ou `KEBAB-CASE-MAIUSCULO`).
4. **Comentários de especificação:** Assinatura de tipos e descrição do propósito de cada função.
5. **Conjunto de testes/exemplos:** Testes abrangentes para cada função desenvolvida.
6. **Pureza funcional:**
   - Proibição absoluta de efeitos colaterais e mutação de estado (`set!`, `set-mcar!`, etc.).
   - Utilização de recursão estrutural/generativa como forma exclusiva de repetição (sem laços imperativos).
   - Uso de tipos de dados compostos e autorreferências.

---

## 2. As 6 Etapas do Projeto de Funções (Metodologia HtDP)

Conforme o **Slide 03 (*Projeto de Funções*)**, toda função deve ser projetada seguindo este ciclo:

```
[1. Análise] ➔ [2. Tipos de Dados] ➔ [3. Especificação] ➔ [4. Implementação] ➔ [5. Verificação] ➔ [6. Revisão]
```

### Etapa 1: Análise
* Identificar o problema real, descartar dados irrelevantes e reconhecer o domínio do problema.

### Etapa 2: Definição dos Tipos de Dados
* Estabelecer as duas regras centrais de tipos de dados (Slide 04):
  1. *Faça os valores válidos representáveis.*
  2. *Faça os valores inválidos irrepresentáveis.*

### Etapa 3: Especificação
Composta obrigatoriamente por:
* **Assinatura (Contrato):** Apenas os tipos, no formato `;; TipoEntrada1 TipoEntrada2 ... -> TipoSaida`. **Não** incluir o nome da função antes da seta.
* **Propósito:** Descrever **o quê** a função faz (garantias da saída e restrições dos parâmetros), e **nunca o como** (detalhes da implementação).
* **Exemplos:** Casos representativos com comentário explicando a derivação matemática/lógica.

### Etapa 4: Implementação
* O corpo da função deve ser guiado pelo tipo de dado de entrada (modelo/template).
* Expressar seleções com `if` (para 2 caminhos) ou `cond` (para múltiplos ramos).
* Eliminar números mágicos extraindo constantes com `define`.

### Etapa 5: Verificação
* Automatizar os testes usando `rackunit`:
  - `(check-equal? expr esperado)` para igualdade exata e estrutural.
  - `(check-= expr esperado tolerancia)` para números reais com ponto flutuante sujeitos a arredondamento/precisão.
  - `(check-true expr)` e `(check-false expr)` para predicados booleanos.

### Etapa 6: Revisão
* Eliminar condições redundantes no `cond`.
* Simplificar expressões booleanas (ex.: substituir `(if x #t #f)` por `x`).

---

## 3. Modelo Padrão de Arquivo Racket

Todo arquivo `.rkt` de solução deve seguir esta anatomia:

```racket
#lang racket
(require rackunit)

;; =============================================================================
;; Tipos de Dados (quando houver novas structs/enumerações)
;; =============================================================================

;; (struct nome-tipo (campo1 campo2 ...) #:transparent)
;; Descrição do tipo...
;;   campo1 : Tipo - descrição
;;   campo2 : Tipo - descrição

;; =============================================================================
;; Função: nome-da-funcao
;; =============================================================================

;; TipoParam1 TipoParam2 -> TipoRetorno
;; Descrição clara do que a função produz a partir de suas entradas.
(define (nome-da-funcao param1 param2)
  corpo-da-funcao)

;; --- Testes ---

(check-equal? (nome-da-funcao arg1 arg2) resultado) ; explicacao do calculo
```

---

## 4. Padrões Específicos por Tipo de Dado

### A. Estruturas (Tipo Produto) — Slide 04
* Sempre declarar structs com a cláusula `#:transparent`:
  ```racket
  (struct aluno (ra nome n1 n2 n3 n4 faltas) #:transparent)
  ```
  *Motivo:* Permite que `check-equal?` compare pelo conteúdo dos campos e imprima os valores legíveis em mensagens de erro/inspeção.
* **Evolução de dados sem mutação:** Quando for necessário alterar o valor de um campo de uma estrutura, utilize `struct-copy`:
  ```racket
  (struct-copy aluno a [faltas (add1 (aluno-faltas a))])
  ```

### B. Enumerações e Uniões (Tipo Soma) — Slide 04
* Descrever os valores possíveis em comentários:
  ```racket
  ;; SituacaoAluno é um dos valores:
  ;; - "Aprovado"
  ;; - "Reprovado por Nota"
  ;; - "Reprovado por Faltas"
  ;; - "Reprovado por Ambos"
  ```
* Uma união com $N$ casos requer:
  1. Pelo menos $N$ testes/exemplos.
  2. Um `cond` com $N$ cláusulas tratando cada caso.

### C. Recursão sobre Dados Autorreferenciados — Slide 05
* Toda função recursiva precisa de:
  1. **Caso base:** Onde a recursão encerra (ex.: lista vazia ou zero).
  2. **Caso recursivo:** Decomposição do dado e chamada da função para o subproblema (ex.: `(rest lista)` ou `(sub1 n)`).
* Exemplo de modelo canônico:
  ```racket
  (define (processa-lista lst)
    (cond
      [(empty? lst) caso-base]
      [else (... (first lst)
                 (processa-lista (rest lst)))]))
  ```

---

## 5. Diretrizes para os Exercícios Restantes do Trabalho

### Exercício 3: Controle Acadêmico (3,0 pontos)
1. **3a (Representação do Aluno - 0,5 pt):**
   - Definir `(struct aluno (ra nome n1 n2 n3 n4 faltas) #:transparent)`.
   - Documentar os tipos de cada campo nos comentários.
2. **3b (Verificação Individual - 1,0 pt):**
   - Entradas: `aluno`, `nota-minima`, `carga-horaria`, `percentual-max-faltas`.
   - Calcular média das 4 notas e limite de faltas permitido (`(* carga-horaria percentual-max-faltas)`).
   - Retornar uma constante/símbolo/string indicando aprovação ou o motivo da reprovação (nota, faltas ou ambos).
3. **3c (Estatísticas da Turma - 1,5 pt):**
   - **Restrição Crítica do PDF:** Não imprimir mensagens (`display`, `printf`). Retornar uma estrutura de dados (por exemplo, `struct turma-relatorio` ou similar).
   - Processar a lista de alunos utilizando recursão estrutural ou funções funcionais de alta ordem (`map`, `filter`, `foldr`).

### Exercícios 4 e 5: Pilha e Fila Sem Listas Nativas (4,0 pontos)
* **Restrição Crítica do PDF:** Não usar listas prontas do Racket (`'()`, `cons`, `car`, `cdr`, `first`, `rest`, `list`, `empty?`, `null?`).
* **Como modelar:**
  - Definir tipos de dados algébricos próprios usando `struct`:
    ```racket
    (struct pilha-vazia () #:transparent)
    (struct no-pilha (topo anterior) #:transparent)
    ```
  - **Pilha (Ex. 4):**
    - `(empilhar p elem)` -> cria novo `no-pilha`.
    - `(desempilhar p)` -> retorna a pilha anterior.
    - `(consultar-topo p)` -> retorna o elemento do topo.
  - **Fila (Ex. 5):**
    - `(enfileirar f elem)`
    - `(desenfileirar f)`
    - `(consultar-primeiro f)`
  - As operações devem ser puras (retornam uma nova estrutura, sem modificar a existente).

---

## 6. Checklist de Submissão

- [ ] Todos os arquivos começam com `#lang racket` e `(require rackunit)`.
- [ ] Todas as funções possuem contrato no padrão `;; Tipo ... -> TipoRetorno`.
- [ ] Todos os propósitos explicam o **o quê** e não o **como**.
- [ ] Nenhuma mutação de estado (`set!`) foi utilizada.
- [ ] Nenhuma lista nativa foi usada nos exercícios 4 e 5.
- [ ] Nenhuma mensagem foi impressa em tela no exercício 3c.
- [ ] Nome do pacote compactado segue o padrão: `Nome1_RAXXXXXX-Nome2_RAYYYYYY.zip`.
