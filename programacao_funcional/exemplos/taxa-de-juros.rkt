#lang racket
;Faça uma função que receba o valor de um depósito
;e o valor da taxa de juros (em porcentagem), calcule
;e retorne o valor total depois do rendimento.
(define (juros deposito taxa)
  (+ deposito (* deposito (/ taxa 100))))

(juros 100 20)
(juros 1500 10)

