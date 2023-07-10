export interface PokemonResult {
  count: number;
  next: null;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  number?: number;
  catched: boolean;
  url: string;
}
