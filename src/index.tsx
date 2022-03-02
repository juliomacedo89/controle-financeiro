import React from 'react';
import ReactDOM from 'react-dom';
import { createServer } from 'miragejs'
import { App } from './App';

createServer({
  routes(){
    this.namespace = 'api' //significa dizer que todas as chamadas a serem feitas pelo mirage vão estã A PARTIR do "/api" -> Observar o endereço no useEffect do TransactionsTable

    this.get('/transactions', () =>{ //qdo houver uma chamada do tipo "GET" para "api/transactions", essa chamava vai devolver o que estiver demandado na função 
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date()
        }
      ]
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
