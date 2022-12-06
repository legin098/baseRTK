import { View, StyleSheet } from 'react-native'
import ListPokemons from '../components/ListPokemons'

interface Props {}

const PokemonPresenter = (props: Props) => {
  return (
    <View
      style={styles.presenter}
    >
        <ListPokemons />
    </View>
  )
}

const styles = StyleSheet.create({
  presenter: {
    width: "100%"
  }
})


export default PokemonPresenter