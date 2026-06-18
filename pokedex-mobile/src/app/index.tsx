import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

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
    dragon: "#7038F8",
}

export default function Index() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        fetchPokemons();
    }, []);

    async function fetchPokemons() {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
            const data = await response.json();

            const pokemonDetails = await Promise.all(
                data.results.map(async (item: { name: string; url: string }) => {
                    const res = await fetch(item.url);
                    const detail = await res.json();
                    return {
                        id: detail.id,
                        name: detail.name,
                        url: item.url,
                        height: detail.height,
                        weight: detail.weight,
                        sprites: detail.sprites,
                        types: detail.types,
                        stats: detail.stats,
                    };
                })
            );

            setPokemons(pokemonDetails);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
            {pokemons.map((pokemon) => {
                const typeName = pokemon.types[0]?.type.name;
                const bgColor = (colorsByType[typeName] ?? "#A8A878") + "50";

                return (
                    <Pressable
                        key={pokemon.name}
                        onPress={() => router.push(`/pokemon/${pokemon.id}`)}
                        style={{ backgroundColor: bgColor, padding: 20, borderRadius: 20 }}
                    >
                        <Text style={styles.name}>{pokemon.name}</Text>
                        <Text style={styles.type}>{typeName}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Image
                                source={{ uri: pokemon.sprites.front_default }}
                                style={{ width: 100, height: 100 }}
                            />
                            <Image
                                source={{ uri: pokemon.sprites.back_default }}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "capitalize",
    },
    type: {
        fontSize: 16,
        fontStyle: "italic",
        textAlign: "center",
        textTransform: "capitalize",
    },
});
