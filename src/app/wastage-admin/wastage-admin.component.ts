import { Component } from '@angular/core';

@Component({
  selector: 'app-wastage-admin',
  templateUrl: './wastage-admin.component.html',
  styleUrl: './wastage-admin.component.css'
})
export class WastageAdminComponent {

  selectedDate: string = '';

  mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  mealTimes: any = {
    breakfast: "7:30 AM – 9:45 AM",
    lunch: "12:30 PM – 2:15 PM",
    snacks: "4:30 PM – 6:15 PM",
    dinner: "7:30 PM – 9:45 PM",
  };

  wastageData: any = {
    breakfast: { category: '', kg: '', reason: '', image: null },
    lunch: { category: '', kg: '', reason: '', image: null },
    snacks: { category: '', kg: '', reason: '', image: null },
    dinner: { category: '', kg: '', reason: '', image: null },
  };

  wastageLogs = [];
  summary = {
    total: 0,
    avg: 0,
    highest: { day: "-", value: 0 }
  };

  onFileUpload(event: any, meal: string) {
    this.wastageData[meal].image = event.target.files[0];
  }

  saveMealWastage(meal: string) {
    console.log("Saved", meal, this.wastageData[meal]);
  }

}
