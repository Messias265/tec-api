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




export { ler };

