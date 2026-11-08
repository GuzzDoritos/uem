#lang racket
(define (produto-lista lst)
  (cond
    [(empty? lst)
     1]
    [else
     (* (first lst)
        (produto-lista (rest lst)))]))