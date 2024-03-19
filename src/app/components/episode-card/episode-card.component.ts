import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TooltipModule } from 'primeng/tooltip';

import { EPISODE } from '@constants/episode-mock';
import { Episode } from '@models/episode.interface';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [
    CommonModule,
    TooltipModule,
  ],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeCardComponent {
  @Input() public episode: Episode = EPISODE;

  public getEpisodeHeroes(urls: string[], episodeId: number): void {
    // store method
  }
}
