import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient} from '@angular/common/http';
import { API_BASE_URL } from '../../constants';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  studentRebateDataHistory: any[] = [];
  isStartDateInvalid: boolean = false; //assuming it is valid

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.range = new FormGroup({
      start: new FormControl(null, [Validators.required, this.minDateValidator]),
      end: new FormControl(null, [Validators.required]),
      reason: new FormControl('', [Validators.maxLength(500)]), // optional reason field
    });
  }

  ngOnInit() {
    this.loadUserDetails();
    this.getrebateHistory();
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

      //check if start is valid?
      const minValidStartDate = new Date();
      minValidStartDate.setDate(minValidStartDate.getDate() + 2);
      this.isStartDateInvalid = start < minValidStartDate

      const timeDifference = end.getTime() - start.getTime();
      this.duration = (timeDifference / (1000 * 3600 * 24)) + 1; // Convert milliseconds to days
    } else {
      this.isStartDateInvalid = false;
    }
  }


  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.calculateDuration();
  }

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

      if (this.duration > 2 && this.duration < 16 && !this.isStartDateInvalid) {

        console.log('Rebate Request Submitted!');
        const rebateData = {
          start_date: this.formatDate(start),
          end_date: this.formatDate(end),
          duration: this.duration,
          hostel: this.userDetails?.hostel,
          roll_no: this.userDetails?.roll_no
        };
        // console.log('Rebate Data:', JSON.stringify(rebateData, null, 2));
        // Make API request to submit the rebate request

        this.http.post(API_BASE_URL + 'rebates/', rebateData).subscribe(
          (response) => {
            this.getrebateHistory();
            console.log('Rebate request submitted successfully:', response);
            this.snackBar.open('Rebate request submitted successfully!', 'Close', {
              duration: 5000, // Duration in milliseconds
              verticalPosition: 'top', 
              horizontalPosition: 'center' // Position can be 'start', 'center', 'end', 'left' or 'right'
            });
          },
          (error) => {
            console.log('Error:', error);
            this.snackBar.open('Already a pending request', 'Close', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        );
      }
    } else {
      console.log('Form is invalid!');
    }
  }

  // Show previous rebates
  getrebateHistory(){
    this.http.get(API_BASE_URL+ `rebates/?roll_no=${this.userDetails?.roll_no}`, {
      observe: 'response'
    }).subscribe({
      next: (response: any) => {
        this.studentRebateDataHistory = response.body;
        console.log("History", this.studentRebateDataHistory);
      },
      error: (error) => {
        console.error("Error History:", error);
      }
    })
  }
}
