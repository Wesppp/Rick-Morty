import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';

import { HeroLocation } from '@models/location.interface';
import { Episode } from '@models/episode.interface';
import { BASE_URL } from '@constants/tokens';
import { Hero } from '@models/hero.interface';
import { HeroesResponse } from '@models/heroes-response.interface';
import { mapResponseToResult } from '@utils/mappers';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private readonly http: HttpClient,
    @Inject(BASE_URL) private readonly url: string,
  ) {}

  public getHeroLocation(url: string): Observable<HeroLocation> {
    return this.http.get<HeroLocation>(url);
  }

  public getHeroEpisodes(urls: string[]): Observable<Episode[]> {
    const req = urls.map((url) => this.http.get<Episode>(url));

    return forkJoin<Episode[]>(req);
  }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<HeroesResponse>(`${this.url}/character`)
      .pipe(mapResponseToResult());
  }

  public getMultipleHeroes(page: number): Observable<HeroesResponse> {
    return this.http.get<HeroesResponse>(`${this.url}/character/?page=${page}`);
  }
}
