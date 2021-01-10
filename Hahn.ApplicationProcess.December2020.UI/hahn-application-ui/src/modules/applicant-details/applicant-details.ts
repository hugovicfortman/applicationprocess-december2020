import { ApplicantService } from './../../services/applicants';
import { CountriesService } from './../../services/countries';
import { Prompt } from './../prompt/prompt';
import { Applicant } from './../../models/applicant';
import { autoinject, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { areEqual } from '../../resources/utility';
import { ApplicantCreated, ApplicantViewed, ApplicantUpdated, ApplicantDeleted } from '../../services/messages';
import { BootstrapFormRenderer } from '../../resources/bootstrap-form-renderer';
import { ValidationRules, ValidationControllerFactory, ValidationController, validateTrigger } from 'aurelia-validation';

@autoinject
export class ApplicantDetails {
  routeConfig;

  controller : ValidationController;
  renderer: BootstrapFormRenderer;
  validationRules: ValidationRules;

  originalApplicant: Applicant;
  isNewApplicant: boolean;
  countries;

  public title = "Applicant";

  constructor(private appService: ApplicantService, 
              private cs: CountriesService, 
              private ea: EventAggregator, 
              private controllerFactory: ValidationControllerFactory, 
              private applicant: Applicant, 
              private prompt: Prompt) { 
    this.applicant = applicant;
    this.controller = this.controllerFactory.createForCurrentScope();
    this.controller.addObject(this.applicant);
    // this.controller.validateTrigger = validateTrigger.manual;
    this.renderer = new BootstrapFormRenderer();
  }

  configureValidationRules(): void {
    
    ValidationRules
      .ensure((a: Applicant) => a.age).displayName('Age').required().between(20, 60)
      .ensure((a: Applicant) => a.hired).displayName('Hired').required()
      .ensure((a: Applicant) => a.name).displayName('Name').required().minLength(5)
      .ensure((a: Applicant) => a.familyName).displayName('Family Name').required().minLength(5)
      .ensure((a: Applicant) => a.countryOfOrigin).displayName('Country of Origin').required()
      .ensure((a: Applicant) => a.address).displayName('Address').required().minLength(10)
      .ensure((a: Applicant) => a.emailAddress).displayName('Email Address').email().required().
      on(Applicant);
  }
  
  bind(): void
  {
    this.cs.getCountries().then(c => this.countries = c);
    this.controller.addRenderer(this.renderer);
    this.configureValidationRules();
  }

	activate(params, routeConfig): Promise<void> {
    this.routeConfig = routeConfig;

    if(params.id)
    {
      this.isNewApplicant = false;

      return this.appService.getApplicantDetails(params.id).then(applicant => {
        this.applicant = <Applicant>applicant;
        this.routeConfig.navModel.setTitle(`${ this.applicant.name } ${ this.applicant.familyName }`);
        this.originalApplicant = JSON.parse(JSON.stringify(this.applicant));
        this.ea.publish(new ApplicantViewed(this.applicant));
      });
    }{
      this.isNewApplicant = true;

      this.applicant = <Applicant>{};
      this.originalApplicant = <Applicant>{};
      return;
    }

	}

	get canSave(): boolean {
		return this.applicant.name && this.applicant.familyName && !this.appService.isRequesting;
	}

	save(): void {
    this.controller.validate().then(result => {
      if(result.valid) {
        if(this.isNewApplicant)
        {
          this.appService.createApplicant(this.applicant)
          .then(url => this.routeConfig.navModel.router
                  .navigateToRoute('success', {id: this.getId(<string>url)}))
          .catch(err => console.log(err));
        }else{
          this.appService.updateApplicant(this.applicant.id, this.applicant).then(applicant => {
            this.applicant = <Applicant>applicant;
            this.originalApplicant = this.applicant;
            this.routeConfig.navModel.router.navigateToRoute('success', {id: this.applicant.id});
          });
        }
      }
    });
	}

	delete(): void {
    this.prompt.confirm('Are you sure you wish to delete this applicant?')
      .then((confirmed: boolean) => {
        if(confirmed)
        {
          this.appService.deleteApplicant(this.applicant.id).then(applicant => {
            this.applicant = <Applicant>applicant;
            this.originalApplicant = JSON.parse(JSON.stringify(this.applicant));
            this.ea.publish(new ApplicantDeleted(this.applicant));
          });
        }
    });
	}

  /**
   * Resets the applicant form by clearing all fields
   */
  reset(): void {
    this.prompt.confirm('This will reset all the data. \n Are you sure?')
      .then(confirmed => {
        if(!confirmed) {
          this.ea.publish(new ApplicantViewed(this.applicant));
        }else{
          this.applicant = <Applicant>{};
        }
      });
  }

  /**
   * Extracts Id from response URL on successful applicant creation
   * @param url URL returned from server when a new applicant is created
   */
  getId(url: string): string {
    return url.replace('/applicant/', '');
  }

  unbind(): void
  {
    this.controller.removeRenderer(this.renderer);
  }

  /**
   * Returns a boolean indicating whether page can exit or must be retained.
   */
	canDeactivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if(!areEqual(this.originalApplicant, this.applicant)) {
        return this.prompt.confirm('You have unsaved changes, Are you sure you wish to leave?')
          .then((confirmed: boolean) => {
              if(!confirmed) {
                this.ea.publish(new ApplicantViewed(this.applicant));
              }
              resolve(confirmed);
          });
      }
      resolve(true);
    });
  }

}
