#lang racket
(require rackunit)
;- preco é um número real positivo
;- combustivel é uma das duas strings:
; - "alcool"
; - "gasolina"

;preco preco -> combustivel
;Encontra o combustivel que deve ser utilizado
;no abastecimento
;Caso o preco-alcool for menor ou igual a 70% do 
;preco-gasolina, será selecionado "alcool", caso contrario
;gasolina
;exemplos:
; preco-alcool = 3.00 e preco-gasolina = 4.00 -> "gasolina"
; preco-alcool = 2.90 e preco-gasolina = 4.20 -> "alcool"
; preco-alcool = 3.50 e preco-gasolina = 5.00 -> "alcool"
(define (seleciona-combustivel preco-alcool preco-gasolina)
  (if (> preco-alcool (* preco-gasolina 0.7))
      "gasolina"
      "alcool"))

(check-equal? (seleciona-combustivel 3.0 4.0) "gasolina")
(check-equal? (seleciona-combustivel 2.90 4.20) "alcool")
(check-equal? (seleciona-combustivel 3.5 5.0) "alcool")