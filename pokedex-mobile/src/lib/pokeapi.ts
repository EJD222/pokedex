import type { Pokemon, PokemonListResponse } from '@/types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'
const PAGE_SIZE = 20

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${url}`)
  return res.json()
}

export function fetchPokemonList(page: number): Promise<PokemonListResponse> {
  const offset = page * PAGE_SIZE
  return fetcher(`${BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`)
}

export function fetchPokemon(nameOrId: string | number): Promise<Pokemon> {
  return fetcher(`${BASE_URL}/pokemon/${nameOrId}`)
}

export function getPokemonId(url: string): number {
  const parts = url.split('/').filter(Boolean)
  return parseInt(parts[parts.length - 1], 10)
}

export function getOfficialArtwork(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}
