import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

import { Hero } from '@models/hero.interface';
import { HERO_TOOLTIP_SKELETON_VALUES } from '@constants/stub-values.interface';

@Component({
  selector: 'app-characters-tooltip',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './characters-tooltip.component.html',
  styleUrl: './characters-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersTooltipComponent {
  @Input({ required: true }) public heroes: Hero[] | null = [];

  public skeletonValues: number[] = HERO_TOOLTIP_SKELETON_VALUES;
}
