// all constants
export const INDEXED_DB_USERS_STORE_NAME = 'users'
export const INDEXED_DB_USERS_STORE_KEY_FIELD = 'roll_no'
export const INDEXED_DB_LOG_ENTRY_STORE_NAME = 'local_log_entry'
export const API_BASE_URL = 'https://192.168.0.104:8000/'

export const LS_USERS_LAST_SYNC_TIME_KEY = 'last_sync_time_users'
export const LS_LOG_ENTRY_LAST_SYNC_TIME_KEY = 'last_sync_time_log_entry'


export enum FoodCategory {
    BREAKFAST = "Breakfast",
    LUNCH = "Lunch",
    SNACKS = "Snacks",
    DINNER = "Dinner",
    NA = "NA"
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