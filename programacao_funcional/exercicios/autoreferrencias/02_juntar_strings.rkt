#lang racket
(define (junta l s)
  (cond
    [(empty? (rest l)) (first l)]
    [else
     (string-append (first l) s (junta (rest l) s))]))

(junta (list "ola" "tudo bem?") ", ")
(junta (list "string unica") "!")
(junta (list "ola" "mundo!") " ")
(junta (list "a" "b" "c" "d" "e" "f" "g") " ")
(junta (list "ra" "nome" "nota") ",")
(junta (list "inteiro" "real") "->")