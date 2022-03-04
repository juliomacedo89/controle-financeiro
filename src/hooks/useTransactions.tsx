// CRIANDO CONTEXTO (ver notion)

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { api } from "../services/api";

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> //pegou o mesmo tipo acima, excluindo (omitindo) os tipos que nã precisam ser usados


//Criado para dizer que o TransactionsProvider aceita conteúdo dentro dele, além do que ele ja tem
interface TransactionsProviderProps{
    children: ReactNode //significa que os filhos do TransactionsProvider pode se qualquer conteúdo JSX
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>; //usa o void sempre que uma função não tiver retorno; usa Promise pq TODA função assíncroma retorna uma promise
}

const TransactionsContext = createContext<TransactionsContextData>( //aqui somente o {} dava um erro que não da para corrigir; então usa-se um hack do TS para atribuir uma tipagem
    {} as TransactionsContextData
    
)

export function TransactionsProvider({children} : TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transactionInput: TransactionInput){
        
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        const { transaction } = response.data

        setTransactions([
            ...transactions, 
            transaction
        ])
    }

    //Para enviar mais de um valor em uma variável, usa um objeto (conforme o "value" abaixo)
    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)

    return context;
}