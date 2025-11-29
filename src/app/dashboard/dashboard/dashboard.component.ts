import { Component, OnInit } from '@angular/core';
import { IndexDbServiceService } from '../../services/localdb/index-db-service.service';
interface UserDetails {
  hostel: string;

}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: { number: string; description: string }[] = [];
  userDetails: UserDetails | null = null;
  todayDate: string = '';

  constructor(private indexDbService: IndexDbServiceService) {}

  ngOnInit() {
    this.loadUserDetails(); 
    this.loadStats();
    this.formatDate();
  }

  private loadUserDetails() {
    const storedUserDetails: string | null = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      this.userDetails = JSON.parse(storedUserDetails);
      
      // console.log('User Hostel:', this.userDetails?.hostel);
    }
  }

  private loadStats() {
    this.indexDbService.countFoodCategories('local_log_entry').then(counts => {
      this.stats = [
        { number: counts['breakfast'] ? counts['breakfast'].toString() : '0', description: 'Breakfast' },
        { number: counts['lunch'] ? counts['lunch'].toString() : '0', description: 'Lunch' },
        { number: counts['snacks'] ? counts['snacks'].toString() : '0', description: 'Snacks' },
        { number: counts['dinner'] ? counts['dinner'].toString() : '0', description: 'Dinner' },
        { number: counts['milk'] ? counts['milk'].toString() : '0', description: 'Milk' }
      ];
    }).catch(error => {
      console.error('Error loading food category counts:', error);
      this.stats = [
        { number: '0', description: 'Breakfast' },
        { number: '0', description: 'Lunch' },
        { number: '0', description: 'Snacks' },
        { number: '0', description: 'Dinner' },
        { number: '0', description: 'Milk' }
      ];
    });
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
