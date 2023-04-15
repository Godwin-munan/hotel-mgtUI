import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api-service.service';
import { Job } from 'core/model/job';
import { JobEndPoints } from 'shared/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _jobList$ = new BehaviorSubject<Job[]>([])

  
  jobList$ = this._jobList$.asObservable();

  constructor(private _apiService: ApiService) { }

  getJobList(){
    this._apiService.get<Job[]>(JobEndPoints.GET_JOB).subscribe({
      next: response => {
        this._jobList$.next(response.data);
        localStorage.setItem('job', JSON.stringify(response.data));
      },
      error: error => {

      }
    })
  }

  jobStorageState(state: boolean){
    if(!state) return;
    let job  = this.jobFromStorage;
    this._jobList$.next(JSON.parse(job) as Job[]);
  }

  findStorageJobById(id: number): Job{
    let job = this.jobFromStorage;
    let _job = (JSON.parse(job) as Job[]).find((job: Job )=> job.id === id);
    return _job as Job;
  }

  get jobFromStorage(): string{
    return localStorage.getItem('job') as string;
  }
}
