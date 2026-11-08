#lang racket
(require rackunit)
(define (insere-fim lst n)
  (cond
    [(empty? lst)
     (cons n empty)] ; (list n)
    [else
     (cons (first lst)
           (insere-fim (rest lst) n))]))
(define (lista-natural n)
  (cond
    [(zero? n)
     empty]
    [else
     (insere-fim (lista-natural (sub1 n)) n)]))

(check-equal? (lista-natural 5) (list 1 2 3 4 5))
(check-equal? (lista-natural 0) empty)
(check-equal? (lista-natural 1) (list 1))
(check-equal? (lista-natural 9) (list 1 2 3 4 5 6 7 8 9))