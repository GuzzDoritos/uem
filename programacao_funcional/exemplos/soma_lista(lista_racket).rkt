#lang racket
(require rackunit)
(define (soma-lista lst)
  (cond
    [(empty? lst)
     0]
    [else
     (+ (first lst)
        (soma-lista (rest lst)))]))

(check-equal? (soma-lista (list 1 2 3 4)) 10)
(check-equal? (soma-lista empty) 0)
(check-equal? (soma-lista '()) 0)
(check-equal? (soma-lista (list )) 0)
(check-equal? (soma-lista '(1 2 3 4 5)) 15)