import { ApplicantService } from 'services/applicants';
import { CountriesService } from './services/countries';
import { WebAPI } from './resources/web-api';
import { ApplicantsAPILocal } from './resources/applicants-api-local';
import { ApplicantsAPIRemote } from './resources/applicants-api-remote';
import { CountriesAPILocal } from './resources/countries-api-local';
import { CountriesAPIRemote } from './resources/countries-api-remote';

import 'bootstrap/dist/css/bootstrap.css';

import { Aurelia } from 'aurelia-framework';
import { I18N, TCustomAttribute } from 'aurelia-i18n';
import XHR from 'i18next-xhr-backend';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';

const webApi = new WebAPI();
const appService = new ApplicantService(new ApplicantsAPILocal());
const countryService = new CountriesService(new CountriesAPILocal());

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      const aliases = ['t', 'i18n'];
      // add aliases for 't' attribute
      TCustomAttribute.configureAliases(aliases);

      // register backend plugin
      instance.i18next.use(XHR);

      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: '/locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
        },
        ns: ['translation'], // Any additional translation modules
        defaultNS: 'translation',
        attributes: aliases,
        lng : 'de',
        fallbackLng : 'en',
        debug : false
      });
    })
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
