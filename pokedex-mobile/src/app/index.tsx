import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { PokemonCard } from '@/components/pokemon-card'
import { usePokemonList } from '@/hooks/use-pokemon-list'
import type { PokemonListItem } from '@/types/pokemon'

export default function PokemonListScreen() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonList()

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Something went wrong. Please try again.</Text>
      </View>
    )
  }

  const pokemon = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <FlashList
      data={pokemon}
      numColumns={2}
      estimatedItemSize={150}
      keyExtractor={(item: PokemonListItem) => item.name}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footer} />
        ) : null
      }
      contentContainerStyle={styles.list}
    />
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
  list: {
    padding: 8,
  },
  footer: {
    paddingVertical: 16,
  },
})
