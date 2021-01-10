export interface ICountriesAPI {
  
  countries:Country[];

  getCountries(): Promise<Country[]>;

  isCountry(countryName: string): Promise<boolean>;
}

export interface Country {
  name: string;
  value: string
}
