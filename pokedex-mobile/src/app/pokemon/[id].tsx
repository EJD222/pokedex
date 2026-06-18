import { Pokemon } from "@/types/pokemon";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PokemonDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPokemon(data);
                setLoading(false);
            })
            .catch(console.log);
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!pokemon) {
        return (
            <View style={styles.center}>
                <Text>Pokemon not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={styles.sprite}
            />
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>
                {pokemon.types.map((t) => t.type.name).join(" / ")}
            </Text>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Height</Text>
                    <Text style={styles.infoValue}>{pokemon.height / 10}m</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Weight</Text>
                    <Text style={styles.infoValue}>{pokemon.weight / 10}kg</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Stats</Text>
            {pokemon.stats.map((s) => (
                <View key={s.stat.name} style={styles.statRow}>
                    <Text style={styles.statName}>{s.stat.name}</Text>
                    <Text style={styles.statValue}>{s.base_stat}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        padding: 24,
        alignItems: "center",
    },
    sprite: {
        width: 150,
        height: 150,
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
        textTransform: "capitalize",
        marginTop: 8,
    },
    type: {
        fontSize: 16,
        color: "#666",
        textTransform: "capitalize",
        marginTop: 4,
    },
    infoRow: {
        flexDirection: "row",
        gap: 32,
        marginTop: 20,
    },
    infoItem: {
        alignItems: "center",
    },
    infoLabel: {
        fontSize: 12,
        color: "#999",
    },
    infoValue: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        alignSelf: "flex-start",
        marginTop: 24,
        marginBottom: 12,
    },
    statRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch",
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    statName: {
        fontSize: 14,
        textTransform: "capitalize",
        color: "#444",
    },
    statValue: {
        fontSize: 14,
        fontWeight: "600",
    },
});
