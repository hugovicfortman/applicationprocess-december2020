import { I18N } from 'aurelia-i18n';
import { ApplicantService } from 'services/applicants';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router, RouterConfiguration } from 'aurelia-router';
import { autoinject, PLATFORM } from 'aurelia-framework';

@autoinject
export class App {
  router: Router;
  

  constructor(public appService: ApplicantService, private ea: EventAggregator, private i18n: I18N) {
    this.configureLocale('de-DE');
  }
	
	configureRouter(config: RouterConfiguration, router: Router): void {
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
  
  configureLocale(locale: string): void {
    this.i18n
      .setLocale(locale)
      .then( () => {
    // locale is loaded
      console.log(locale);
      console.log(this.i18n.tr('score'));
      console.log(this.i18n.tr);
      console.log(this.i18n.getLocale());
    });
  }
}
