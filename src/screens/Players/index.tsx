import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/playerStorageDTO";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";

import { Header } from '@components/Header';
import { Filter } from '@components/Filter';
import { ButtonIcon } from '@components/ButtonIcon';
import { HighLight } from '@components/Highlight';
import { Input } from '@components/Input';
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam ] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);
  
  async function handleAddPlayer(){
    if(newPlayerName.trim().length === 0) {
      return Alert.alert('❌ Novo Integrante ❌', 'Infome o nome do novo integrante a ser adicionado')
    }
  
    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayerByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Integrante', error.message);
      } else {
        console.log(error);
        Alert.alert('❌ Novo Integrante ❌', 'Não foi possível adicionar');
      }
    }
  }

  async function fetchPlayerByTeam() {
    try { 
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Integrantes', 'Não foi possível carregar os integrantes do Time')
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayerByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Remover Integrante', 'Não foi possível remover este integrante!')
    }
  }

async function groupRemove() {
  try {
    await groupRemoveByName(group);
    navigation.navigate('groups');

  } catch (error){
    console.log(error);
    Alert.alert('Remover grupo', 'Não foi possível remover o grupo.');
  }

}  

async function handleGroupRemove() {
  Alert.alert(
  '⚠️ Remover grupo Inteiro ⚠️',
  'Você tem certeza que deseja remover todo o Grupo?', 
  [
    { text: 'Não', style: 'cancel'},
    { text: 'Sim ', onPress: () => groupRemove()}
  ])
}


  useEffect(() => {
    fetchPlayerByTeam();
  }, [team]);
  
  return (
  <Container>
      <Header showBackButton />


      <HighLight 
        title={group}
        subtitle='adicione a galera e separe os times'
        />
  
     <Form>
    <Input
      inputRef={newPlayerNameInputRef}
      onChangeText={setNewPlayerName}
      value={newPlayerName}
      placeholder='Nome da pessoa'
      autoCorrect={false}
      returnKeyType="done"
    />

    <ButtonIcon
     icon="add"
     onPress={handleAddPlayer}
     />
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

  { isLoading ? <Loading /> :            
      <FlatList
        data={players}
        keyExtractor={ item => item.name}
        renderItem={({ item}) => (
          <PlayerCard
           name={item.name} 
           onRemove={() => handlePlayerRemove(item.name)}
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
    }
    <Button 
      title="Remover Turma"
      type="SECONDARY"           
      onPress={handleGroupRemove}
    />
  </Container>
  )
}