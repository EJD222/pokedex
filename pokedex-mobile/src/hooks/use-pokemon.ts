import { useQuery } from '@tanstack/react-query'
import { fetchPokemon } from '@/lib/pokeapi'

export function usePokemon(nameOrId: string | number) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemon(nameOrId),
  })
}
