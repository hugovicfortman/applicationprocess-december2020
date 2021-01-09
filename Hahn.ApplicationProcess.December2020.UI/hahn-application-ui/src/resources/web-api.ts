import { HttpClient, json } from 'aurelia-fetch-client';

const httpClient = new HttpClient();

// .NETCORE configuration will be used here...

// httpClient.configure(config => {
//   config
//     .useStandardConfiguration()
//     .withBaseUrl('api/')
//     .withDefaults({
//       credentials: 'same-origin',
//       headers: {
//         'X-Requested-With': 'Fetch'
//       }
//     })
//     .withInterceptor({
//       request(request) {
//         let authHeader = fakeAuthService.getAuthHeaderValue(request.url);
//         request.headers.append('Authorization', authHeader);
//         return request;
//       }
//     });
// });


export class WebAPI {
  
  get<T>(url: string, { body = undefined } = {}): Promise<T>
  {
    if(body)
    {
      let i = 0;
      for(let part of body)
      {
        url += `${ (i == 0)? '?': '&' }${ part }=${ body[part] }`;
        i++;
      }
    }
    return httpClient
      .fetch(url, {
        method: 'get'
      })
      .then(response => response.json())
      .then(obj => <T> obj)
      .catch(err => {
        console.log(err);
        throw Error(`WebAPI error: ${err}`);
      });
  }
  
  post<T>(url: string, {body}): Promise<T>
  {
    return httpClient
      .fetch(url, {
        method: 'post',
        body: json(body)
      })
      .then(response => response.json())
      .then(obj => <T> obj)
      .catch(err => {
        console.log(err);
        throw Error(`WebAPI error: ${err}`);
      });
  }

  put<T>(url: string, {body}): Promise<T>
  {
    return httpClient
      .fetch(url, {
        method: 'post',
        body: json(body)
      })
      .then(response => response.json())
      .then(obj => <T> obj)
      .catch(err => {
        console.log(err);
        throw Error(`WebAPI error: ${err}`);
      });
  }

  delete<T>(url: string, {body}): Promise<T>
  {
    return httpClient
      .fetch(url, {
        method: 'delete',
        body: json(body)
      })
      .then(response => response.json())
      .then(obj => <T> obj)
      .catch(err => {
        console.log(err);
        throw Error(`WebAPI error: ${err}`);
      });
  }

}
