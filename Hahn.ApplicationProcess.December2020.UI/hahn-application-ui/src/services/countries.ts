import { ICountriesAPI, Country } from './../models/icountries-api';
import { autoinject } from 'aurelia-framework';

@autoinject
export class CountriesService {
  
  constructor(private api: ICountriesAPI) {}

  getCountries(): Promise<Country[]> {
    return this.api.getCountries();
  }

  isCountry(countryName: string): Promise<boolean> {
      return this.api.isCountry(countryName);
  }
}
