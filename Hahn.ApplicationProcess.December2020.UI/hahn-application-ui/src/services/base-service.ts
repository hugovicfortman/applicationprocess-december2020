import { ErrorOccured } from './messages';
import { EventAggregator } from 'aurelia-event-aggregator';

export class BaseService {

  private _ea: EventAggregator;

  handleError<T>(whenTryingTo: string, err: Error): T
  {
    this.eventAggregator.publish(new ErrorOccured(err));
    console.log(`${ err.name } occured when trying to ${ whenTryingTo }: ${ err.message }`);
    return <T>null;
  }

  setEventAggregator(ea: EventAggregator): void {
    this._ea = ea;
  }

  get eventAggregator(): EventAggregator { return this._ea }
}
