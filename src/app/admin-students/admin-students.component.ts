import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_BASE_URL } from '../constants';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrl: './admin-students.component.css'
})
export class AdminStudentsComponent {

  constructor(private http: HttpClient) { }

  newStudent = {
    name: "",
    roll: "",
    hostel: "",
    photo: ""
  };


  students: any[] = [];
  selectedFile: any | null = null;
  searchQuery = "";
  selectedHostelFilter = "";
  error: string = '';

  uploadProfilePic(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.newStudent.photo = reader.result as string);
    reader.readAsDataURL(file);
  }

  addStudent() {
    this.students.push({ ...this.newStudent });
    this.newStudent = { name: "", roll: "", hostel: "", photo: "" };
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      this.selectedFile = file;
    } else {
      alert('Please select a valid .csv file.');
      event.target.value = '';
    }
  }

  uploadBulkStudents() {
    if (!this.selectedFile) {
      this.error = "Please select a file!";
      return;
    }
    // Create FormData object
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    // Send POST request
    this.http.post(API_BASE_URL+'users/bulk_students/', formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }


  filteredStudents() {
    return this.students.filter(s => {
      const matchesSearch =
        s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesHostel =
        !this.selectedHostelFilter || s.hostel === this.selectedHostelFilter;

      return matchesSearch && matchesHostel;
    });
  }

  // editStudent(s: any) {
  //   this.editingStudent = { ...s };
  // }

  // saveEdit() {
  //   const index = this.students.findIndex(x => x.roll === this.editingStudent.roll);
  //   this.students[index] = { ...this.editingStudent };
  //   this.editingStudent = null;
  // }

  // deleteStudent(s: any) {
  //   this.students = this.students.filter(x => x !== s);
  // }

  // cancelEdit() {
  //   this.editingStudent = null;
  // }

}
