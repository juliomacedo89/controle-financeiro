import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps {
    onOpenNewTransactionModal: () => void
}

//aqui

export function Header({onOpenNewTransactionModal}: HeaderProps){
    return(
        <Container>
            <Content> 
                <img src={logoImg} alt="dt-money" />
                <button type="button" onClick={onOpenNewTransactionModal} >
                    Nova transação
                </button>

            </Content>
        </Container>
    )
}