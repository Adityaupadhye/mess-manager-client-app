import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class IndexDbServiceService {

  // private dbService = inject(NgxIndexedDBService)

  constructor(private dbService: NgxIndexedDBService) { }

  addRecord(storeName: string, data: any) {

    this.dbService.add(storeName, data)
    .subscribe({
      next: (key) => {
        console.log('data added with key: ', key);
      },
      error: (error: any) => {
        console.error('error in indexed db add: ', error);
      }
    });
  }
  
  getRecords(storeName: string) {
    return this.dbService.getAll(storeName)
  }

  getRecordByKey(storeName: string, key: any) {
    return this.dbService.getByKey(storeName, key)
  }

}
