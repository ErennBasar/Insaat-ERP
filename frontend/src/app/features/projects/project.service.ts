import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: string;
  name: string;
  type: string;
  client: string;
  manager: string;
  location: string;
  contractValue: number;
  remainingValue: number;
  progress: number;
  endDate: string;
  profit: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5277/api/Projects';

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  createProject(projectData: any): Observable<string> {
    return this.http.post<string>(this.apiUrl, projectData);
  }

  updateProgress(updateData: { id: string, newProgress: number, newStatus: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-progress`, updateData);
  }

}
