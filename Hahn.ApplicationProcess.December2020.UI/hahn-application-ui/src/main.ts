import { ApplicantsAPILocal } from './resources/applicants-api-local';
import { ApplicantsAPIRemote } from './resources/applicants-api-remote';
import 'bootstrap/dist/css/bootstrap.css';

import { Aurelia } from 'aurelia-framework';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import { ApplicantService } from 'services/applicants';

const appService = new ApplicantService(new ApplicantsAPILocal());

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .instance(ApplicantService, appService)
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
