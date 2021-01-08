export class ApplicantCreated {
	constructor(public url) { }
}

export class ApplicantViewed {
	constructor(public applicant) { }
}

export class ApplicantUpdated {
	constructor(public applicant) { }
}

export class ApplicantDeleted {
	constructor(public applicant) { }
}
