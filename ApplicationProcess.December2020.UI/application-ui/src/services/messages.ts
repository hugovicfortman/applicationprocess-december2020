import { Applicant } from '../models/applicant';

export class ApplicantCreated {
	constructor(public url: string) { }
}

export class ApplicantViewed {
	constructor(public applicant: Applicant) { }
}

export class ApplicantUpdated {
	constructor(public applicant: Applicant) { }
}

export class ApplicantDeleted {
	constructor(public applicant: Applicant) { }
}

export class ErrorOccured {
	constructor(public error: Error) { }
}
