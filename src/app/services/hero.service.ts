import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';

import { HeroLocation } from '@models/location.interface';
import { Episode } from '@models/episode.interface';
import { Hero } from '@models/hero.interface';
import { HeroesResponse } from '@models/heroes-response.interface';
import { mapResponseToResult } from '@utils/mappers';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private readonly http: HttpClient) {}

  public getHeroLocation(url: string): Observable<HeroLocation> {
    return this.http.get<HeroLocation>(url);
  }

  public getHeroEpisodes(urls: string[]): Observable<Episode[]> {
    const req = urls.map((url) => this.http.get<Episode>(url));

    return forkJoin<Episode[]>(req);
  }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<HeroesResponse>(`${environment.apiUrl}/character`)
      .pipe(mapResponseToResult());
  }

  public getMultipleHeroes(page: number): Observable<HeroesResponse> {
    return this.http.get<HeroesResponse>(`${environment.apiUrl}/character/?page=${page}`);
  }
}
