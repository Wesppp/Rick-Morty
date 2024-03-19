import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { HeroCardComponent } from '@components/hero-card/hero-card.component';
import { HeroesStore } from '@store/heroes.store';
import { SkeletonCardComponent } from '@components/skeleton-card/skeleton-card.component';
import { PAGINATION_ROWS } from '@constants/pagination';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [CommonModule, HeroCardComponent, PaginatorModule, SkeletonCardComponent],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesListComponent implements OnInit {
  protected readonly store = inject(HeroesStore);

  public rows: number = PAGINATION_ROWS;
  public page: number = 1;

  public ngOnInit(): void {
    this.store.getMultipleHeroes(this.page);
  }

  public onPageChange({ page }: PaginatorState): void {
    this.page = ++page!;

    this.store.getMultipleHeroes(this.page);
  }
}
