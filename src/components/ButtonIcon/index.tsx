import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";

type Props = TouchableOpacityProps & {
 icon: keyof typeof MaterialIcons.glyphMap;
 type?: ButtonIconTypeStyleProps;

}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: Props){
  return (
    <Container {...rest}>
        <Icon name="close" type={type} />
    </Container>
  )
}