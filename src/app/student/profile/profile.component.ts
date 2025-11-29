import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_BASE_URL } from '../../constants';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',

})
export class ProfileComponent {

  constructor(private http: HttpClient) { }

  name: string = '';
  roll_no: string = '';
  hostel: string = '';
  role: string = '';

  studentData: any = {};
  studentJsonString: string = '';
  ngOnInit() {
    const savedUserDetails = localStorage.getItem('userDetails');
    if (savedUserDetails) {
      const userDetails = JSON.parse(savedUserDetails);
      this.name = userDetails['name'];
      this.roll_no = userDetails['roll_no'];
      this.hostel = userDetails['hostel'];
      this.role = userDetails['role']
    }

    this.studentData = {
      name: this.name,
      hostel: this.hostel,
      roll_no: this.roll_no,
      role: this.role
    };
    this.studentJsonString = JSON.stringify(this.studentData);
  }

  selectedFile: File | null = null;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log("File selected : ", this.selectedFile);
    }
    this.updatedProfilePic();
  }

  updatedProfilePic() {
    if (!this.selectedFile) return;
    const formData = new FormData(); //Required for file uploads
    formData.append('file', this.selectedFile);
    this.http.post(API_BASE_URL + 'updateprofilepic/', formData)
      .subscribe({
        next: (res) => console.log('Upload success', res),
        error: (err) => console.error('Upload error', err)
      });
  }


  isFeedbackModalOpen = false;
  isRatingModalOpen = false;

  // Feedback text
  feedbackText: string = '';
  rating: number = 0;
  stars = [1, 2, 3, 4, 5];
  feedbackMessage : string ="";
  ratingMessage : string = "";

  // Feedback Modal
  openFeedbackModal() {
    this.isFeedbackModalOpen = true;
  }

  closeFeedbackModal() {
    this.isFeedbackModalOpen = false;
  }

  submitFeedback() {
    if (!this.feedbackText.trim()) {
      alert('Feedback cannot be empty!');
      return;
    }
    const payload = { feedback: this.feedbackText.trim() };

    this.http.post(API_BASE_URL + 'feedback/', payload,{
      observe: 'response'
    }).subscribe({
      next: (response: any) => {
        this.feedbackMessage = response.body;
        console.log(response);
      },
      error: (error) => {
        alert("Error submitting feedback: " + error);
      }
    });
    this.closeFeedbackModal();
  }

  // Rating Modal 
  openRatingModal() {
    this.isRatingModalOpen = true;
  }

  closeRatingModal() {
    this.isRatingModalOpen = false;
  }

  setRating(value: number) {
    this.rating = value;
  }

  submitRating() {
    if (this.rating < 1 || this.rating > 5) {
      alert('Please select a rating between 1 and 5 stars.');
      return;
    }
    const payload = { rating: this.rating };

    this.http.post(API_BASE_URL + 'rating/',payload,{
      observe: 'response'
    }).subscribe({
      next: (response: any) => {
        this.ratingMessage = response.body;
        console.log(response);

      },
      error: (error) => {
        alert("Error submitting rating:" +  error);
      }
    });
    this.closeRatingModal();
  }

  refreshQR() {
    console.log("Refresh QR clicked")
  }
}
