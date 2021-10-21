import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/hero';
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

  selectedHero?: IHero;

  heroes: IHero[] = [];

  onSelect(hero: IHero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }

  getHeroes (): void {
    this.heroService.getHeroes().subscribe((heroes => this.heroes = heroes))
  }

  addHero (name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({name} as IHero).subscribe(hero => {
      this.heroes.push(hero)
    })
  }

  deleteHero (hero: IHero): void {
    this.heroes = this.heroes.filter(h => h.id !== hero.id)
    this.heroService.deleteHero(hero.id).subscribe()
  }

  ngOnInit(): void {
    this.getHeroes()
  }

}
