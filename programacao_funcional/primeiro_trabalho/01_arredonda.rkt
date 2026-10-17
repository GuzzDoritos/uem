#lang racket
(require rackunit)

;; Real Natural -> Real
;; Arredonda o número real x para n casas decimais.
(define (arredonda x n)
  (exact->inexact (/ (round (* x (expt 10 n)))
                     (expt 10 n))))

;; --- Testes ---

;; Exemplos do enunciado (Trabalho 1)
(check-equal? (arredonda 3.14159265359 1) 3.1)
(check-equal? (arredonda 3.14159265359 2) 3.14)
(check-equal? (arredonda 3.14159265359 3) 3.142)
(check-equal? (arredonda 3.14159265359 4) 3.1416)

;; Testes adicionais solicitados no PDF
(check-equal? (arredonda 2.5 0) 2.0)
(check-equal? (arredonda 3.5 0) 4.0)
(check-equal? (arredonda -2.567 1) -2.6)
(check-equal? (arredonda -2.567 2) -2.57)
(check-equal? (arredonda 7 2) 7.0)
(check-equal? (arredonda 1/3 3) 0.333)
(check-equal? (arredonda 2.233228 5) 2.23323)