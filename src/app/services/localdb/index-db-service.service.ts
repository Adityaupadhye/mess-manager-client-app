import { Injectable } from '@angular/core';
import { Key, NgxIndexedDBService } from 'ngx-indexed-db';

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
        console.error('error in indexed db add: ', error, error.target.error);
      }
    });
  }
  
  getRecords(storeName: string) {
    return this.dbService.getAll(storeName)
  }

  getRecordByKey(storeName: string, key: any) {
    return this.dbService.getByKey(storeName, key)
  }

  getRecordByIndex(storeName: string, indexName: string, key: any) {
    return this.dbService.getAllByIndex(storeName, indexName, key)
  }

  deleteRecords(storeName: string, keys: Key[]) {

    return this.dbService.bulkDelete(storeName, keys);

  }

  /**
   * deletes all entries from the indexed db store
   * @param storeName name of indexed db table
   * @returns observable
   */
  clearStore(storeName: string) {
    return this.dbService.clear(storeName);
  }

  countFoodCategories(storeName: string): Promise<{ [key: string]: number }> {
    return new Promise((resolve, reject) => {
      const counts = {
        breakfast: 0,
        lunch: 0,
        snacks: 0,
        dinner: 0,
      };

      this.dbService.getAll(storeName).subscribe({
        next: (records: any[]) => {
          records.forEach(record => {
            const category = record.food_category as keyof typeof counts;
            if (counts[category] !== undefined) {
              counts[category]++;
            }
          });
          resolve(counts);
        },
        error: (error: any) => {
          console.error('Error counting food categories:', error);
          reject(error);
        }
      });
    });
  }
}
