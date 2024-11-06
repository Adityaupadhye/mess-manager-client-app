import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

interface UserDetails {
  hostel: string;
  roll_no: string;

}

@Component({
  selector: 'app-rebate-student',
  templateUrl: './rebate-student.component.html',
  styleUrls: ['./rebate-student.component.css'],
})
export class RebateStudentComponent implements OnInit {
  range: FormGroup;
  duration: number;
  userDetails: UserDetails | null = null;

  constructor() {
    this.range = new FormGroup({
      start: new FormControl(null, [Validators.required, this.minDateValidator]),
      end: new FormControl(null, [Validators.required]),
      reason: new FormControl('', [Validators.maxLength(500)]), // optional reason field
    });
  }

  ngOnInit() {
    this.loadUserDetails();
  }

  private loadUserDetails() {
    const storedUserDetails: string | null = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      this.userDetails = JSON.parse(storedUserDetails);


    }
  }

  // Custom Validator to ensure the Start Date is at least 2 days after the current date
  minDateValidator(control: FormControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    currentDate.setDate(currentDate.getDate() + 2); // Add 2 days

    return selectedDate >= currentDate ? null : { minDate: true };
  }

  calculateDuration(): void {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = end.getTime() - start.getTime();
      this.duration = (timeDiff / (1000 * 3600 * 24)) + 1; // Convert milliseconds to days
    }
  }


  // Triggered when the start date is selected
  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.calculateDuration();
  }

  // Triggered when the end date is selected
  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    this.calculateDuration();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Calculate the duration between start and end date

  submitRebate() {
    if (this.range.valid) {
      const start = this.range.get('start')?.value;
      const end = this.range.get('end')?.value;
      const reason = this.range.get('reason')?.value;

      if (this.duration > 2 && this.duration < 16) {

        console.log('Rebate Request Submitted!');
        console.log(`Start Date: ${this.formatDate(start)}`);
        console.log(`End Date: ${this.formatDate(end)}`);
        console.log(`Duration: ${this.duration} days`);
        console.log('User Hostel:', this.userDetails?.hostel);
        console.log('User Roll Number:', this.userDetails?.roll_no);
      }
    } else {
      console.log('Form is invalid!');
    }
  }
}
