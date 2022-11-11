import { FlatList } from "react-native"
import { Header } from '@components/Header';
import { Filter } from '@components/Filter';
import { ButtonIcon } from '@components/ButtonIcon';
import { HighLight } from '@components/Highlight';
import { Input } from '@components/Input';
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { useState } from "react";


export function Players() {
  const [team, setTeam ] = useState('Time A');
  const [players, setPlayers] = useState([
    'Ingrid Flores Melo',
    'Tomás Franco Carvalho',
    'Sylvia Franco Carvalho',
    'Ana Raquel Franco Carvalho',
    'Edelvira Franco Aires',
    'Neuza Nascimento Franco',
    'Luiz Eduardo de Sá',
    'Liah Paz', 
  ]);

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


    <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={ item => item}
          renderItem={({ item }) => (
            <Filter
            title={item}
            isActive={ item === team}
            onPress={() => setTeam(item)}
              />
          )}
            horizontal
        />
      <NumberOfPlayers>
        {players.length}
      </NumberOfPlayers>

      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={ item => item}
        renderItem={({ item}) => (
          <PlayerCard
           name={item} 
           onRemove={() => {}}
           />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Näo há pessoas nesse time."
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{paddingBottom: 100}, players.length === 0 && {flex: 1}]}
      />
    <Button 
      title="Remover Turma"
      type="SECONDARY"
    />
  </Container>
  )
}