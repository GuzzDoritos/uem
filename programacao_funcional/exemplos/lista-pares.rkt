#lang racket

(require rackunit)
(define (lista-pares lst)
  (cond
    [(empty? lst)
     empty]
    [(even? (first lst))
     (cons (first lst)
           (lista-pares (rest lst)))]
    [else
     (lista-pares (rest lst))]))