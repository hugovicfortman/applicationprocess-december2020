import { ErrorOccured } from './services/messages';
import { I18N } from 'aurelia-i18n';
import { ApplicantService } from 'services/applicants';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router, RouterConfiguration } from 'aurelia-router';
import { autoinject, PLATFORM } from 'aurelia-framework';
import { Prompt } from 'resources/elements/prompt/prompt';
import { CountriesService } from 'services/countries';

@autoinject
export class App {
  router: Router;
  

  constructor(private appService: ApplicantService, 
              private countriesService: CountriesService, 
              private ea: EventAggregator, 
              private i18n: I18N,
              private prompt: Prompt) {
    this.configureLocale('de-DE');
    this.appService.setEventAggregator(ea);
    this.countriesService.setEventAggregator(ea);
    ea.subscribe(ErrorOccured, ({error}) => {
      this.prompt
      .alert(this.i18n.tr('messages.error',{'errortype': error.name, 'error': error.message}))
    });
  }
	
	configureRouter(config: RouterConfiguration, router: Router): void {
		config.title = 'Softwareentwicklung';
		config.options.pushState = true;
		config.options.root = '/';
		config.map([
			{ route: '',			moduleId: PLATFORM.moduleName('modules/applicant-details/applicant-details'), title: this.i18n.tr('titles.new_applicant'), name: 'new', nav: true },
			{ route: 'success/:id',	moduleId: PLATFORM.moduleName('modules/application-success/application-success'), title: this.i18n.tr('titles.success'), name: 'success'}, // Will be false later
			{ route: 'applicants',	moduleId: PLATFORM.moduleName('modules/applicant-list/applicant-list'), title: this.i18n.tr('titles.view_applicants'), name: 'applicants', nav: true },
			{ route: 'applicant/:id',	moduleId: PLATFORM.moduleName('modules/applicant-details/applicant-details'), title: this.i18n.tr('titles.view_applicants'), name: 'applicant', settings: {isVisibleInNav: false} }
		]);

		this.router = router;
  }
  
  configureLocale(locale: string): void {
    this.i18n
      .setLocale(locale)
      .then( () => {
    // locale is loaded
      // console.log(locale);
      // console.log(this.i18n.tr('score'));
      // console.log(this.i18n.tr);
      // console.log(this.i18n.getLocale());
    });
  }
}
