import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  selectedHero?: Hero;

  heroes: Hero[] = [];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes (): void {
    this.heroService.getHeroes().subscribe((heroes => this.heroes = heroes))
  }

  constructor(private heroService: HeroService) {
  }
  

  ngOnInit(): void {
    this.getHeroes()
  }

}
