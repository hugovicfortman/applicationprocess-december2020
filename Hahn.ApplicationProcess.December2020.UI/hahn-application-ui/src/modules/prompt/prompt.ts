import { autoinject } from 'aurelia-framework';
import { DialogController, DialogService } from 'aurelia-dialog';
import './prompt.css';
  
@autoinject
export class Prompt {

  private prompt =  <IPrompt>{};

  constructor(private ct: DialogController, 
    private ds: DialogService){}
  
  activate(prompt: IPrompt): void{
    this.prompt.isDialog = prompt.isDialog;
    this.prompt.title = prompt.title;
    this.prompt.message = prompt.message;
    this.prompt.no = prompt.no;
    this.prompt.yes = prompt.yes;
    console.log(prompt);
  }


  /**
   * Returns a Promise<boolean> which can resolve to true or false if the user clicks 
   * yes or no respectively
   * @param message Message to be displayed to user
   * @param param1 Optional properties including title and a string identifier for yes 
   * and no responses
   */

  confirm(message: string, { title, strYes, strNo } = { title: "Confirm", strYes: "Yes", strNo: "No" }) : Promise<boolean> {
    return new Promise((resolve) =>
    this.ds.open({ viewModel: Prompt, model: {
      isDialog: true,
      title: title,
      message: message,
      no: strNo,
      yes: strYes
    }, lock: false }).whenClosed(response => resolve(!response.wasCancelled)));
  }

  /**
   * 
   * Returns a Promise<boolean> which resolves to true when the user clicks ok or exits
   * @param message Message to be displayed to user
   * @param param1 Optional properties including title and a string identifier for yes
   */
  alert(message: string, { title, strYes } = { title: "Message", strYes: "OK" }) : Promise<boolean>{
    return new Promise((resolve) => 
    this.ds.open({ viewModel: Prompt, model: {
      isDialog: false,
      title: title,
      message: message,
      no: null,
      yes: strYes
    }, lock: false }).whenClosed(response => resolve(true)));
  }

}

export interface IPrompt {
  isDialog:boolean;
  title:string;
  message:string;
  no:string;
  yes:string;
}
