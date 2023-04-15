import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HttpResponse } from 'core/utils/http-response';
import { environment } from 'env/environment';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { AppError } from '../global/httpError/app-error';
import { BadRequestError } from '../global/httpError/bad-request-error';
import { NotFoundError } from '../global/httpError/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _errorStatus$ = new BehaviorSubject<boolean>(false)

  private domain: string = environment.domain;
  private http = inject(HttpClient);

  constructor() {
    // this.domain = environment.domain;
   }
   
  get<T>(api: string): Observable<HttpResponse<T>> {
    return this.http.get(`${this.domain}${api}`).pipe(
      map(reponse => reponse as HttpResponse<T>),
      catchError(this.handleError)
    );
  }

  getById<T>(id: number ,api: string) : Observable<HttpResponse<T>> {
    return this.http.get(`${this.domain}${api}${id}`).pipe(
      map(reponse => reponse as HttpResponse<T>)
    );
  }

  getPage<T>(api: string, field: string, page: number, size: number) : Observable<HttpResponse<T>> {
    return this.http.get(`${this.domain}${api}${field}/${page}/${size}`).pipe(
      map(reponse => reponse as HttpResponse<T>)
    );
  }

  add<T>(api: string, data: any ): Observable<HttpResponse<T>> {
    return this.http.post(`${this.domain}${api}`, data).pipe(
      map(reponse => reponse as HttpResponse<T>),
      catchError(this.handleError)
    );
  }

  delete(api: string, id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.domain}${api}${id}`).pipe(
      map(reponse => reponse as HttpResponse<any>),
      catchError(this.handleError)
    )
  }

  update<T>(api: string, data: any): Observable<HttpResponse<T>>{
    return this.http.put(`${this.domain}${api}`, data).pipe(
      map(response => response as HttpResponse<T>),
      catchError(this.handleError)
    )
  }

  private handleError(error: Response){

    if(error.status === 404)
      return throwError(() => new NotFoundError(error));
    

    if(error.status === 400){
      console.log(error?.text);
      return throwError(() => new BadRequestError(error));
    }
      
      
    return throwError(() => new AppError(error));
  

}

}






