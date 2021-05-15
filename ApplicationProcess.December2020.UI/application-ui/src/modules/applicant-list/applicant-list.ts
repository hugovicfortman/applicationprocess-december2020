import { ApplicantService } from '../../services/applicants';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ApplicantViewed, ApplicantUpdated } from '../../services/messages';
import { autoinject } from 'aurelia-framework';

@autoinject
export class ApplicantList {
	applicants;
	selectedId = 0;

	constructor(private appService: ApplicantService, private ea: EventAggregator) {
  }

	created():void {
		this.appService.getApplicantsList().then(applicants => this.applicants = applicants);
	}
}
