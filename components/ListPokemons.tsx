import { useEffect, useRef} from "react";
import {
  View,
  ListRenderItemInfo,
  Dimensions,
  Animated,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import PokemonItem from "./PokemonItem";
import { LinearGradient } from "expo-linear-gradient";
import { IData } from '../models/pokemon';
import { useAppSelector, useAppDispatch } from '../hooks/useAppDispatchAndSelector';
import { getPokemons } from '../hooks/useGetPokemons';
import { getPokemonsView } from "../views/getPokemonsView";

interface PropsBack {
  scrollX: Animated.AnimatedInterpolation<string | number>;
  images: string[];
}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH_CONTENT = WIDTH * 0.7;
const SPACE = 10;
const SPACE_CONTENT = (WIDTH - WIDTH_CONTENT) / 2;
const HEIGHT_BACKDROOP = HEIGHT * 0.5;

const BackDroop = ({ scrollX, images }: PropsBack) => {
  return (
    <View
      style={[
        {
          height: HEIGHT_BACKDROOP,
          width: WIDTH,
          position: "absolute",
          top: 0,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {images.map((image, index) => {
        const inputRange = [
          (index - 1) * WIDTH_CONTENT,
          index * WIDTH_CONTENT,
          (index + 1) * WIDTH_CONTENT,
        ];

        const outputRange = [0, 1, 0];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange,
        });

        return (
          <Animated.Image
            source={{ uri: image }}
            key={index}
            style={[
              {
                height: HEIGHT_BACKDROOP,
                width: WIDTH,
                position: "absolute",
                top: 0,
              },
              { opacity: opacity },
            ]}
          />
        );
      })}
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          height: HEIGHT_BACKDROOP,
          width: WIDTH,
          position: "absolute",
          top: 0,
        }}
      />
    </View>
  );
};

const ListPokemons = () => {
  const { pokemons } = useAppSelector((state) => state.pokemon)
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch()

  console.log("pokemons del state", JSON.stringify(pokemons, null, 2))
  useEffect(() => {
    getPokemonsView()
  }, []);

  // useEffect(() => {
  //    getPokemons(dispatch)
  // }, []);

  const allImages = pokemons.map((pokemon) => pokemon.url);

  return (
    <SafeAreaView style={styles.container}>
      <BackDroop images={allImages} scrollX={scrollX} />
      <View>
        <Animated.FlatList
          data={pokemons}
          renderItem={({ item, index }: ListRenderItemInfo<IData>) => {
            const inputRange = [
              (index - 1) * WIDTH_CONTENT,
              index * WIDTH_CONTENT,
              (index + 1) * WIDTH_CONTENT,
            ];

            const outputRange = [0, -50, 0];

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange,
            });

            return (
              <PokemonItem
                key={item.name}
                {...item}
                space={SPACE}
                heigth={WIDTH_CONTENT * 1.2}
                translateY={translateY}
              />
            );
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 200,
            paddingHorizontal: SPACE_CONTENT,
          }}
          decelerationRate={0}
          snapToInterval={WIDTH_CONTENT}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

export default ListPokemons;
