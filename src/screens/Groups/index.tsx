import { useState, useEffect, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { Header } from "@components/Header"
import { HighLight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container } from "./styles";
import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups ] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup(){
    navigation.navigate('new')
 }

 async function fetchGroups() {
  try {
   

    const data = await groupsGetAll();
    
    setGroups(data);
   
  } catch (error) {
    console.log(error)
    Alert.alert('Turmas', 'Não foi possível carregar as turmas');
  }
 }

function handleOpenGroup(group: string) {
  navigation.navigate('players', { group });
}

 useEffect(useCallback(() => {
   fetchGroups();
 },[]));

  return (  
    <Container>
     <Header />

     <HighLight 
        title="Turmas"
        subtitle="Jogue com a sua turma" />

   

    <FlatList 
      data={groups}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <GroupCard
          title={item} onPress={() => handleOpenGroup(item)}
        />
        
      )}
      contentContainerStyle={groups.length === 0 && { flex: 1 }}
      ListEmptyComponent={() => (
      <ListEmpty 
      message="Que tal cadastrar a primeira turma" />
      )}
      showsVerticalScrollIndicator={false}
    />        
  
    <Button title="Criar nova turma" type="PRIMARY" onPress={() => handleNewGroup()}  />    
    </Container>

  );
}