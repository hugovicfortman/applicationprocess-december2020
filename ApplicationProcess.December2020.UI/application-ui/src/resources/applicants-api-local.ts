import { IApplicantsAPI } from '../models/iapplicants-api';
import { Applicant } from '../models/applicant';

const latency = 200;
let id = 0;

function getId(){
  return ++id;
}

const applicants :Applicant[] = [
  {
    id:getId(),
    age: 45,
    hired:true,
    name:'Bilbo',
    familyName:'Baggings',
    countryOfOrigin: 'the shire',
    address:'House 2, Bag End, The Shire, Middle Earth',
    emailAddress:'bilbobaggings@shire.com'
  },
  {
    id:getId(),
    age: 25,
    hired:true,
    name:'Frodo',
    familyName:'Baggings',
    countryOfOrigin: 'the shire',
    address:'House 2, Bag End, The Shire, Middle Earth',
    emailAddress:'frodobaggings@shire.com'
  },
  {
    id:getId(),
    age: 30,
    hired:true,
    name:'Samwise',
    familyName:'Gamji',
    countryOfOrigin: 'the shire',
    address:'House 12, Honeysuckle Lane, The Shire, Middle Earth',
    emailAddress:'samwisegamji@shire.com'
  },
  {
    id:getId(),
    age: 22,
    hired:true,
    name:'Peregrin',
    familyName:'Took',
    countryOfOrigin: 'the shire',
    address:'House 5, Wadsbottom Lane, The Shire, Middle Earth',
    emailAddress:'pippin@shire.com'
  },
  {
    id:getId(),
    age: 22,
    hired:true,
    name:'Merridew',
    familyName:'Maus',
    countryOfOrigin: 'the shire',
    address:'House 7, Wadsbottom Lane, The Shire, Middle Earth',
    emailAddress:'merry@shire.com'
  }
];

export class ApplicantsAPILocal implements IApplicantsAPI {

  getApplicantsList(): Promise<Applicant[]>{
    return new Promise(resolve => {
      setTimeout(() => {
        const results = applicants.map(x =>  { return {
          id:x.id,
          age: x.age,
          hired: x.hired,
          name: x.name,
          familyName: x.familyName,
          countryOfOrigin: x.countryOfOrigin,
          address: x.address,
          emailAddress: x.emailAddress
        }});

        resolve(results);
      }, latency);
    });
  }

  getApplicantDetails(id: number): Promise<Applicant>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const found = applicants.filter(x => x.id == id)[0];
          resolve(JSON.parse(JSON.stringify(found)));
        } catch (error) {
          reject(error);
        }
      }, latency);
    });
  }

  updateApplicant(id: number, applicant: Applicant): Promise<Applicant>{
    return new Promise(resolve => {
      setTimeout(() => {
        const instance = JSON.parse(JSON.stringify(applicant));
        instance.id = id;
        const found = applicants.filter(x => x.id == id)[0];

        if(found){
          const index = applicants.indexOf(found);
          applicants[index] = instance;
        }else{
          instance.id = getId();
          applicants.push(instance);
        }
        resolve(instance);
      }, latency);
    });
  }

  createApplicant(applicant: Applicant): Promise<string>{
    return new Promise(resolve => {
      setTimeout(() => {
        const instance = JSON.parse(JSON.stringify(applicant));
        const found = applicants.filter(x => x.id == applicant.id)[0];

        if(found){
          const index = applicants.indexOf(found);
          applicants[index] = instance;
        }else{
          instance.id = getId();
          applicants.push(instance);
        }
        resolve(`/applicant/${ instance.id }`);
      }, latency);
    });
  }

  deleteApplicant(id: number) :Promise<Applicant>{
    return new Promise(resolve => {
      setTimeout(() => {
        const found = applicants.filter(x => x.id == id)[0];

        if(found){
          const index = applicants.indexOf(found);
          const instance = applicants[index];
          applicants.splice(index, 1);
          resolve(instance);
        }else{
          resolve(null);
        }
        
      }, latency);
    });
  }
}
