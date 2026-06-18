export type PokemonListItem = {
	name: string
	url: string
	frontImage: string
	backImage: string
}

export type PokemonListResponse = {
	count: number
	next: string | null
	results: PokemonListItem[]
}

export type Pokemon = {
	id: number
	name: string
	url: string
	height: number
	weight: number
	sprites: {
		front_default: string
		back_default: string
	}
	types: {
        type: PokemonTypes
    }[]
	stats: {
		base_stat: number
		stat: { name: string }
	}[]
}

export type PokemonTypes = {
	name: string
	url: string
}
