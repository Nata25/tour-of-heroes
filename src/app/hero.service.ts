import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('get heroes', []))
    );
  }

  getHeroById(id: Number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>('get hero by id'))
    )
  }

  updateHero(hero?: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`saving hero id=${hero?.id}`)),
      catchError(this.handleError<any>('saving hero'))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((data: Hero) => this.log(`adding new hero with id=${data.id}`)),
      catchError(this.handleError<Hero>('adding new hero'))
    )
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Error on ${operation}: ${error}`);
      return of(result as T);
    }
  }
}
