import { Pokemon, PokemonListItem } from "@/types/pokemon";
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, StyleSheet, Pressable } from "react-native";
import { Link } from "../../.expo/types/router";

export default function Index() {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);

	useEffect(() => {
		fetchPokemons()
	}, []);

    const colorsByType: Record<string, string> = {
        grass: "#78C850",
        fire: "#F08030",
        water: "#6890F0",
        bug: "#A8B820",
        normal: "#A8A878",
        poison: "#A040A0",
        electric: "#F8D030",
        ground: "#E0C068",
        fairy: "#EE99AC",
        fighting: "#C03028",
        psychic: "#F85888",
        rock: "#B8A038",
        ghost: "#705898",
        ice: "#98D8D8",
        dragon: "#7038F8"
    }

	async function fetchPokemons() {
		try {
			const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");

			const data = await response.json();

			const pokemonDetails = await Promise.all(
				data.results.map(async (pokemon: Pokemon) => {
					const response = await fetch(pokemon.url);
					const data = await response.json();
					return {
						id: data.id,
						name: data.name,
						sprites: data.sprites,
						types: data.types
					};
				})
			)

			setPokemons(pokemonDetails);
		} catch (error) {
			console.log(error);
		}
	}

    return (
        <ScrollView
            contentContainerStyle={{
                gap: 16,
                padding: 16,
            }}
        >
            {pokemons.map((pokemon) => (
                <Link
                    key={pokemon.name}
                    href={""}
                    style={{
                        backgroundColor: colorsByType[pokemon.types[0]?.type.name as keyof typeof colorsByType] + 50 || "#fff",
                        padding: 20,
                        borderRadius: 20,
                    }}
                >
                    <View key={pokemon.name}>
                        <Text style={styles.name}>{pokemon.name}</Text>
                        <Text style={styles.type}>{pokemon.types[0]?.type.name}</Text>
                        <View style={{ 
                            flexDirection: "row" ,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Image
                                source={{ uri: pokemon.sprites.front_default }}
                                style={{ width: 100, height: 100 }}
                            />
                            <Image
                                source={{ uri: pokemon.sprites.back_default }}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    </View>
                </Link>
            ))}
		</ScrollView>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    type: {
        fontSize: 16,
        fontStyle: "italic",
        textAlign: "center",
    }
})