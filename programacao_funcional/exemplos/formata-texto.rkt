#lang racket
; texto eh uma string
; tamanho eh um inteiro positivo
; posicao eh um dos 3 valores:
;  - centro
;  - esquerda
;  - direita

; texto tamanho posicao -> texto
(require examples)
(examples
 (check-equal? (formata-texto "ola mundo!" 10 "centro")
               "ola mundo!")
 (check-equal? (formata-texto "ola mundo!" 20 "centro")
               "     ola mundo!     ")
 (check-equal? (formata-texto "ola mundo!" 20 "esquerda")
               "ola mundo!          ")
 (check-equal? (formata-texto "ola mundo!" 20 "direita")
               "          ola mundo!")
 (check-equal? (formata-texto "ola mundo!" 8 "centro")
               "ola m...")
  (check-equal? (formata-texto "ola mundo!" 21 "centro")
               "     ola mundo!      "))
(define (formata-texto texto num-char pos)
  (define tam-texto (string-length texto))
  (define espacos (- num-char tam-texto))
  (cond
    [(= espacos 0)
     texto]
    [(< espacos 0)
     (string-append (substring texto 0 (- num-char 3)) "...")]
    [else
     (cond
       [(equal? pos "esquerda")
        (string-append texto (make-string espacos #\space))]
       [(equal? pos "direita")
        (string-append (make-string espacos #\space) texto)]
       [(equal? pos "centro")
        (define metade (quotient espacos 2))
        (if (= (remainder espacos 2) 0)
            (string-append (make-string metade #\space)
                           texto
                           (make-string metade #\space))
            (string-append (make-string metade #\space)
                           texto
                           (make-string (+ metade 1) #\space)))])]))
