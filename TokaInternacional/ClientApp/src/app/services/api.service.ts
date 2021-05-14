import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const URL='';
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  headers: any;
  headersFile = new HttpHeaders({});

  constructor(
    private http: HttpClient
  ) { }
  setToken(token) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
  get(endpoint: string, params?: any): any {
    const options = { headers: this.headers };

    if (params) {
      let paramsLocal = new HttpParams();
      Object.keys(params).forEach((k) => {
        paramsLocal = paramsLocal.append(k, params[k]);
      });

      // tslint:disable-next-line:no-string-literal
      options['params'] = paramsLocal;

    }
    return this.http.get(URL + '/' + endpoint, options);
  }
  post(endpoint: string, body: any) {
    const options = { headers: this.headers };
    return this.http.post(URL, body, options);
  }

  put(endpoint: string, body: any) {
    const options = { headers: this.headers };
    return this.http.put(URL + '/' + endpoint, body, options);
  }

  delete(endpoint: string) {
    const options = { headers: this.headers };
    return this.http.delete(URL + '/' + endpoint, options);
  }

  getStream(endpoint: string) {
    return this.http.get(URL + '/' + endpoint, { headers: this.headers, responseType: 'blob' });
  }

  putFile(endpoint: string, body: any) {
    const options = { headers: this.headersFile };
    return this.http.put(URL + '/' + endpoint, body, options);
  }
}
