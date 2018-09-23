import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'

declare var $: any;

export class ErrorHandler {
  static handleError (error: Response | any) {
    let errorMessage: string
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }
    $.notify({ message: errorMessage }, { type: 'danger'});
    return Observable.throw(errorMessage);
  }
}
