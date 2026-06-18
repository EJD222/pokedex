export type PokemonListItem = {
  name: string
  url: string
}

export type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

export type PokemonStat = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export type PokemonAbility = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export type PokemonSprites = {
  front_default: string | null
  front_shiny: string | null
  other: {
    'official-artwork': {
      front_default: string | null
      front_shiny: string | null
    }
    dream_world: {
      front_default: string | null
    }
  }
}

export type Pokemon = {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  sprites: PokemonSprites
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
}
