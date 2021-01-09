import { ApplicantService } from 'services/applicants';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router, RouterConfiguration } from 'aurelia-router';
import { autoinject, PLATFORM } from 'aurelia-framework';

@autoinject
export class App {
  router: Router;
  

  constructor(public appService: ApplicantService, private ea: EventAggregator) {}
	
	configureRouter(config: RouterConfiguration, router: Router) {
		config.title = 'Hahn Softwareentwicklung';
		config.options.pushState = true;
		config.options.root = '/';
		config.map([
			{ route: '',			moduleId: PLATFORM.moduleName('modules/applicant-details/applicant-details'), title: 'New Applicant', name: 'new', nav: true },
			{ route: 'success/:id',	moduleId: PLATFORM.moduleName('modules/application-success/application-success'), title: 'Success', name: 'success'}, // Will be false later
			{ route: 'applicants',	moduleId: PLATFORM.moduleName('modules/applicant-list/applicant-list'), title: 'View Applicants', name: 'applicants', nav: true },
			{ route: 'applicant/:id',	moduleId: PLATFORM.moduleName('modules/applicant-details/applicant-details'), title: 'View Applicant', name: 'applicant', settings: {isVisibleInNav: false} }
		]);

		this.router = router;
	}
}
