#lang racket
(require rackunit)
(define (soma-lista lst)
  (cond
    [(empty? lst)
     0]
    [(+ (first lst)
        (soma-lista (rest lst)))]))

(check-equal? (soma-lista (list 1 2 3 4 5)) 15)
(check-equal? (soma-lista (list )) 0)
(check-equal? (soma-lista (list 3 -2 7 4 -1 -9)) 2)