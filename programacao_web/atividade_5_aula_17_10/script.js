const exercicio01 = () => {
    let soma = 0;
    for (let i = 0; i <= 100; i++) soma += i;
    console.log(soma);
}

const exercicio02 = () => {
    const pessoas = ["João", "Maria", "Sebastião", "José", "Antônio"];

    pessoas.forEach(p => {
        if (p.length === 4) console.log(p);
    });
}

exercicio01();
exercicio02();