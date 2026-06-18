import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { getPokemonId, getOfficialArtwork } from '@/lib/pokeapi'
import type { PokemonListItem } from '@/types/pokemon'

type Props = {
  pokemon: PokemonListItem
}

export function PokemonCard({ pokemon }: Props) {
  const id = getPokemonId(pokemon.url)
  const artwork = getOfficialArtwork(id)

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => router.push(`/pokemon/${id}`)}
    >
      <Image source={artwork} style={styles.image} contentFit="contain" />
      <Text style={styles.number}>#{String(id).padStart(3, '0')}</Text>
      <Text style={styles.name} numberOfLines={1}>{pokemon.name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    alignItems: 'center',
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  image: {
    width: 90,
    height: 90,
  },
  number: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginTop: 2,
    color: '#222',
  },
})
