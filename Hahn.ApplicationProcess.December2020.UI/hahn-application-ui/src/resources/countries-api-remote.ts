import { WebAPI } from './web-api';
import { autoinject } from 'aurelia-framework';
import { ICountriesAPI, Country } from '../models/icountries-api';

@autoinject
export class CountriesAPIRemote implements ICountriesAPI {
  
  public countries:Country[];

  constructor(private api: WebAPI, private apiBaseUrl: string) {}

  getCountries(): Promise<Country[]> {
    if(!this.countries)
    {
      return this.api
                .get<Country[]>(`${ this.apiBaseUrl }all`, {body: {fields:'name'}})
                .then(countries => countries.map(c => { 
                    return { name: c.name, value: c.name.toLowerCase() }
                  }));
    }else{
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.countries);
        }, 0);
      });
    }
  }

  isCountry(countryName: string): Promise<boolean> {
    if(!this.countries)
    {
      return this.api
                .get(`${ this.apiBaseUrl }name/${ countryName }`, {body: {fullText:true}})
                .then(res => !(!res[0]));
    }else{
      return new Promise(resolve => {
        setTimeout(() => {
          const found = this.countries.filter(x => x.value == countryName.toLowerCase())[0];
          resolve(found? true: false);
        }, 0);
      });
    }
  }
}
