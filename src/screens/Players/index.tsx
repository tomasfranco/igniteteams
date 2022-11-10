import { Header } from '@components/Header';
import { Filter } from '@components/Filter';
import { ButtonIcon } from '@components/ButtonIcon';
import { HighLight } from '@components/Highlight';
import { Input } from '@components/Input';

import { Container, Form } from './styles';


export function Players() {
  return (
  <Container>
      <Header showBackButton />


      <HighLight 
        title='Nome da Turma'
        subtitle='adicione a galera e separe os times'
        />
  
     <Form>
    <Input 
      placeholder='Nome da pessoa'
      autoCorrect={false}
    />

        <ButtonIcon icon="add" />
        </Form>

        <Filter title="Time A" isActive/>
        <Filter title="Time B" />
  </Container>
  )
}