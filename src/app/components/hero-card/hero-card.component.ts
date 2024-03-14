import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  inject,
} from '@angular/core';

import { TooltipModule } from 'primeng/tooltip';
import { toObservable } from '@angular/core/rxjs-interop';

import { RICK } from '@constants/rick-hero-mock';
import { HeroStatus } from '@enums/hero-status.enum';
import { Hero } from '@models/hero.interface';
import { LocationTooltipComponent } from './components/location-tooltip/location-tooltip.component';
import { HeroesStore } from '@store/heroes.store';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule, TooltipModule, LocationTooltipComponent],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent {
  @Input() public hero: Hero = RICK;

  protected readonly store = inject(HeroesStore);

  public heroLocation = toObservable(computed(() => this.store.allHeroesLocation()[this.hero.id]));
  protected heroStatus = HeroStatus;

  constructor() {}

  public getHeroLocation(url: string, heroId: number): void {
    this.store.getHeroLocation({ url, heroId });
  }
}
