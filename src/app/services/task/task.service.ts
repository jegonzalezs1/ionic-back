import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITarea } from 'src/app/interface/ITarea';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  urlApp = environment.urlAddress;
  urlApi = 'task';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<ITarea[]> {
    return this.http.get<ITarea[]>(`${this.urlApp}${this.urlApi}`);
  }

  updateTask(id: number, data: Partial<ITarea>): Observable<ITarea> {
    return this.http.patch<ITarea>(`${this.urlApp}${this.urlApi}/${id}`, data);
  }
}
