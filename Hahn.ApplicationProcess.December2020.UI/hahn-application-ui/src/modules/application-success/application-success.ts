
export class ApplicationSuccess {
  heading = "Success";
  message = "Application was successfully submitted";
  call1 = "View Application";
  call2 = "Submit Another Application";

  public id: number;
  public viewReady: boolean = false;

  activate(params)
  {
    this.id = params.id;
  }
}
