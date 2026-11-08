#lang racket
(require rackunit)
; Requer que lst1 e lst2 tenham o mesmo tamanho
(define (soma-ponderada lst1 lst2)
  (cond
    [(and (empty? lst1) (empty? lst2))
     0]
    [else
     (+ (* (first lst1) (first lst2))
        (soma-ponderada (rest lst1) (rest lst2)))]))

(check-equal? (soma-ponderada empty empty) 0)
(check-equal? (soma-ponderada (list 4) (list 2)) 8) ; (+ 0 (* 4 2))
(check-equal? (soma-ponderada (list 3 4) (list 5 2)) 23) ; (+ (* 3 5) (* 4 2))
(check-equal? (soma-ponderada (list 5 3 4) (list 1 5 2)) 28) ; (+ (* 5 1) (* 3 5) (* 4 2))