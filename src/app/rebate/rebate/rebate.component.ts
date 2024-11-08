import { Component, OnInit } from '@angular/core';
import { API_BASE_URL } from '../../constants';
import { HttpClient, HttpParams } from '@angular/common/http';


interface UserDetails {
  hostel: string;

}

@Component({
  selector: 'app-rebate',
  standalone: false,

  templateUrl: './rebate.component.html',
  styleUrl: './rebate.component.css'
})
export class RebateComponent {
  userDetails: UserDetails | null = null;
  todayDate: string = '';
  rebateData: any[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.loadUserDetails(); 
    this.formatDate();
    this.getrebates();
  }

  getrebates() {
    this.http.get(API_BASE_URL+ 'rebates/?status=pending', {
      observe: 'response'
    }).subscribe({
      next: (response: any) => {
        this.rebateData = response.body;
        console.log("Rebate",this.rebateData);
      },
      error: (error) => {
        console.error("Error fetching rebates:", error);
      }
    });
  }

  // Update Status yo Active
  updateRebateStatus(id: number, newStatus: string) {
    const url = `${API_BASE_URL}rebates/${id}/`;
    const updateData = { status: newStatus };

    this.http.patch(url, updateData).subscribe({
      next: (response) => {
        console.log("Status updated successfully:", response);
        
        // Update the local data to reflect the change
        const rebate = this.rebateData.find(r => r.id === id);
        if (rebate) {
          rebate.status = newStatus;
        }
      },
      error: (error) => {
        console.error("Error updating status:", error);
      }
    });
  }

  private loadUserDetails() {
    const storedUserDetails: string | null = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      this.userDetails = JSON.parse(storedUserDetails);
      
      // console.log('User Hostel:', this.userDetails?.hostel);
    }
  }

  private formatDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Two-digit day
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[today.getMonth()]; // Month abbreviation
    const year = today.getFullYear(); // Full year
  
    this.todayDate= `${day}-${month}-${year}`; // Format as dd-mmm-yyyy
  }

}
