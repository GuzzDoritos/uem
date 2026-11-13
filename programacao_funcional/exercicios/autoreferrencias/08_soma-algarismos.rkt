#lang racket

(define (soma-algarismos n)
  (cond
    [(zero? n) 0]
    [else (+ (remainder n 10) (soma-algarismos (quotient n 10)))]))

(soma-algarismos 1234)
(soma-algarismos 92)
