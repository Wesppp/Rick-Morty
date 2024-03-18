import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HeroLocation } from '@models/location.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  public getHeroLocation(url: string): Observable<HeroLocation> {
    return this.http.get<HeroLocation>(url);
  }
}
