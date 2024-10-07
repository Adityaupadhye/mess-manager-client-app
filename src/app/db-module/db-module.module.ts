import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { INDEXED_DB_LOG_ENTRY_STORE_NAME, INDEXED_DB_USERS_STORE_NAME } from '../constants';


const dbConfig: DBConfig = {
  name: 'local_db_instance',
  version: 1,
  objectStoresMeta: [
    {
      store: INDEXED_DB_USERS_STORE_NAME,
      storeConfig: { keyPath: 'roll_no', autoIncrement: false },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'roll_no', keypath: 'roll_no', options: { unique: true } }, // Make roll_no unique
        { name: 'hostel', keypath: 'hostel', options: { unique: false } },
        { name: 'role', keypath: 'role', options: { unique: false } }
      ]
    },
    {
      store: INDEXED_DB_LOG_ENTRY_STORE_NAME,
      storeConfig: { keyPath: 'timestamp', autoIncrement: false },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'food_category', keypath: 'food_category', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
        { name: 'person_type', keypath: 'person_type', options: { unique: false } }
      ]
    }
  ]
};


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ]
})
export class DbModuleModule { }
