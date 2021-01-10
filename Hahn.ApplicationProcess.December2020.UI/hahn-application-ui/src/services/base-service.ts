export class BaseService {
  
  handleError<T>(whenTryingTo: string, err: Error): T
  {
    console.log(`${ err.name } occured when trying to ${ whenTryingTo }: ${ err.message }`);
    return <T>{};
  }
}
