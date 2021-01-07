let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let applicants = [
  {
    id:getId(),
    age: 45,
    hired:true,
    name:'Bilbo',
    familyName:'Baggings',
    countryOfOrigin: 'The Shire',
    address:'House 2, Bag End, The Shire, Middle Earth',
    emailAddress:'bilbobaggings@shire.com'
  },
  {
    id:getId(),
    age: 25,
    hired:true,
    name:'Frodo',
    familyName:'Baggings',
    countryOfOrigin: 'The Shire',
    address:'House 2, Bag End, The Shire, Middle Earth',
    emailAddress:'frodobaggings@shire.com'
  },
  {
    id:getId(),
    age: 30,
    hired:true,
    name:'Samwise',
    familyName:'Gamji',
    countryOfOrigin: 'The Shire',
    address:'House 12, Honeysuckle Lane, The Shire, Middle Earth',
    emailAddress:'samwisegamji@shire.com'
  },
  {
    id:getId(),
    age: 22,
    hired:true,
    name:'Peregrin',
    familyName:'Took',
    countryOfOrigin: 'The Shire',
    address:'House 5, Wadsbottom Lane, The Shire, Middle Earth',
    emailAddress:'pippin@shire.com'
  },
  {
    id:getId(),
    age: 22,
    hired:true,
    name:'Merridew',
    familyName:'Maus',
    countryOfOrigin: 'The Shire',
    address:'House 7, Wadsbottom Lane, The Shire, Middle Earth',
    emailAddress:'merry@shire.com'
  }
];

export class WebAPI {
  isRequesting = false;
  
  getApplicantsList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = applicants.map(x =>  { return {
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
        this.isRequesting = false;
      }, latency);
    });
  }

  getApplicantDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = applicants.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveApplicant(applicant){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(applicant));
        let found = applicants.filter(x => x.id == applicant.id)[0];

        if(found){
          let index = applicants.indexOf(found);
          applicants[index] = instance;
        }else{
          instance.id = getId();
          applicants.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }

  createApplicant(applicant){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(applicant));
        let found = applicants.filter(x => x.id == applicant.id)[0];

        if(found){
          let index = applicants.indexOf(found);
          applicants[index] = instance;
        }else{
          instance.id = getId();
          applicants.push(instance);
        }

        this.isRequesting = false;
        resolve(`/applicant/${ instance.id }`);
      }, latency);
    });
  }

  deleteApplicant(applicant){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(applicant));
        let found = applicants.filter(x => x.id == applicant.id)[0];

        if(found){
          let index = applicants.indexOf(found);
          applicants.splice(index, 1);
          resolve(instance);
        }else{
          resolve(null);
        }
        this.isRequesting = false;
      }, latency);
    });
  }
}
