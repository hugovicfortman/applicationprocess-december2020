import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../resources/web-api';
import { ApplicantViewed, ApplicantUpdated } from '../../services/messages';
import { inject } from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class ApplicantList {
	applicants;
	selectedId = 0;

	constructor(private api: WebAPI, private ea: EventAggregator) {}

	created() {
		this.api.getApplicantsList().then(applicants => this.applicants = applicants);
	}
}
