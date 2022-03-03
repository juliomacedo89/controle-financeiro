import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({

  //Para criar relação entre as rotas post e get 
  models: {
    transaction: Model, //model é um módulo nativo do mirage e precisa ser importado
  },
  //O banco de dados sempre inica vazio, portanto criamos alguns dados ficticios para que a aplicação inicie de modo mais amigavel
  seeds(server){
    server.db.loadData({
      transactions: [ //nome do model no PLURAL
        {
          id: 1,
          title: "Freelance",
          type: 'deposit',
          category: 'dev',
          amount: 6000,
          createdAt: new Date('2022-02-12 09:00:00')
        },
        {
          id: 2,
          title: "Aluguel",
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2022-02-14 11:00:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api' //significa dizer que todas as chamadas a serem feitas pelo mirage vão estã A PARTIR do "/api" -> Observar o endereço no useEffect do TransactionsTable

    //metodo para pegar informação (get -> busca na API)
    this.get('/transactions', () =>{ //qdo houver uma chamada do tipo "GET" para "api/transactions", essa chamava vai devolver o que estiver demandado na função 
      return this.schema.all('transaction') //o metodo GET vai retornar todas as transações que há no bando de dados schema
    })

    //metodo de postagem (post -> insere na API)
    this.post('/transactions', (schema, request)=>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data) // schema é o banco de dados ; primeiro argumento é qual o Model que estamos inserindo (no caso, transaction) e o segundo parâmetro sõ as infos que irão ser add no model (no caso, data, proveniente do post)
      
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
