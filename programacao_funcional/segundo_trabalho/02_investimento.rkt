#lang racket
(require rackunit)

;; Uso de IA: o Claude (Anthropic) revisou este arquivo em relação ao enunciado
;; e ao estilo da disciplina. A partir da revisão, ele reorganizou os exemplos
;; (agora após cada função), criou novos exemplos (inclusive para
;; aplica-rendimento e meses-ate-ultrapassar), acrescentou as definições de
;; dados e as restrições dos parâmetros. A implementação das funções não foi
;; alterada nessa revisão.

;; =============================================================================
;; Problema 2 - Investimento Mensal de Luiz
;; =============================================================================

;; =============================================================================
;; Definição de Dados
;; =============================================================================

;; Dinheiro é um número não negativo, em reais.
;; Porcentagem é um número não negativo que representa o rendimento mensal
;; (10 significa 10% ao mês).
;; Meses é um número Natural.

;; =============================================================================
;; Funções
;; =============================================================================

;; Dinheiro Porcentagem -> Dinheiro
;; Calcula o valor atualizado após aplicar um rendimento de p% sobre valor.
(define (aplica-rendimento valor p)
  (+ valor (* valor (/ p 100))))

(check-equal? (aplica-rendimento 0 10) 0)
(check-equal? (aplica-rendimento 100 0) 100)
(check-equal? (aplica-rendimento 100 10) 110)    ; (+ 100 (* 100 0.10))
(check-equal? (aplica-rendimento 200 50) 300)    ; (+ 200 (* 200 0.50))
(check-= (aplica-rendimento 500 0.5) 502.5 0.0001)

;; Dinheiro Porcentagem Meses -> Dinheiro
;; a. Calcula o total acumulado por Luiz ao final de t meses, depositando
;; r reais no início de cada mês em uma aplicação que rende p% ao final de cada
;; mês. No mês 0 (t = 0), o total acumulado é 0. A cada mês, soma-se o depósito
;; r ao saldo acumulado do mês anterior e aplica-se o rendimento de p% ao final
;; do mês.
(define (total-acumulado r p t)
  (cond
    [(zero? t)
     0]
    [else
     (aplica-rendimento (+ (total-acumulado r p (sub1 t)) r) p)]))

;; Com 0 meses, o acumulado é 0
(check-equal? (total-acumulado 100 1 0) 0)

;; Depósito de R$ 100,00 com 10% ao mês:
;; Mês 1: (0 + 100) * 1.10 = 110
;; Mês 2: (110 + 100) * 1.10 = 231
;; Mês 3: (231 + 100) * 1.10 = 364.1
(check-equal? (total-acumulado 100 10 1) 110)
(check-equal? (total-acumulado 100 10 2) 231)
(check-= (total-acumulado 100 10 3) 364.1 0.0001)

;; Sem rendimento (p = 0%): apenas soma os depósitos r * t
(check-equal? (total-acumulado 250 0 4) 1000)

;; Sem depósitos (r = 0): o acumulado permanece 0
(check-equal? (total-acumulado 0 10 5) 0)

;; Depósito de R$ 500,00 com 1% ao mês:
;; Mês 1: 500 * 1.01 = 505
;; Mês 2: (505 + 500) * 1.01 = 1015.05
(check-= (total-acumulado 500 1 1) 505.0 0.0001)
(check-= (total-acumulado 500 1 2) 1015.05 0.0001)

;; Dinheiro Porcentagem Dinheiro Dinheiro -> Meses
;; Função auxiliar que calcula quantos meses adicionais, a partir de
;; saldo-atual, são necessários para que o saldo acumulado ultrapasse (> m) o
;; montante m, com depósitos mensais de r reais e rendimento de p% ao mês.
;; Requer que r > 0, para que o saldo cresça a cada mês.
(define (meses-ate-ultrapassar r p m saldo-atual)
  (cond
    [(> saldo-atual m)
     0]
    [else
     (add1 (meses-ate-ultrapassar r
                                  p
                                  m
                                  (aplica-rendimento (+ saldo-atual r) p)))]))

;; O saldo atual já ultrapassa o montante
(check-equal? (meses-ate-ultrapassar 100 10 100 110) 0)
;; O saldo atual é igual ao montante: falta mais um mês
(check-equal? (meses-ate-ultrapassar 100 10 110 110) 1)
;; Partindo do saldo do mês 1 (110), chega a 364.1 em mais 2 meses
(check-equal? (meses-ate-ultrapassar 100 10 300 110) 2)
;; Partindo do zero
(check-equal? (meses-ate-ultrapassar 100 0 250 0) 3)

;; Dinheiro Porcentagem Dinheiro -> Meses
;; b. Calcula o tempo (em meses) necessário para que Luiz ultrapasse o montante
;; de m reais, mantendo depósitos mensais de r reais com rendimento de p% ao
;; mês.
;; Requer que r > 0, pois sem depósitos o montante nunca é ultrapassado.
(define (tempo-para-ultrapassar r p m)
  (meses-ate-ultrapassar r p m 0))

;; Com r = 100 e p = 10%:
;; Mês 1 = 110, Mês 2 = 231, Mês 3 = 364.1
;; Para ultrapassar 0, basta o primeiro depósito
(check-equal? (tempo-para-ultrapassar 100 10 0) 1)
;; 110 > 100 no mês 1
(check-equal? (tempo-para-ultrapassar 100 10 100) 1)
;; Precisa ultrapassar (> 110), logo mês 2 (231)
(check-equal? (tempo-para-ultrapassar 100 10 110) 2)
;; 231 > 230 no mês 2
(check-equal? (tempo-para-ultrapassar 100 10 230) 2)
;; 364.1 > 231 no mês 3
(check-equal? (tempo-para-ultrapassar 100 10 231) 3)
;; Sem rendimento, atinge 1000 no mês 4 e ultrapassa (1250) no mês 5
(check-equal? (tempo-para-ultrapassar 250 0 1000) 5)
;; 1015.05 > 1000 no mês 2
(check-equal? (tempo-para-ultrapassar 500 1 1000) 2)
