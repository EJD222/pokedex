import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPokemonList } from '@/lib/pokeapi'

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.next ? lastPageParam + 1 : undefined,
  })
}
