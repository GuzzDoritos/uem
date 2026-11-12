#lang racket
(define (ultimo lst)
  (cond
    [(empty? lst) empty]
    [(empty? (rest lst)) (first lst)]
    [else (ultimo (rest lst))]))

(ultimo (list 1 2 3))
(ultimo (list 1))
(ultimo (list 1 3 4 2 1 7))