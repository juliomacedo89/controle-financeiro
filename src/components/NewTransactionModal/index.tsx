import Modal from 'react-modal'
import { FormEvent, useState } from 'react' //FormEvent é nativo do React


import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'


import { Container, RadioBox, TransactionTypeContainer } from './styles'
import { useTransactions } from '../../hooks/useTransactions'



interface NewTransactionModalProps{
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps) {
  //estados vindos do contexto para serem utilizados
  const { createTransaction} = useTransactions() //hook criado

  //Estados para guardar a informação de qual botão do modal o user cliclou (entrada(deposit) ou saída(withdraw))
  const [type, setType] = useState('deposit')

  //Estados para armazenar o título, valor e categoria do form
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction(event: FormEvent) { 
    event.preventDefault()

    await createTransaction({  //await aqui serve para que o modal (onRequestClose) não feche antes do createTransaction ser criado
      title,
      amount,
      category, 
      type,
    })
    
    //reseta os valores do modal quando ele for fechado ou cadastrado
    setTitle('')
    setAmount(0)
    setCategory('')
    setType('')
    // para fechar o modal 
    onRequestClose()
  }

  return(
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose} 
      //estilização: as props overlayClassName e className são indicação da documentação e serão usadas para estilização. Para cada props atribui o nome da classe que desejamos para estilizar(overlay= fundo do modal)(estilos estão em em global.ts)
      overlayClassName= 'react-modal-overlay'
      className= 'react-modal-content'
    > 

      <button 
        type="button"
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}> 
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event)=> setTitle(event.target.value)}
        />

        <input 
          type="number" 
          placeholder="Valor"
          value={amount}
          onChange={(event)=> setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={ ()=> {setType('deposit')}}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={ ()=> {setType('withdraw')}}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>

        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit" >
          Cadastrar
        </button>

      </Container>

    </Modal>
  )
}

