import { ICountriesAPI, Country } from '../models/icountries-api';

const latency = 200;
  
export class CountriesAPILocal implements ICountriesAPI {
  
  public countries:Country[] = [
    {
      name: "Gondor",
      value: "gondor"
    },
    {
      name: "Isengard",
      value: "isengard"
    },
    {
      name: "Mordor",
      value: "mordor"
    },
    {
      name: "Rivendel",
      value: "rivendel"
    },
    {
      name: "Rohan",
      value: "rohan"
    },
    {
      name: "The Shire",
      value: "the shire"
    }
  ];

  getCountries(): Promise<Country[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.countries);
      }, latency);
    });
  }

  isCountry(countryName: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const found = this.countries.filter(x => x.value == countryName.toLowerCase())[0];
        resolve(found? true: false);
      }, latency);
    });
  }
}
