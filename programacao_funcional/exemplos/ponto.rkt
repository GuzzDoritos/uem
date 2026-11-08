#lang racket
(struct ponto (x y) #:transparent)

;p eh um ponto
(define (distancia-da-origem p)
  (sqrt (+ (sqr (ponto-x p))
           (sqr (ponto-y p)))))