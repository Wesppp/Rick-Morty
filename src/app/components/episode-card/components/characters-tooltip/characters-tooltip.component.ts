import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Hero } from '@models/hero.interface';

@Component({
  selector: 'app-characters-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters-tooltip.component.html',
  styleUrl: './characters-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersTooltipComponent {
  @Input({ required: true }) public heroes: Hero[] | null = [];
}
