import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { IHero } from "./hero";
import { HEROES } from "./mock-heroes";

@Injectable({
	providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const heroes = HEROES;
		return {heroes};
	}

	genId(heroes: IHero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}