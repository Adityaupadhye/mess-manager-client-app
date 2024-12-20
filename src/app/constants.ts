// import { environment } from "../environments/environment.development"
import { environment } from './../environments/environment';

// all constants
export const INDEXED_DB_USERS_STORE_NAME = 'users'
export const INDEXED_DB_USERS_STORE_KEY_FIELD = 'roll_no'
export const INDEXED_DB_LOG_ENTRY_STORE_NAME = 'local_log_entry'
// export const API_BASE_URL = 'http://10.129.131.148:8080/'
export const API_BASE_URL = environment.apiBaseUrl

export const LS_USERS_LAST_SYNC_TIME_KEY = 'last_sync_time_users'
export const LS_LOG_ENTRY_LAST_SYNC_TIME_KEY = 'last_sync_time_log_entry'


export enum FoodCategory {
    BREAKFAST = "breakfast",
    LUNCH = "lunch",
    SNACKS = "snacks",
    DINNER = "dinner",
    // NA = "NA"
}

export enum PersonType {
    STUDENT,
    GUEST,
    STAFF
}

export enum Role {
    ADMIN = "admin",
    STUDENT = "student",
    EMPLOYEE = "employee"
}