#lang racket
(require rackunit)

;; =============================================================================
;; Item (a) - Representação de um aluno
;; =============================================================================

(struct aluno (ra nome nota1 nota2 nota3 nota4 total-faltas) #:transparent)
;; Representa um aluno matriculado em uma disciplina do sistema acadêmico
;;   ra           : Natural - registro acadêmico do aluno
;;   nome         : String  - nome completo do aluno
;;   nota1        : Numero  - nota da 1ª avaliação
;;   nota2        : Numero  - nota da 2ª avaliação
;;   nota3        : Numero  - nota da 3ª avaliação
;;   nota4        : Numero  - nota da 4ª avaliação
;;   total-faltas : Natural - total de faltas acumuladas pelo aluno

;; aluno -> Numero
;; Calcula a média aritmética simples das 4 avaliações de um aluno.
(define (media-aluno al)
  (/ (+ (aluno-nota1 al)
        (aluno-nota2 al)
        (aluno-nota3 al)
        (aluno-nota4 al))
     4))

;; =============================================================================
;; Item (b) - Verificação de aprovação ou motivo de reprovação do aluno
;; =============================================================================

;; Situacao é uma das 4 strings:
;; - "Aprovado"
;; - "Reprovado por nota"
;; - "Reprovado por faltas"
;; - "Reprovado por nota e faltas"

;; aluno Numero Numero Numero -> Situacao
;; Verifica se o aluno foi aprovado ou por qual motivo foi reprovado.
;; O parâmetro perc-max-faltas representa a porcentagem máxima de faltas
;; permitida (ex: 25 para 25%), sendo o limite de faltas calculado como
;; (* carga-horaria (/ perc-max-faltas 100)).
(define (situacao-aluno al nota-aprovacao carga-horaria perc-max-faltas)
  (define media (media-aluno al))
  (define limite-faltas (* carga-horaria (/ perc-max-faltas 100)))
  (define atingiu-nota? (>= media nota-aprovacao))
  (define cumpriu-frequencia? (<= (aluno-total-faltas al) limite-faltas))
  (cond
    [(and atingiu-nota? cumpriu-frequencia?)
     "Aprovado"]
    [(and (not atingiu-nota?) cumpriu-frequencia?)
     "Reprovado por nota"]
    [(and atingiu-nota? (not cumpriu-frequencia?))
     "Reprovado por faltas"]
    [else
     "Reprovado por nota e faltas"]))

;; =============================================================================
;; Item (c) - Relatório consolidado da turma de alunos
;; =============================================================================

(struct relatorio-turma (total-reprovados
                         percentual-reprovados
                         total-reprovados-nota
                         percentual-reprovados-nota
                         total-reprovados-faltas
                         percentual-reprovados-faltas
                         media-reprovados-nota) #:transparent)
;; Representa as estatísticas consolidadas de reprovação de uma turma:
;;   total-reprovados           : Natural - total de alunos reprovados na turma
;;   percentual-reprovados      : Numero  - percentual de reprovados em relação ao total da turma (0 a 100)
;;   total-reprovados-nota      : Natural - total de alunos que reprovaram por não atingir nota (inclui "Reprovado por nota" e "Reprovado por nota e faltas")
;;   percentual-reprovados-nota : Numero  - percentual de reprovados por nota em relação ao total de reprovados (0 a 100)
;;   total-reprovados-faltas    : Natural - total de alunos que reprovaram por faltas (inclui "Reprovado por faltas" e "Reprovado por nota e faltas")
;;   percentual-reprovados-faltas : Numero - percentual de reprovados por faltas em relação ao total de reprovados (0 a 100)
;;   media-reprovados-nota      : Numero  - média das notas médias dos alunos reprovados por nota

;; aluno Numero Numero Numero -> Booleano
;; Produz #t se o aluno foi reprovado por qualquer motivo, e #f caso contrário.
(define (reprovado? al nota-aprovacao carga-horaria perc-max-faltas)
  (not (equal? (situacao-aluno al nota-aprovacao carga-horaria perc-max-faltas)
               "Aprovado")))

;; aluno Numero Numero Numero -> Booleano
;; Produz #t se o aluno reprovou por não atingir a nota mínima necessária
;; (situação "Reprovado por nota" ou "Reprovado por nota e faltas").
(define (reprovado-por-nota? al nota-aprovacao carga-horaria perc-max-faltas)
  (define sit (situacao-aluno al nota-aprovacao carga-horaria perc-max-faltas))
  (or (equal? sit "Reprovado por nota")
      (equal? sit "Reprovado por nota e faltas")))

;; aluno Numero Numero Numero -> Booleano
;; Produz #t se o aluno reprovou por ultrapassar o limite de faltas
;; (situação "Reprovado por faltas" ou "Reprovado por nota e faltas").
(define (reprovado-por-faltas? al nota-aprovacao carga-horaria perc-max-faltas)
  (define sit (situacao-aluno al nota-aprovacao carga-horaria perc-max-faltas))
  (or (equal? sit "Reprovado por faltas")
      (equal? sit "Reprovado por nota e faltas")))

;; Lista(aluno) -> Natural
;; Conta o número total de alunos na turma.
(define (conta-alunos turma)
  (cond
    [(empty? turma)
     0]
    [else
     (add1 (conta-alunos (rest turma)))]))

;; Lista(aluno) Numero Numero Numero -> Natural
;; Conta o número total de alunos reprovados na turma.
(define (conta-reprovados turma nota-aprovacao carga-horaria perc-max-faltas)
  (cond
    [(empty? turma)
     0]
    [(reprovado? (first turma) nota-aprovacao carga-horaria perc-max-faltas)
     (add1 (conta-reprovados (rest turma) nota-aprovacao carga-horaria perc-max-faltas))]
    [else
     (conta-reprovados (rest turma) nota-aprovacao carga-horaria perc-max-faltas)]))

;; Lista(aluno) Numero Numero Numero -> Natural
;; Conta quantos alunos da turma reprovaram por não atingir nota suficiente.
(define (conta-reprovados-nota turma nota-aprovacao carga-horaria perc-max-faltas)
  (cond
    [(empty? turma)
     0]
    [(reprovado-por-nota? (first turma) nota-aprovacao carga-horaria perc-max-faltas)
     (add1 (conta-reprovados-nota (rest turma) nota-aprovacao carga-horaria perc-max-faltas))]
    [else
     (conta-reprovados-nota (rest turma) nota-aprovacao carga-horaria perc-max-faltas)]))

;; Lista(aluno) Numero Numero Numero -> Natural
;; Conta quantos alunos da turma reprovaram por faltas.
(define (conta-reprovados-faltas turma nota-aprovacao carga-horaria perc-max-faltas)
  (cond
    [(empty? turma)
     0]
    [(reprovado-por-faltas? (first turma) nota-aprovacao carga-horaria perc-max-faltas)
     (add1 (conta-reprovados-faltas (rest turma) nota-aprovacao carga-horaria perc-max-faltas))]
    [else
     (conta-reprovados-faltas (rest turma) nota-aprovacao carga-horaria perc-max-faltas)]))

;; Lista(aluno) Numero Numero Numero -> Numero
;; Soma as médias individuais dos alunos que reprovaram por nota na turma.
(define (soma-medias-reprovados-nota turma nota-aprovacao carga-horaria perc-max-faltas)
  (cond
    [(empty? turma)
     0]
    [(reprovado-por-nota? (first turma) nota-aprovacao carga-horaria perc-max-faltas)
     (+ (media-aluno (first turma))
        (soma-medias-reprovados-nota (rest turma) nota-aprovacao carga-horaria perc-max-faltas))]
    [else
     (soma-medias-reprovados-nota (rest turma) nota-aprovacao carga-horaria perc-max-faltas)]))

;; Numero Numero -> Numero
;; Calcula o percentual (de 0 a 100) de parte em relação a todo, retornando 0 se todo for 0.
(define (calcula-percentual parte todo)
  (if (zero? todo)
      0
      (* (/ parte todo) 100)))

;; Lista(aluno) Numero Numero Numero -> relatorio-turma
;; Analisa uma turma de alunos e produz um relatorio-turma com os totais,
;; percentuais e média dos alunos reprovados.
;; Obs: Alunos com situação "Reprovado por nota e faltas" são contabilizados
;; tanto em total-reprovados-nota quanto em total-reprovados-faltas, e uma
;; única vez em total-reprovados.
(define (analisa-turma turma nota-aprovacao carga-horaria perc-max-faltas)
  (define total-alunos (conta-alunos turma))
  (define tot-rep (conta-reprovados turma nota-aprovacao carga-horaria perc-max-faltas))
  (define tot-rep-nota (conta-reprovados-nota turma nota-aprovacao carga-horaria perc-max-faltas))
  (define tot-rep-faltas (conta-reprovados-faltas turma nota-aprovacao carga-horaria perc-max-faltas))
  (define soma-notas-rep (soma-medias-reprovados-nota turma nota-aprovacao carga-horaria perc-max-faltas))
  (define media-rep-nota
    (if (zero? tot-rep-nota)
        0
        (/ soma-notas-rep tot-rep-nota)))
  (relatorio-turma tot-rep
                   (calcula-percentual tot-rep total-alunos)
                   tot-rep-nota
                   (calcula-percentual tot-rep-nota tot-rep)
                   tot-rep-faltas
                   (calcula-percentual tot-rep-faltas tot-rep)
                   media-rep-nota))

;; =============================================================================
;; Testes
;; =============================================================================

(define al-aprovado (aluno 101 "Ana Silva" 8.0 7.0 9.0 8.0 10))
(define al-fronteira (aluno 102 "Bruno Costa" 6.0 6.0 6.0 6.0 20))
(define al-rep-nota (aluno 103 "Carlos Souza" 4.0 5.0 3.0 4.0 12))
(define al-rep-faltas (aluno 104 "Daniela Lima" 7.0 8.0 7.0 8.0 25))
(define al-rep-ambos (aluno 105 "Eduardo Rocha" 2.0 3.0 1.0 2.0 30))

;; Testes de media-aluno
(check-equal? (media-aluno al-aprovado) 8.0)
(check-equal? (media-aluno al-fronteira) 6.0)
(check-equal? (media-aluno al-rep-nota) 4.0)
(check-equal? (media-aluno al-rep-faltas) 7.5)
(check-equal? (media-aluno al-rep-ambos) 2.0)

;; Testes de situacao-aluno (nota mínima 6.0, carga horária 80h, limite 25% = 20h)
(check-equal? (situacao-aluno al-aprovado 6.0 80 25) "Aprovado")
(check-equal? (situacao-aluno al-fronteira 6.0 80 25) "Aprovado")
(check-equal? (situacao-aluno al-rep-nota 6.0 80 25) "Reprovado por nota")
(check-equal? (situacao-aluno al-rep-faltas 6.0 80 25) "Reprovado por faltas")
(check-equal? (situacao-aluno al-rep-ambos 6.0 80 25) "Reprovado por nota e faltas")

;; Teste de turma vazia
(check-equal? (analisa-turma empty 6.0 80 25)
              (relatorio-turma 0 0 0 0 0 0 0))

;; Teste de turma apenas com alunos aprovados
(define turma-aprovada (list al-aprovado al-fronteira))
(check-equal? (analisa-turma turma-aprovada 6.0 80 25)
              (relatorio-turma 0 0 0 0 0 0 0))

;; Teste de turma sem sobreposição de motivos (1 aprovado, 1 rep nota, 1 rep faltas, 1 aprovado)
(define turma-mista (list al-aprovado al-rep-nota al-rep-faltas al-fronteira))
(check-equal? (analisa-turma turma-mista 6.0 80 25)
              (relatorio-turma 2 50 1 50 1 50 4.0))

;; Teste de turma completa com os 5 alunos (2 aprovados, 3 reprovados: 2 por nota, 2 por faltas)
;; Médias dos reprovados por nota: al-rep-nota (4.0) e al-rep-ambos (2.0) -> média 3.0
(define turma-completa (list al-aprovado al-fronteira al-rep-nota al-rep-faltas al-rep-ambos))
(check-equal? (analisa-turma turma-completa 6.0 80 25)
              (relatorio-turma 3 60 2 (/ 200 3) 2 (/ 200 3) 3.0))
