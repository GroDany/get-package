import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';

export interface LoginResponse {
    res: string;
    token: string;
}

export interface CityResponse {
    price: number;
    enName: string;
    heName: string;
}

export interface TimeResponse {
    day: string;
    times: string[];
}

export interface Payload {
    token: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetPackageService {
    url: string = "https://mock-stg.getpackage-dev.com";

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + '/login', { email, password });
  }

  getCities(): Observable<CityResponse[]> {
    return this.http.get<CityResponse[]>(this.url + '/cities');
  }

  getTimes(): Observable<TimeResponse[]> {
    return this.http.get<TimeResponse[]>(this.url + '/times');
  }

  submit(data: Payload): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(data);
    return this.http.post(this.url + '/submit', body, { headers: headers });
  }
}
