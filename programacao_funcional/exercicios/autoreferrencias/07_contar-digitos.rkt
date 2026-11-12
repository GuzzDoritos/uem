#lang racket
(define (conta-digitos n)
    (cond
    [(not (integer? n)) 0]
    [else (+ 1 (conta-digitos (/ n 10)))]))

(conta-digitos 1234)
(conta-digitos 222)
