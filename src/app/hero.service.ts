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
      tap(_ => this.messageService.add(`HeroService: fetched hero id=${id}`)),
      catchError(this.handleError<Hero>('get hero by id'))
    )
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Error on ${operation}: ${error}`);
      return of(result as T);
    }
  }
}
