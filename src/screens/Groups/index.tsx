import { Header } from "@components/Header"
import { HighLight } from "@components/Highlight";

import { Container } from "./styles";

export function Groups() {
  return (  
    <Container>
     <Header />

     <HighLight 
        title="Turmas"
        subtitle="Jogue com a seua turna" />
    </Container>
  );
}