// Importe o módulo 'mysql'
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clientes_progama'
});

// Conecte-se ao banco de dados
connection.connect();

// Consulta SQL para inserir dados
const sql = 'INSERT INTO clientes_cadastrados SET ?';

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'sua-chave-secreta',
  resave: true,
  saveUninitialized: true
}));




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/painel.html');
});


app.post('/cadastro', (req, res) => {
    const { nome, cpf, numero } = req.body;
    console.log(`O numero de cpf é: ${cpf}`)
    console.log(`O numero de telefone é: ${numero}`)
    console.log(req.body)
    const checkExistingQuery = 'SELECT * FROM clientes_cadastrados WHERE cpf = ?';
    connection.query(checkExistingQuery, [cpf], (checkError, checkResults, checkFields) => {
      if (checkError) {
        console.error('Erro ao verificar cadastro existente:', checkError);
        res.status(500).send('Erro interno do servidor');
    } else {
        // Se já existe um cadastro com o CPF
        if (checkResults.length > 0) {
          res.send('CPF já cadastrado no sistema!!')
          
        } else {
            // Se não existe, proceda com o cadastro
            const insertQuery = 'INSERT INTO clientes_cadastrados (nome, cpf, numero) VALUES (?, ?, ?)';

            connection.query(insertQuery, [nome, cpf, numero], (insertError, insertResults, insertFields) => {
                if (insertError) {
                    console.error('Erro ao cadastrar cliente:', insertError);
                    res.status(500).send('Erro interno do servidor');
                } else {
                  // FAZER UMA NOTIFICAÇÃO NA TELA QUE O CLIENTE FOI CADASTRADO COM SUCESSO
                    console.log('Cliente cadastrado com sucesso!');
                    res.redirect('/painel.html');  // Redirecionar para a página de busca após o cadastro
                }
            });
        }
    }
  });
});


app.post('/orcamentos', (req, res) => {
  const { cpforc, descorc, valororc } = req.body;
  const situacaoinicial = 'Em aberto'
  console.log(req.body)

  const insertQuery = 'INSERT INTO orcamento_clientes (cpf, descricao, valor, situacao) VALUES (?, ?, ?, ?)';
  connection.query(insertQuery, [cpforc, descorc, valororc, situacaoinicial], (insertError, insertResults, insertFields) => {
    if (insertError) {
        console.error('Erro ao cadastrar orcamento:', insertError);
        res.status(500).send('Erro interno do servidor');
    } else {
      // FAZER UMA NOTIFICAÇÃO NA TELA QUE O ORCAMENTO FOI CADASTRADO COM SUCESSO
        console.log('orcamento cadastrado com sucesso!');
        res.redirect('/painel.html');  // Redirecionar para a página de busca após o cadastro
    }
  });
})


/*
    });
    const sql = 'INSERT INTO clientes_cadastrados (nome, cpf, numero) VALUES (?, ?, ?)';
    connection.query(sql, [nome, cpf, numero], (error, results, fields) => {
      if (error) {
        console.error('ErFro ao inserir dados:', error);
        res.status(500).send('Erro interno do servidor');
      } else {

      // COLOCAR NOTIFICAÇÃO NO SITE DE SUCESSO AO CADASTRAR O CLIENTE
        console.log('Dados inseridos com sucesso!');
        res.redirect('painel.html')
      }
    });
  });
*/

app.get('/busca/:cpf', (req, res) => {
  const cpf = req.params.cpf;

  // Consulta SQL para obter informações do cliente e seus orçamentos
  const sql = `
      SELECT clientes_cadastrados.nome AS cliente_nome, clientes_cadastrados.cpf AS cliente_cpf, clientes_cadastrados.numero AS cliente_numero,
             orcamento_clientes.descricao AS orcamento_descricao, orcamento_clientes.valor AS orcamento_valor, orcamento_clientes.situacao AS orcamento_situacao, orcamento_clientes.id AS orcamento_id
      FROM clientes_cadastrados
      LEFT JOIN orcamento_clientes ON clientes_cadastrados.cpf = orcamento_clientes.cpf
      WHERE clientes_cadastrados.cpf = ?;
  `;

  connection.query(sql, [cpf], (error, results, fields) => {
      if (error) {
          console.error('Erro ao consultar cliente e orçamentos por CPF:', error);
          res.status(500).send('Erro interno do servidor');
      } else {
          if (results.length > 0) {
              // Cliente e orçamentos encontrados, gera o HTML e envia como resposta
              const clienteHtml = `
              <!DOCTYPE html>
              <html lang="pt-BR">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=, initial-scale=1.0">
                  <title>Detalhes do Cliente e Orçamentos</title>
              </head>
              <body>
                  <center><h1>Detalhes do Cliente</h1></center>
                  <p style="margin-left: 25px;">Nome: ${results[0].cliente_nome}</p>
                  <p style="margin-left: 25px;">CPF: ${results[0].cliente_cpf}</p>
                  <p style="margin-left: 25px;">Número de Telefone: ${results[0].cliente_numero}</p>
              <br>
              <br>
                  <center><h2>Orçamentos</h2></center
                  <br>
                  <br>
                  <br>
                      ${results.map(orcamento => `
                          <div class="card w-75 mb-3">
                            <div class="card-body">
                              <h5 class="card-title">Orçamento</h5>
                              <p class="card-text">Descrição: ${orcamento.orcamento_descricao}<br> Valor: ${orcamento.orcamento_valor}<br> Situação: ${orcamento.orcamento_situacao}</p>
                              <a href="#" class="btn btn-primary" onclick="marcarConcluido(${orcamento.orcamento_id})">Marcar como concluído</a>
                            </div>
                          </div>
                      `).join('')}
              </body>
              </html>
          `;
          res.send(clienteHtml);
          } else {
              // Cliente não encontrado, redireciona para uma página de erro ou exibe uma mensagem
              res.send('Cliente não encontrado.');
          }
      }
  });
});

app.post('/marcar-concluido/:idOrcamento', (req, res) => {
  const idOrcamento = req.params.idOrcamento;

  // Atualiza a situação do orçamento para 'concluído'
  const updateQuery = 'UPDATE orcamento_clientes SET situacao = ? WHERE id = ?';
  
  connection.query(updateQuery, ['Concluido', idOrcamento], (error, results, fields) => {
      if (error) {
          console.error('Erro ao marcar orçamento como concluído:', error);
          res.status(500).send('Erro interno do servidor');
      } else {
          console.log('Orçamento marcado como concluído com sucesso!');
          res.send('Orçamento marcado como concluído com sucesso!');
      }
  });
  // FAZER SCRIPT COM API DO WHATSAPP PARA ENVIAR MENSAGEM PARA O CLIENTE QUE O ORÇAMENTO DELA TA CONCLUIDO

  const requestdadoscliente = 'SELECT * FROM orcamento_clientes WHERE id = ?'
  connection.query(requestdadoscliente, [idOrcamento], (error, results, fields) => {
    if (error) {
      res.status(500).send('Erro interno no servidor')
    } else {
        const cpfachou = results[0].cpf;
        const descricaoachou = results[0].descricao
        console.log(`Ele achou o CPF: ${cpfachou}`);
        
        const requestdadoscliente2 = 'SELECT * FROM clientes_cadastrados WHERE cpf = ?';
        connection.query(requestdadoscliente2, [cpfachou], (error, results, fields) => {
          if (error) {
            res.status(500).send('Erro no servidor interno')
          } else {
            const nomemensagem = results[0].nome
            console.log(`O nome é ${nomemensagem}`)
            const numeromensagem = results[0].numero
            console.log(`O numero é ${numeromensagem}`)
            // SISTEMA MENSAGEM WHATSAPP
            const options = {
              method: 'POST',
              headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: '7705231d961be085d276031fa7a240e1'
              },
              body: JSON.stringify({number: `${numeromensagem}`, message: `Olá ${nomemensagem} o seu serviço de ${descricaoachou} está pronto ✅`})
            };

            fetch('https://v5.chatpro.com.br/chatpro-24a6afc29d/api/v1/send_message', options)
              .then(response => response.json())
              .then(response => console.log(response))
              .catch(err => console.error(err));
          }
      });
    }
  });
});



/*
app.get('/busca/:cpf', (req, res) => {
    const cpf = req.params.cpf;

    // Consulta SQL para obter informações do cliente por CPF
    const sql = 'SELECT * FROM clientes_cadastrados WHERE cpf = ?';

    connection.query(sql, [cpf], (error, results, fields) => {
        if (error) {
            console.error('Erro ao consultar cliente por CPF:', error);
            res.status(500).send('Erro interno do servidor');
        } else {
            if (results.length > 0) {
                // Cliente encontrado retorna as informações como uma string HTML
                const clienteHtml = `
                    <h1>Detalhes do Cliente</h1>
                    <p>Nome: ${results[0].nome}</p>
                    <p>CPF: ${results[0].cpf}</p>
                    <p>Número de Telefone: ${results[0].numero}</p>
                `;
                res.send(clienteHtml);
            } else {
                // Cliente não encontrado, retorna uma mensagem
                res.send('Cliente não encontrado.');
            }
        }
    });
});
*/


app.use(express.static('public'));




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});