import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

import { Episode } from '@models/episode.interface';
import { TEXT_SKELETON_VALUES } from '@constants/stub-values';

@Component({
  selector: 'app-episodes-tooltip',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './episodes-tooltip.component.html',
  styleUrl: './episodes-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesTooltipComponent {
  @Input({ required: true }) public episodes: Episode[] | null = [];

  public textSteletonValues: number[] = TEXT_SKELETON_VALUES;
}
