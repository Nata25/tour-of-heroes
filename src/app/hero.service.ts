import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

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
    this.log('fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHeroById(id: Number): Observable<Hero> {
    const hero = HEROES.find(hero => hero.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
