interface IApplicant {
  age: number;
  hired: boolean;
  name: string;
  familyName: string;
  countryOfOrigin: string;
  address: string;
  emailAddress: string;
}

export class Applicant implements IApplicant {
  id: number;
  age: number;
  hired: boolean;
  name: string;
  familyName: string;
  countryOfOrigin: string;
  address: string;
  emailAddress: string;
}
