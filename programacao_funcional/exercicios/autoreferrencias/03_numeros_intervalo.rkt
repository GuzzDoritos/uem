#lang racket
(define (intervalo a b)
    (cond 
        [(> a b) empty]
        [else (cons a (intervalo (+ a 1) b))]))

(intervalo 1 6)
(intervalo 3 14)
(intervalo 6 2)
(intervalo 5 5)