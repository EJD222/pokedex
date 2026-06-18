import { Image } from 'expo-image'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { StatBar } from '@/components/stat-bar'
import { TypeBadge } from '@/components/type-badge'
import { usePokemon } from '@/hooks/use-pokemon'

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const navigation = useNavigation()
  const { data: pokemon, isLoading, isError } = usePokemon(id)

  useEffect(() => {
    if (pokemon) {
      navigation.setOptions({ title: pokemon.name })
    }
  }, [pokemon, navigation])

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (isError || !pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Something went wrong.</Text>
      </View>
    )
  }

  const artwork = pokemon.sprites.other['official-artwork'].front_default

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={artwork} style={styles.image} contentFit="contain" />

      <Text style={styles.number}>#{String(pokemon.id).padStart(3, '0')}</Text>
      <Text style={styles.name}>{pokemon.name}</Text>

      <View style={styles.types}>
        {pokemon.types.map(({ type }) => (
          <TypeBadge key={type.name} type={type.name} />
        ))}
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Height</Text>
          <Text style={styles.infoValue}>{pokemon.height / 10}m</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Weight</Text>
          <Text style={styles.infoValue}>{pokemon.weight / 10}kg</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Base XP</Text>
          <Text style={styles.infoValue}>{pokemon.base_experience}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Base Stats</Text>
      <View style={styles.statsContainer}>
        {pokemon.stats.map(({ stat, base_stat }) => (
          <StatBar key={stat.name} name={stat.name} value={base_stat} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Abilities</Text>
      <View style={styles.abilitiesContainer}>
        {pokemon.abilities.map(({ ability, is_hidden }) => (
          <View key={ability.name} style={styles.abilityBadge}>
            <Text style={styles.abilityName}>{ability.name}</Text>
            {is_hidden && <Text style={styles.hiddenLabel}>hidden</Text>}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  container: {
    padding: 24,
    alignItems: 'center',
    paddingBottom: 48,
  },
  image: {
    width: 220,
    height: 220,
    marginTop: 16,
  },
  number: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  name: {
    fontSize: 30,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 4,
    color: '#111',
  },
  types: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  infoItem: {
    alignItems: 'center',
    gap: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: 28,
    marginBottom: 14,
    color: '#111',
  },
  statsContainer: {
    alignSelf: 'stretch',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignSelf: 'flex-start',
  },
  abilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  abilityName: {
    fontSize: 13,
    textTransform: 'capitalize',
    color: '#333',
    fontWeight: '500',
  },
  hiddenLabel: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
  },
})
