import { Applicant } from '../models/applicant';
import { BaseService } from './base-service';
import { IApplicantsAPI } from './../models/iapplicants-api';

export class ApplicantService extends BaseService {

  isRequesting = false;

  constructor(private api: IApplicantsAPI) {
    super()
  }

  getApplicantsList(): Promise<Applicant[]> {
    this.isRequesting = true;
    
    return this.api.getApplicantsList().then( list => {
      this.isRequesting = false;
      return list;
    })
    .catch(err => this.handleError<Applicant[]>("get applicants list", err));
  }

  getApplicantDetails(id: number): Promise<Applicant> {
    this.isRequesting = true;
    
    return this.api.getApplicantDetails(id).then( applicant => {
      this.isRequesting = false;
      return applicant;
    })
    .catch(err => this.handleError<Applicant>("get applicant details", err));
  }

  createApplicant(applicant: Applicant): Promise<string> {
    this.isRequesting = true;
    
    return this.api.createApplicant(applicant).then( url => {
      this.isRequesting = false;
      return url;
    })
    .catch(err => this.handleError<string>("create applicant", err));
  }

  updateApplicant(id: number, applicant: Applicant): Promise<Applicant> {
    this.isRequesting = true;
    
    return this.api.updateApplicant(id, applicant).then( applicantLatest => {
      this.isRequesting = false;
      return applicantLatest;
    })
    .catch(err => this.handleError<Applicant>("update applicant", err));
  }

  deleteApplicant(id: number): Promise<Applicant> {
    this.isRequesting = true;
    
    return this.api.deleteApplicant(id).then( applicant => {
      this.isRequesting = false;
      return applicant;
    })
    .catch(err => this.handleError<Applicant>("delete applicant", err));
  }
}
