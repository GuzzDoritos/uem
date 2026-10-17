#lang racket
(require rackunit)

;; Numero Numero Numero -> Numero
;; Calcula o preço de venda de um jogo aplicando o desconto concedido.
;; Caso o preço com desconto seja maior que o da loja concorrente,
;; produz o preço da concorrente.
;; O desconto é informado como uma taxa entre 0.0 e 1.0.
(define (promocao-jogo valor-jogo valor-concorrente desconto)
  (define valor-descontado (- valor-jogo (* valor-jogo desconto)))
  (if (> valor-descontado valor-concorrente)
      valor-concorrente
      valor-descontado))

;; --- Testes ---

(check-equal? (promocao-jogo 150.0 90.0 0.3) 90.0)   ; desconto daria 105.0, concorrente é 90.0
(check-equal? (promocao-jogo 150.0 120.0 0.3) 105.0) ; desconto 105.0 < concorrente 120.0
(check-equal? (promocao-jogo 150.0 105.0 0.3) 105.0) ; desconto e concorrente iguais (105.0)
(check-equal? (promocao-jogo 100.0 150.0 0.0) 100.0) ; sem desconto (0%), concorrente mais caro
(check-equal? (promocao-jogo 200.0 80.0 0.5) 80.0)   ; 50% de desconto (100.0) > concorrente (80.0)