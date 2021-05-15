import { Applicant } from '../models/applicant';
import { IApplicantsAPI } from '../models/iapplicants-api';
import { WebAPI } from './web-api';
  

export class ApplicantsAPIRemote implements IApplicantsAPI {
  isRequesting = false;

  constructor(private api: WebAPI, private apiBaseUrl: string) {}
  
  getApplicantsList(): Promise<Applicant[]>{
    return this.api.get<Applicant[]>(`${ this.apiBaseUrl }applicant`);
  }

  getApplicantDetails(id: number): Promise<Applicant>{
    return this.api.get<Applicant>(`${ this.apiBaseUrl }applicant`, {body: {id: id}});
  }

  updateApplicant(id: number, applicant: Applicant): Promise<Applicant>{
    return this.api.put<Applicant>(`${ this.apiBaseUrl }applicant`, {body: {id: id, applicant: applicant}});
  }

  createApplicant(applicant: Applicant): Promise<string>{
    return this.api.post<string>(`${ this.apiBaseUrl }applicant`, {body: {applicant: applicant}});
  }

  deleteApplicant(id: number) :Promise<Applicant>{
    return this.api.delete<Applicant>(`${ this.apiBaseUrl }applicant`, {body: {id: id}});
  }
  
}
