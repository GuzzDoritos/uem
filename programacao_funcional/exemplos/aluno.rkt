#lang racket
(struct aluno (ra nome curso) #:transparent)
(define nilton (aluno 123
                      "Nilton Luiz Queiroz Jr"
                      "Engenharia de Software"))
(define jose (struct-copy aluno nilton [ra 345]
                          [nome "Jose da Silva"])) 