import { CountriesService } from './services/countries';
import { WebAPI } from './resources/web-api';
import { ApplicantsAPILocal } from './resources/applicants-api-local';
import { ApplicantsAPIRemote } from './resources/applicants-api-remote';
import { CountriesAPILocal } from './resources/countries-api-local';
import { CountriesAPIRemote } from './resources/countries-api-remote';
import 'bootstrap/dist/css/bootstrap.css';

import { Aurelia } from 'aurelia-framework';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import { ApplicantService } from 'services/applicants';

const webApi = new WebAPI();
const appService = new ApplicantService(new ApplicantsAPILocal());
const countryService = new CountriesService(new CountriesAPILocal());

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .instance(ApplicantService, appService)
    .instance(CountriesService, countryService)
    .instance(WebAPI, webApi)
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
