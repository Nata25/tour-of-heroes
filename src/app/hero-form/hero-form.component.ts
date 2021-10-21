import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  constructor(
    private heroService: HeroService
  ) { }

  powers = ['', 'Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  @Input() hero?: Hero;
  
  model: Hero = {id: 0, name: '', power: this.powers[0]};
  
  submitted = false;

  onSubmit () {
    this.submitted = true
    if (this.hero) {
      this.updateHero(this.model)
    } else {
      this.addHero(this.model)
    }
  }

  addHero (hero: Hero): void {
    let { name, power, alterEgo } = hero
    name = hero.name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name, power, alterEgo } as Hero).subscribe()
  }

  updateHero (hero: Hero): void {
    let { id, name, power, alterEgo } = hero
    name = hero.name.trim();
    if (!name) return
    this.heroService.updateHero({ id, name, power, alterEgo }).subscribe()
  }

  ngOnInit(): void {
    if (this.hero) {
      const { id, name, power, alterEgo } = this.hero
      this.model = new Hero(
        id,
        name,
        power,
        alterEgo
      )
    }
  }

}
