import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../resources/web-api';
import { areEqual } from '../../resources/utility';
import { ApplicantCreated, ApplicantViewed, ApplicantUpdated, ApplicantDeleted } from '../../services/messages';

interface Applicant {
  age: number;
  hired: boolean;
  name: string;
  familyName: string;
  countryOfOrigin: string;
  address: string;
  emailAddress: string;
}

@inject(WebAPI, EventAggregator)
export class ApplicantDetails {
	routeConfig;
	applicant: Applicant ;
  originalApplicant: Applicant;
  isNewApplicant: boolean;

  public title = "Applicant";

	constructor(private api: WebAPI, private ea: EventAggregator) { }

	activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    if(params.id)
    {
      this.isNewApplicant = false;

      return this.api.getApplicantDetails(params.id).then(applicant => {
        this.applicant = <Applicant>applicant;
        this.routeConfig.navModel.setTitle(this.applicant.name);
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

	get canSave() {
		return this.applicant.name && this.applicant.familyName && !this.api.isRequesting;
	}

	save() {
    if(this.isNewApplicant)
    {
      this.api.createApplicant(this.applicant).then(url => {
        this.ea.publish(new ApplicantCreated(url));
      });
    }else{
      this.api.saveApplicant(this.applicant).then(applicant => {
        this.applicant = <Applicant>applicant;
        this.routeConfig.navModel.setTitle(this.applicant.name);
        this.originalApplicant = JSON.parse(JSON.stringify(this.applicant));
        this.ea.publish(new ApplicantUpdated(this.applicant));
      });
    }
	}

	delete() {
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

	canDeactivate() {
		if(!areEqual(this.originalApplicant, this.applicant)) {
			let result = confirm('You have unsaved changes, Are you sure you wish to leave?');

			if(!result) {
				this.ea.publish(new ApplicantViewed(this.applicant));
			}
	
			return result;
		}
		
		return true;
	}
}
