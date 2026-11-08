#lang racket
(require rackunit)
(define (lista-positivos lst)
  (cond
    [(empty? lst)
     empty]
    [(positive? (first lst))
     (cons (first lst)
           (lista-positivos (rest lst)))]
    [else
     (lista-positivos(rest lst))]))

(check-equal? (lista-positivos (list 1 2 -3 4 5 -6 -7 8))
              (list 1 2 4 5 8))
(check-equal? (lista-positivos (list))
              (list))
(check-equal? (lista-positivos (list 1 2 3 4 5 6 7 8))
              (list 1 2 3 4 5 6 7 8))
(check-equal? (lista-positivos (list -1 -2 -3 -4 -5 -6 -7 -8))
              (list))


