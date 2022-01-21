const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + 'index.html'));
});

app.listen(3333);

const Client = require('pg').Client;
const cliente = new Client({
  user: "postgres",
  password: "icanbeneedy1",
  host: "127.0.0.1",
  port: 5432,
  database: "~Estudo Musical",
});

getUsuarios();

async function getUsuarios(){
  try{
    await cliente.connect();
    const resultado = await cliente.query("SELECT * FROM usuarios"); 
    console.table(resultado.rows);
  }catch (ex){
    console.log(ex);
  }finally {
    await cliente.end();
  }
}

async function signUp(nome, email, senha){
  try{
    await cliente.connect();
    const resultado = await cliente.query(`INSRT INTO usuarios("nome", "email", "senha") VALUES ('${nome}','${email}','${senha}')`); 
    console.table(resultado.rows);
  }catch (ex){
    console.log(ex);
  }finally {
    await cliente.end();
  }
}