import { Applicant } from '../models/applicant';
import { IApplicantsAPI } from './../models/iapplicants-api';

export class ApplicantService {

  isRequesting = false;

  constructor(private api: IApplicantsAPI) {}

  getApplicantsList(): Promise<Applicant[]> {
    this.isRequesting = true;
    
    return this.api.getApplicantsList().then( list => {
      this.isRequesting = false;
      return list;
    });
  }

  getApplicantDetails(id: number): Promise<Applicant> {
    this.isRequesting = true;
    
    return this.api.getApplicantDetails(id).then( applicant => {
      this.isRequesting = false;
      return applicant;
    });
  }

  createApplicant(applicant: Applicant): Promise<string> {
    this.isRequesting = true;
    
    return this.api.createApplicant(applicant).then( url => {
      this.isRequesting = false;
      return url;
    });
  }

  updateApplicant(id: number, applicant: Applicant): Promise<Applicant> {
    this.isRequesting = true;
    
    return this.api.updateApplicant(id, applicant).then( applicantLatest => {
      this.isRequesting = false;
      return applicantLatest;
    });
  }

  deleteApplicant(id: number): Promise<Applicant> {
    this.isRequesting = true;
    
    return this.api.deleteApplicant(id).then( applicant => {
      this.isRequesting = false;
      return applicant;
    });
  }
  
}
