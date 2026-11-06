#lang racket
(require rackunit)

(struct aluno (ra nome nota1 nota2 nota3 nota4 total-faltas) #:transparent)

(define joao (aluno 12345 "joao" 8 7 9 8 2))
(define maria (aluno 67890 "maria" 5 6 4 5 2))
(define pedro (aluno 24680 "pedro" 9 8 7 8 20))
(define ana (aluno 13579 "ana" 5 6 4 5 20))

(define (aprovacao-aluno dados-aluno nota-aprovacao carga-horaria percentual-maximo-faltas)
  (define media
    (/ (+ (aluno-nota1 dados-aluno)
          (aluno-nota2 dados-aluno)
          (aluno-nota3 dados-aluno)
          (aluno-nota4 dados-aluno))
       4))
  (define percentual-faltas
    (* (/ (aluno-total-faltas dados-aluno) carga-horaria) 100))
  (define reprovado-por-nota? (< media nota-aprovacao))
  (define reprovado-por-faltas? (> percentual-faltas percentual-maximo-faltas))
  (cond
    [(and reprovado-por-nota? reprovado-por-faltas?) "Reprovado por nota e faltas"]
    [reprovado-por-nota? "Reprovado por nota"]
    [reprovado-por-faltas? "Reprovado por faltas"]
    [else "Aprovado"]))

(check-equal? (aprovacao-aluno joao 7 60 25) "Aprovado")
(check-equal? (aprovacao-aluno maria 7 60 25) "Reprovado por nota")
(check-equal? (aprovacao-aluno pedro 7 60 25) "Reprovado por faltas")
(check-equal? (aprovacao-aluno ana 7 60 25) "Reprovado por nota e faltas")