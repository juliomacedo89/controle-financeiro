import { useState } from 'react';
import Modal from 'react-modal'
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';
import { TransactionsProvider } from './hooks/useTransactions';


Modal.setAppElement('#root') //recomendação da doc do react-modal, para que ele seja renderizado dentro da root e não dentro do body, como ele ficaria sem executar essa função.

export function App() {
  //MODAL (TRANSAÇÕES) -> utilizando a lib react-modal 
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
      setIsNewTransactionModalOpen(false)
  }



  return (
    <TransactionsProvider>

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose= {handleCloseNewTransactionModal}

      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}


