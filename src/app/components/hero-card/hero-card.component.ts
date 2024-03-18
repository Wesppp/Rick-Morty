import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RICK } from '@constants/rick-hero-mock';
import { HeroStatus } from '@enums/hero-status.enum';
import { Hero } from '@models/hero.interface';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent {
  @Input() public hero: Hero = RICK;

  protected heroStatus = HeroStatus;
}
