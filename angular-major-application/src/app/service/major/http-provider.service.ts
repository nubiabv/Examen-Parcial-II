import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8080";

var httpLink = {
  getAllMajor: apiUrl + "/api/majors/getAllMajors",
  saveMajor: apiUrl + "/api/majors/saveMajor",
  deleteMajorById: apiUrl + "/api/majors/deleted",
  getMajorDetailById: apiUrl + "/api/majors/getMajor"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllMajor(): Observable<any> {
    return this.webApiService.get(httpLink.getAllMajor);
  }

  public saveMajor(major: any): Observable<any> {
    return this.webApiService.post(httpLink.saveMajor, major);
  }


  public deleteMajorById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteMajorById + '/' + model, "");
  }

  public getMajorDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getMajorDetailById + '/' + model);
  }
}
