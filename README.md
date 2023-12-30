# Programa de Cadastro e Orçamentos

Este repositório contém um programa desenvolvido em Node.js que oferece funcionalidades de cadastro de clientes, registro de orçamentos e a capacidade de buscar clientes e marcar orçamentos como concluídos. Além disso, o programa envia automaticamente uma mensagem no WhatsApp para o cliente quando um orçamento é marcado como concluído.

## Configuração

Antes de iniciar o programa, certifique-se de ter o Node.js instalado em sua máquina. Além disso, é necessário configurar um banco de dados MySQL e fornecer as informações de conexão no arquivo `index.js`.

1. Instale as dependências do projeto utilizando o comando:
   ```bash
   
   npm install

2. Configure as informações de conexão com o banco de dados no arquivo "index.js"

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Insira a senha do seu banco de dados
  database: 'clientes_programa'
});

3. Inicie o servidor usando o comando:
   ```bash
   
   npm start

## Requisitos para Rodar o Programa

Para executar este programa em sua máquina, você precisará atender aos seguintes requisitos:

1. **Node.js:** Certifique-se de ter o Node.js instalado. Você pode baixá-lo [aqui](https://nodejs.org/).

2. **MySQL:** Instale e configure um servidor MySQL. Você pode usar o Wamp Server, XAMPP ou instalar o MySQL diretamente. Certifique-se de criar um banco de dados chamado `clientes_programa` para o programa.

3. **Navegador Web:** O programa é acessado através de um navegador da web. Recomendamos o uso de navegadores modernos como Google Chrome, Mozilla Firefox ou Microsoft Edge.


## Funcionalidades

### 1. Cadastro de Clientes

- Acesse a página principal em `http://localhost:3000/` para cadastrar novos clientes.
- Preencha o formulário com nome, CPF e número de telefone.
- Evita o cadastro duplicado de clientes pelo CPF.

### 2. Cadastro de Orçamentos

- Cadastre orçamentos na página principal (`http://localhost:3000/`) preenchendo o formulário correspondente.
- Cada orçamento é associado a um cliente pelo CPF.
- Os orçamentos são inicialmente marcados como "Em aberto".

### 3. Busca de Clientes e Orçamentos

- O progama irá ultilizar a rota `/busca/:cpf` para buscar informações detalhadas sobre um cliente e seus orçamentos.

### 4. Marcar Orçamento como Concluído

- Ao visualizar os detalhes de um cliente e seus orçamentos, é possível marcar um orçamento como concluído.
- Isso atualiza a situação do orçamento para "Concluído" e envia automaticamente uma mensagem no WhatsApp para o cliente.

## Mensagem Automática no WhatsApp

O programa utiliza a API do WhatsApp "ChatPro" para enviar mensagens automáticas aos clientes quando um orçamento é marcado como concluído. Certifique-se de ter as permissões necessárias e a chave de autenticação da API configurada no código.

---

Feito por [**JUBILEU8888**](https://github.com/Jubileu8888) como uma ferramenta versátil para gerenciamento de clientes e orçamentos. Sinta-se à vontade para contribuir, reportar problemas ou adicionar novas funcionalidades!

