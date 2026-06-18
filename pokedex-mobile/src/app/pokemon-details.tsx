import { Pokemon } from "@/types/pokemon";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, StyleSheet, Pressable } from "react-native";

export default function PokemonDetails() {
    const params = useLocalSearchParams();
    const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
    console.log(params);

    useEffect(() => {
        fetchPokemonDetails(params.name as string);
    }, []);

    async function fetchPokemonDetails(name: string) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();

            setPokemonDetails(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView 
            contentContainerStyle={{ 
                gap: 16, 
                padding: 16 
            }}>
                <View>
                    <Text style={styles.name}>{pokemonDetails?.name}</Text>
                    <Text>{pokemonDetails?.height}</Text>
                    <Text>{pokemonDetails?.weight}</Text>
                </View>
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
