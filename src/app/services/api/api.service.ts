import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import '../rxjs-extensions';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: Headers;
  private serverUrl: string = environment.apiUrl;
  private serverUrl1: string = environment.apiUrl1;

  constructor(private http: Http, private httpClient: HttpClient) {
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
  }

  /*
  private handleError(error: any, apiObj: any): any {
    console.log('handleError: ', error);
    return;
  }
  */

  public get(endpoint: string, params: any = {}): any {
    return this.http.get(this.serverUrl + endpoint + '?' + this.serialize(params), { headers: this.headers }).toPromise();
  }
  
  public post(endpoint: string, obj: any): any {
    return this.http.post(this.serverUrl + endpoint, JSON.stringify(obj), { headers: this.headers }).toPromise();
  }
  
  public delete(endpoint: string, obj: any): any {
    return this.http.delete(this.serverUrl + endpoint, new RequestOptions({body: obj})).toPromise();
  }
  
  public get1(endpoint: string, params: any = {}, additionHeaderParam: any = ''): any {
    let httpOptions;
    if(additionHeaderParam) {
      this.headers.append('Authorization', 'Bearer ' + additionHeaderParam);
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + additionHeaderParam
        }),
        observe: 'response'
      };
    }
  
    return this.httpClient.get(this.serverUrl1 + endpoint + '?' + this.serialize(params), httpOptions);
  }
  
  public post1(endpoint: string, obj: any): any {
    return this.http.post(this.serverUrl1 + endpoint, JSON.stringify(obj), { headers: this.headers }).toPromise();
  }
  
  public delete1(endpoint: string, obj: any): any {
    return this.http.delete(this.serverUrl1 + endpoint, new RequestOptions({body: obj})).toPromise();
  }
  
  private serialize(obj: any): string {
    var str = [];
    for(var p in obj)
      if(obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }  
}
