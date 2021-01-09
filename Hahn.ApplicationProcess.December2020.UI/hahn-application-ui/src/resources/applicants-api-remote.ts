import { Applicant } from './../models/applicant';
import { IApplicantsAPI } from '../models/iapplicants-api';
import { WebAPI } from './web-api';
  

export class ApplicantsAPIRemote implements IApplicantsAPI {
  isRequesting = false;

  constructor(private web: WebAPI, private apiBaseUrl: string) {}
  
  getApplicantsList(): Promise<Applicant[]>{
    return this.web.get<Applicant[]>("applicant");
  }

  getApplicantDetails(id: number): Promise<Applicant>{
    return this.web.get<Applicant>("applicant", {body: {id: id}});
  }

  updateApplicant(id: number, applicant: Applicant): Promise<Applicant>{
    return this.web.put<Applicant>("applicant", {body: {id: id, applicant: applicant}});
  }

  createApplicant(applicant: Applicant): Promise<string>{
    return this.web.post<string>("applicant", {body: {applicant: applicant}});
  }

  deleteApplicant(id: number) :Promise<Applicant>{
    return this.web.delete<Applicant>("applicant", {body: {id: id}});
  }
  
}
