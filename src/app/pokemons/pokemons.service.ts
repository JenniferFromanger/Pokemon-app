import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class PokemonsService {
  constructor(private http: HttpClient) {}

  private pokemonsUrl = 'api/pokemons';

  private log(log: string) {
    console.info(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //Rechercher un pokemon
  searchPokemons(term: string) {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap((_) => this.log(`found pokemons matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>(`searchPokemons`, []))
    );
  }

  //Supprimer un Pokemon
  deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${pokemon.id}`;
    const HttpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    };

    return this.http.delete<Pokemon>(url, HttpOptions).pipe(
      tap((_) => this.log(`delete pokemon id=${pokemon.id}`)),
      catchError(this.handleError<Pokemon>(`deletedPokemon`))
    );
  }

  //Editer mettre à jour un pokémon
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const HttpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    };
    return this.http.put(this.pokemonsUrl, pokemon, HttpOptions).pipe(
      tap((_) => this.log(`updated pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>(`updatedPokemon`))
    );
  }

  // Retourne tous les pokémons
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap((_) => this.log(`fetched pokemons`)),
      catchError(this.handleError(`getPokemons`, []))
    );
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;

    return this.http.get<Pokemon>(url).pipe(
      tap((_) => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  getPokemonTypes(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }
}
