import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

import { CARD_SKELETON_VALUES } from '@constants/stub-values';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-card.component.html',
  styleUrl: './skeleton-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonCardComponent {
  public cardSkeletonValues: number[] = CARD_SKELETON_VALUES;
}
