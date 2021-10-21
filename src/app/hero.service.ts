import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IHero } from './hero';
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

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<IHero[]>('get heroes', []))
    );
  }

  getHeroById(id: Number): Observable<IHero> {
    return this.http.get<IHero>(`${this.heroesUrl}/${id}`)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<IHero>('get hero by id'))
    )
  }

  updateHero(hero?: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`saving hero id=${hero?.id}`)),
      catchError(this.handleError<any>('saving hero'))
    )
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((data: IHero) => this.log(`adding new hero with id=${data.id}`)),
      catchError(this.handleError<IHero>('adding new hero'))
    )
  }

  deleteHero(id: number): Observable<IHero> {
    return this.http.delete<IHero>(`${this.heroesUrl}/${id}`, this.httpOptions)
    .pipe(
      tap(_ => this.log(`delete hero with id=${id}`)),
      catchError(this.handleError<IHero>('delete hero'))
    )
  }

  searchHeroes(query: string): Observable<IHero[]> {
    if (!query.trim()) return of([])
    return this.http.get<IHero[]>(`${this.heroesUrl}/?name=${query}`)
    .pipe(
      tap(heroes => {
        if (heroes.length) {
          this.log(`found ${heroes.length} heroes by query=${query}`)
        } else {
          this.log(`nothing found by query=${query}`)
        }
      }),
      catchError(this.handleError<IHero[]>('search heroes', []))
    )
  } 

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Error on ${operation}: ${error}`);
      return of(result as T);
    }
  }
}
