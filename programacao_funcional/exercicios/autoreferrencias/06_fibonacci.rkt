#lang racket
(define (fibonacci n)
    (cond 
    [(<= n 1) 0]
    [(= n 2) 1]
    [else (+ (fibonacci (- n 1)) (fibonacci (- n 2)))]))

(fibonacci 1)
(fibonacci 2)
(fibonacci 3)
(fibonacci 4)
(fibonacci 5)
(fibonacci 6)
(fibonacci 7)
(fibonacci 8)
(fibonacci 9)