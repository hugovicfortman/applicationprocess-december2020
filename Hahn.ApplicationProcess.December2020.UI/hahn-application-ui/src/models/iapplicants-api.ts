import { Applicant } from './applicant';

export interface IApplicantsAPI {

  /**
   * 
   */
  getApplicantsList(): Promise<Applicant[]>;

  /**
   * Get an applicant from the database
   * @param id The numerical Id of the applicant to get from server
   */
  getApplicantDetails(id: number): Promise<Applicant>;

  /**
   * 
   * @param applicant The applicant object to create in database
   */
  createApplicant(applicant: Applicant): Promise<string>;

  /**
   * Update an applicant to the database
   * @param id The numerical Id of the applicant to update
   * @param applicant The applicant object to update in database
   */
  updateApplicant(id: number, applicant: Applicant): Promise<Applicant>;

  /**
   * Delete an applicant from the database
   * @param id The numerical Id of the applicant to delete
   */
  deleteApplicant(id: number) :Promise<Applicant>;
}
