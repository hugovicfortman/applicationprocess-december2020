import { ICountriesAPI, Country } from '../models/icountries-api';
import { BaseService } from './base-service';

import { autoinject } from 'aurelia-framework';

@autoinject
export class CountriesService extends BaseService {
  
  constructor(private api: ICountriesAPI) {
    super()
  }

  getCountries(): Promise<Country[]> {
    return this.api.getCountries()
      .catch(err => this.handleError<Country[]>("get countries list", err));
  }

  isCountry(countryName: string): Promise<boolean> {
    return this.api.isCountry(countryName)
      .catch(err => this.handleError<boolean>("confirm country validity", err));
  }
}
