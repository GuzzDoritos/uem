#lang racket
(require rackunit)

;; =============================================================================
;; Problema 2 - Investimento Mensal de Luiz
;; =============================================================================

;; Numero Numero -> Numero
;; Calcula o valor atualizado após aplicar um rendimento de p% sobre valor.
(define (aplica-rendimento valor p)
  (+ valor (* valor (/ p 100))))

;; Numero Numero Natural -> Numero
;; a. Calcula o total acumulado por Luiz ao final de t meses, depositando r reais
;; no início de cada mês em uma aplicação que rende p% ao final de cada mês.
;; No mês 0 (t = 0), o total acumulado é 0. A cada mês, soma-se o depósito r ao
;; saldo acumulado do mês anterior e aplica-se o rendimento de p% ao final do mês.
(define (total-acumulado r p t)
  (cond
    [(zero? t)
     0]
    [else
     (aplica-rendimento (+ (total-acumulado r p (sub1 t)) r) p)]))

;; Numero Numero Numero Numero -> Natural
;; Função auxiliar que calcula quantos meses adicionais, a partir de saldo-atual,
;; são necessários para que o saldo acumulado ultrapasse (> m) o montante m.
(define (meses-ate-ultrapassar r p m saldo-atual)
  (cond
    [(> saldo-atual m)
     0]
    [else
     (add1 (meses-ate-ultrapassar r
                                  p
                                  m
                                  (aplica-rendimento (+ saldo-atual r) p)))]))

;; Numero Numero Numero -> Natural
;; b. Calcula o tempo (em meses) necessário para que Luiz ultrapasse o montante
;; de m reais, mantendo depósitos mensais de r reais com rendimento de p% ao mês.
(define (tempo-para-ultrapassar r p m)
  (meses-ate-ultrapassar r p m 0))

;; =============================================================================
;; Testes
;; =============================================================================

;; Testes do item (a) - total-acumulado
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

;; Depósito de R$ 500,00 com 1% ao mês por 2 meses:
;; Mês 1: 500 * 1.01 = 505
;; Mês 2: (505 + 500) * 1.01 = 1015.05
(check-= (total-acumulado 500 1 1) 505.0 0.0001)
(check-= (total-acumulado 500 1 2) 1015.05 0.0001)

;; Testes do item (b) - tempo-para-ultrapassar
;; Com r = 100 e p = 10%:
;; Mês 1 = 110, Mês 2 = 231, Mês 3 = 364.1
(check-equal? (tempo-para-ultrapassar 100 10 100) 1)   ; 110 > 100 no mês 1
(check-equal? (tempo-para-ultrapassar 100 10 110) 2)   ; precisa ultrapassar (> 110), logo mês 2 (231)
(check-equal? (tempo-para-ultrapassar 100 10 230) 2)   ; 231 > 230 no mês 2
(check-equal? (tempo-para-ultrapassar 100 10 231) 3)   ; 364.1 > 231 no mês 3
(check-equal? (tempo-para-ultrapassar 250 0 1000) 5)   ; sem juros, atinge 1000 no mês 4 e ultrapassa (1250) no mês 5
(check-equal? (tempo-para-ultrapassar 500 1 1000) 2)   ; 1015.05 > 1000 no mês 2
