import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import PokemonPresenter from "./presenters/PokemonPresenter";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <PokemonPresenter />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
