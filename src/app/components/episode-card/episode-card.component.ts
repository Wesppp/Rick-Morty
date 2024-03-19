import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { TooltipModule } from 'primeng/tooltip';

import { EPISODE } from '@constants/episode-mock';
import { Episode } from '@models/episode.interface';
import { EpisodesStore } from '@store/episodes.store';
import {
  CharactersTooltipComponent
} from './components/characters-tooltip/characters-tooltip.component';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [CommonModule, TooltipModule, CharactersTooltipComponent],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeCardComponent {
  @Input() public episode: Episode = EPISODE;

  protected readonly store = inject(EpisodesStore);

  public heroes$ = toObservable(computed(() => this.store.allEpisodesHeroes()[this.episode.id]));

  public getEpisodeHeroes(urls: string[], episodeId: number): void {
    this.store.getEpisodeHeroes({ urls, id: episodeId });
  }
}
