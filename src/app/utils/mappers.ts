import { HeroesResponse } from '@models/heroes-response.interface';

import { map } from 'rxjs';

export const mapResponseToResult = () => map((response: HeroesResponse) => response.results);
