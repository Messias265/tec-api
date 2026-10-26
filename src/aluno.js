import conexao from "./banco.js";   // importando a conexão com o banco de dados

// Função ler: vai ler os alunos do banco de dados (no momento inicial não temos nenhum);
function ler(res){
    const sql = "SELECT * FROM alunos ORDER BY nome";
    // verificando se há erro, e caso positivo define o status para 400 (Bad request) e apresenta o codigo do erro no formato json
    conexao.query(sql, (erro, resultados)=> {
        if(erro){
            res.status(400).json(erro.code);
            return;
        }
        // verifica se tem registros no banco de dados, caso não tenha, define o status para 204 (sem conteúdo)
        if(resultados === 0){
            res.status(204).end();
            return;
        }

        // define o status como 200 (OK) e exibe os resultados
        res.status(200).json(resultados);
    })
}




// INSERINDO alunos no banco de dados
function inserir(aluno, res) {
    const sql = " INSERT INTO alunos SET ? ";  // O MySql2 com o "SET ? " faz com que o mysql entenda todos os dados recebidos serão atribuídos na ordem enviada, aos campos da tabela alunos.

    conexao.query(sql, aluno, (erro) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(201).json({ "status" : "aluno inserido" })   // além de responder com status 201, adicionamos uma mensagem amigável para confirmar que o usuário foi inserido no banco de dados.
        }
    })
}


// exibindo UM aluno
function lerUm(id, res){
    const sql = "SELECT * FROM alunos WHERE id= ?";

    conexao.query(sql, id, (erro, resultados) => {
        // checando se existe conteúdo 
        if(resultados.length === 0){
            res.status(204).res.end();
            return;
        }

        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(200).json(resultados[0]);
        }
    })

}


// atualizar dados de um aluno
function atualizar(id, aluno, res) {
    const sql = "UPDATE alunos SET ? WHERE id = ?";

    // como estamos passando 2 parâmetros - pela 1ª vez - precisa ser dentro de uma array. A ordem importa, precisamos respeitar a ordem da linha sql acima.
    conexao.query(sql, [aluno, id], (erro, resultados) => {
        if(erro){
            res.status(400).json(erro.code);
        }else {
            res.status(200).json({"status" : "aluno atualizado com sucesso"});
        }
    });
}

// deletando um aluno
function excluir(id, res){
    const sql = "DELETE FROM alunos WHERE id = ?";

    conexao.query(sql, id, (erro, resultados ) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(200).json({"status" : "estudante excluído com sucesso", id});
        }
    })
}

export { ler, inserir, lerUm, atualizar, excluir  };

