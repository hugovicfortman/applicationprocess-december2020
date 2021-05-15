import { HttpError } from './../models/http-error';
import { HttpClient, json } from 'aurelia-fetch-client';

const httpClient = new HttpClient();

// .NETCORE configuration will be used here...

httpClient.configure(config => {
  config
    .useStandardConfiguration()
    // .withBaseUrl('api/')
    // .withDefaults({
    //   credentials: 'same-origin',
    //   headers: {
    //     'X-Requested-With': 'Fetch'
    //   }
    // })
    .withInterceptor({
      // request(request) {
      //   let authHeader = fakeAuthService.getAuthHeaderValue(request.url);
      //   request.headers.append('Authorization', authHeader);
      //   return request;
      // },
      responseError(responseError) {
        throw new HttpError(responseError);
      }
    });
  });

export class WebAPI {

  private throwError() {
    throw new Error('Trololo');
  }

  get<T>(url: string, { body } = { body: undefined }): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        if (body) {
          let i = 0;
          for (const part in body) {
            url += `${(i == 0) ? '?' : '&'}${part}=${body[part]}`;
            i++;
          }
        }
        
        httpClient
          .fetch(url, {
            method: 'get'
          })
          .then(response => response.json())
          .then(obj => <T>obj)
          .then(res => resolve(res))
          .catch(err => {
              reject(err);
          });
      } catch (error) {
        console.log('got here');
        reject(error);
      }
    });
  }

  post<T>(url: string, { body }): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        httpClient
          .fetch(url, {
            method: 'post',
            body: json(body)
          })
          .then(response => response.json())
          .then(obj => <T>obj)
          .then(res => resolve(res))
          .catch(err => {
              reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  put<T>(url: string, { body }): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        httpClient
          .fetch(url, {
            method: 'post',
            body: json(body)
          })
          .then(response => response.json())
          .then(obj => <T>obj)
          .then(res => resolve(res))
          .catch(err => {
              reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  delete<T>(url: string, { body }): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        httpClient
          .fetch(url, {
            method: 'delete',
            body: json(body)
          })
          .then(response => response.json())
          .then(obj => <T>obj)
          .then(res => resolve(res))
          .catch(err => {
              reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

}
