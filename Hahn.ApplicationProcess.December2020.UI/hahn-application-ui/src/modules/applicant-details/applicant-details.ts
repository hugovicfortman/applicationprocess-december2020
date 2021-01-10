import { ApplicantService } from './../../services/applicants';
import { CountriesService } from './../../services/countries';
import { Prompt } from './../prompt/prompt';
import { Applicant } from './../../models/applicant';
import { areEqual } from '../../resources/utility';
import { ApplicantCreated, ApplicantViewed, ApplicantUpdated, ApplicantDeleted } from '../../services/messages';
import { BootstrapFormRenderer } from '../../resources/bootstrap-form-renderer';

import {I18N} from 'aurelia-i18n';
import { autoinject, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ValidationRules, Validator,  ValidationControllerFactory, ValidationController, validateTrigger, ResultInstruction } from 'aurelia-validation';

@autoinject
export class ApplicantDetails {
  private routeConfig;
  private controller : ValidationController;
  private renderer: BootstrapFormRenderer;
  private validationRules: ValidationRules;

  private originalApplicant: Applicant;
  private isNewApplicant: boolean;
  private _canSave;
  private _hasSaved;

  public title = "Applicant";
  public applicant: Applicant;
  public countries;

  constructor(private appService: ApplicantService, 
              private cs: CountriesService, 
              private ea: EventAggregator, 
              private controllerFactory: ValidationControllerFactory, 
              private validator: Validator, 
              private prompt: Prompt,
              private i18n: I18N) { 
    this.controller = this.controllerFactory.createForCurrentScope(validator);
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.controller.subscribe(event => this.validateWhole());
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
      on(this.applicant);
  }


  private validateWhole() {
    this.validator.validateObject(this.applicant)
      .then(results => {
        this._canSave = results.length && results.every(result => result.valid);
      });
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

      this.applicant = <Applicant>{hired: false};
      this.originalApplicant = this.applicant;
      return;
    }

  }

  bind(): void
  {
    this.cs.getCountries().then(c => this.countries = c);
    this.controller.addRenderer(this.renderer);
    this.configureValidationRules();
  }

	get canSave(): boolean {
    return this._canSave && this.canReset && !this.appService.isRequesting;
  }
  
  get canReset(): boolean {
    return !(!(this.applicant.name ||
            this.applicant.familyName ||
            this.applicant.emailAddress ||
            this.applicant.age ||
            this.applicant.address ||
            this.applicant.countryOfOrigin)) && !this._hasSaved;
  }

	save(): void {
    this.controller.validate().then(result => {
      if(result.valid) {
        if(this.isNewApplicant)
        {
          this.appService.createApplicant(this.applicant)
          .then(url => {
                  this._hasSaved = true;
                  this.routeConfig.navModel.router
                    .navigateToRoute('success', {id: this.getId(<string>url)});
          })
          .catch(err => this.prompt.alert(`An Error occured. Please try again <br> ${ err.message }`));
        }else{
          this.appService.updateApplicant(this.applicant.id, this.applicant).then(applicant => {
            this.applicant = <Applicant>applicant;
            this.originalApplicant = this.applicant;
            this.routeConfig.navModel.router.navigateToRoute('success', {id: this.applicant.id});
          });
        }
      }else{
        // Render errors
        this.prompt.alert("An Error occured. Please try again");
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
      if((this.isNewApplicant && this.canReset) || 
            !areEqual(this.originalApplicant, this.applicant)) {
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
