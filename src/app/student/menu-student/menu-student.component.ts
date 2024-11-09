import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_BASE_URL } from '../../constants';

interface Data {
  id: number;
  food_category: string;
  date: string;
  menu: string;
  food_wastage: string;
}


@Component({
  selector: 'app-menu-student',
  standalone: false,
  templateUrl: './menu-student.component.html',
  styleUrls: ['./menu-student.component.css']
})
export class MenuStudentComponent implements OnInit {

  breakfastMenu: string | null = "-";
  lunchMenu: string | null = "-";
  snacksMenu: string | null = "-";
  dinnerMenu: string | null = "-";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const dateToSend = new Date();
    this.getYesterdayWastageData(dateToSend);
  }

  getYesterdayWastageData(date: Date) {
    // Format the date to YYYY-MM-DD
    const formattedDate = this.formateDate(date);
    const params = new HttpParams().set('date', formattedDate);

    // API CALL
    this.http.get<{ data: Data[] }>(API_BASE_URL + 'menu/foodmenu/search_by_date/', {
      params,
      observe: 'response'
    }).subscribe({
      next: (response) => {
        if (response.body && response.body.data) {
          this.assignMenu(response.body.data);
          // console.log('Breakfast: ', this.breakfastMenu);
          // console.log('Lunch: ', this.lunchMenu);
          // console.log('Snacks: ', this.snacksMenu);
          // console.log('Dinner: ', this.dinnerMenu);
        }
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
      }
    });
  }


  assignMenu(data: Data[]) {
    data.forEach(item => {
      if (item.food_category === 'breakfast') {
        this.breakfastMenu = item.menu;
      } else if (item.food_category === 'lunch') {
        this.lunchMenu = item.menu;
      } else if (item.food_category === 'snacks') {
        this.snacksMenu = item.menu;
      } else if (item.food_category === 'dinner') {
        this.dinnerMenu = item.menu;
      }
    });
  }




  // Helper method to format date to YYYY-MM-DD for wastage API
  formateDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2); // Pad single digits with zero
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Return formatted date
  }


}
