#lang racket
(define (soma-aninhada lst)
  (cond
    [(empty? lst)
     0]
    [(list? (first lst))
     (+ (soma-aninhada (first lst))
        (soma-aninhada (rest lst)))]
    [else
     (+ (first lst)
        (soma-aninhada (rest lst)))]))

(soma-aninhada (list (list
                      (list 5)
                      1 2 empty 3)
                     (list 1
                           (list 3 4))
                     4))