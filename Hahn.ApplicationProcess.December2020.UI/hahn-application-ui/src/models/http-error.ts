const _descriptions = {
  400: "This request was not properly formed",
  401: "Access to this resource was denied",
  404: "The url was not Found",
  500: "An internal server error occured"
};

export class HttpError implements Error {
  name = "HttpError";
  stack?: string;
  status: number;
  details: string;

  constructor(r: Response)
  {
    this.status = r.status;
    r.text().then(d => this.details = d)
    .catch(e => this.details = e);
  }

  get message(): string {
    if(_descriptions[this.status])
    {
      return _descriptions[this.status];
    }
    return "An unknown error occured";
  }

}
