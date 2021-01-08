import { inject, NewInstance } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../resources/web-api';
import { areEqual } from '../../resources/utility';
import { ApplicantCreated, ApplicantViewed, ApplicantUpdated, ApplicantDeleted } from '../../services/messages';
import { BootstrapFormRenderer } from 'aurelia-form-renderer-bootstrap';
import { ValidationRules, ValidationController } from 'aurelia-validation';

interface Applicant {
  id: number;
  age: number;
  hired: boolean;
  name: string;
  familyName: string;
  countryOfOrigin: string;
  address: string;
  emailAddress: string;
}

@inject(WebAPI, EventAggregator, NewInstance.of(ValidationController))
export class ApplicantDetails {
	routeConfig;
	applicant: Applicant ;
  originalApplicant: Applicant;
  isNewApplicant: boolean;

  public title = "Applicant";

	constructor(private api: WebAPI, private ea: EventAggregator, private controller: ValidationController) { 
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

	activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    if(params.id)
    {
      this.isNewApplicant = false;

      return this.api.getApplicantDetails(params.id).then(applicant => {
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
		return this.applicant.name && this.applicant.familyName && !this.api.isRequesting;
	}

	save(): void {
    if(this.isNewApplicant)
    {
      this.api.createApplicant(this.applicant).then(url => this.routeConfig
        .navModel.router.navigateToRoute('success', {id: this.getId(<string>url)}));
    }else{
      this.api.saveApplicant(this.applicant).then(applicant => {
        this.applicant = <Applicant>applicant;
        this.originalApplicant = this.applicant;
        this.routeConfig.navModel.router.navigateToRoute('success', {id: this.applicant.id});
      });
    }
	}

	delete(): void {
    if(this.isNewApplicant)
    {
      this.api.createApplicant(this.applicant).then(url => {
        this.ea.publish(new ApplicantCreated(url));
      });
    }else{
      this.api.deleteApplicant(this.applicant).then(applicant => {
        this.applicant = <Applicant>applicant;
        this.originalApplicant = JSON.parse(JSON.stringify(this.applicant));
        this.ea.publish(new ApplicantDeleted(this.applicant));
      });
    }
	}

	canDeactivate(): boolean {
		if(!areEqual(this.originalApplicant, this.applicant)) {
			const result = confirm('You have unsaved changes, Are you sure you wish to leave?');

			if(!result) {
				this.ea.publish(new ApplicantViewed(this.applicant));
			}
	
			return result;
		}
		
		return true;
  }
  
  reset(): void {
    const result = confirm('This will reset all the data. \n Are you sure?');

    if(!result) {
      this.ea.publish(new ApplicantViewed(this.applicant));
    }else{
      this.applicant = <Applicant>{};
    }
  }

  getId(url: string): string {
    return url.replace('/applicant/', '');
  }
}
