import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  selectedHero?: Hero;

  heroes: Hero[] = [];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }

  getHeroes (): void {
    this.heroService.getHeroes().subscribe((heroes => this.heroes = heroes))
  }

  addHero (name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({name} as Hero).subscribe(hero => {
      this.heroes.push(hero)
    })
  }

  deleteHero (hero: Hero): void {
    this.heroes = this.heroes.filter(h => h.id !== hero.id)
    this.heroService.deleteHero(hero.id).subscribe()
  }

  ngOnInit(): void {
    this.getHeroes()
  }

}
