import { FoodCategory, PersonType } from "../constants";

export interface LogEntry {
    roll_no: string,
    food_category: FoodCategory,
    timestamp: number,
    person_type: PersonType,
}