import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

import { HeroLocation } from '@models/location.interface';

@Component({
  selector: 'app-location-tooltip',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './location-tooltip.component.html',
  styleUrl: './location-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationTooltipComponent {
  @Input({ required: true }) public heroLocation!: HeroLocation | null;
}
