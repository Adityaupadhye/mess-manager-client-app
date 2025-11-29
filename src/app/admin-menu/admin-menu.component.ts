import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class MenuAdminComponent {

  days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  meals = ['breakfast', 'lunch', 'snacks', 'dinner'];
  
  //finding today's day
  weekMenu: any[] = [];
  // dayNumber = new Date().getDay(); // e.g., 1 for Monday 
  selectedDay: any |null = null;
  mondayDate: string;

  constructor(
    private http: HttpClient,
    private menuservice: MenuService,
  ) {
    const today = new Date();
    const dayNumber = new Date().getDay(); // e.g., 1 for Monday 
    this.selectedDay=this.days[dayNumber-1];

    const monday = new Date(today);
    monday.setDate(today.getDate()-6 - ((today.getDay() + 6) % 7));
    this.mondayDate = monday.toISOString().slice(0, 10);  // YYYY-MM-DD
  }

  ngOnInit():void {
    this.menuservice.weekly_menu(this.mondayDate).subscribe({
      next: (res: any[]) => {
        this.weekMenu = res;
        // set default selected day = Monday (or first element)
        if (this.weekMenu.length > 0) {
          this.selectedDay = this.weekMenu[0];
        }
        console.log("Weekly Menu:", this.weekMenu);
      },
      error: (err) => {
        console.error('Weekly Menu API Error:', err);
      }
    });
  }

  selectDay(day: any) {
    this.selectedDay = day;
  }

  selectedFile: File | null = null;
  message = "";
  error = "";

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      this.selectedFile = file;
    } else {
      alert('Please select a valid .csv file.');
      event.target.value = '';
    }
  }

  uploadMenu() {
    if (!this.selectedFile) {
      this.error = "Please select a file!";
      return;
    }

    this.menuservice.uploadExcel(this.selectedFile).subscribe({
      next: () => {
        console.log("inside next")
        this.message = "Menu uploaded successfully!";
        this.error = "";
      },
      error: () => {
        console.log("some eroor occured.")
        this.error = "Upload failed!";
      }
    })
  }
}



