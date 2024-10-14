# MessManagerClientApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.
NodeJS version 20.17.0

---

## Overview

The **Mess Management System** is a Django REST API-based project designed to streamline and manage hostel mess activities. By using RFID/QR code to capture student attendance during meals (breakfast, lunch, dinner, etc.), the system records data, which is further analyzed to provide insights and trends, such as weekly meal patterns, the number of attendees per meal, and food preferences.

This project integrates **data analytics** and **visualization** to ensure seamless management of the hostel mess while providing valuable insights into food consumption patterns. 

---

## **Key Features**

- **Student RFID/QR Integration**: Records student attendance for meals in real-time using RFID technology.
- **Meal Tracking**: Track attendance for different meal categories such as breakfast, lunch, and dinner.
- **Data Analytics**: Perform trend analysis on collected data to reveal insights such as:
  - Daily, weekly, and monthly meal attendance patterns.
  - Number of students attending each meal.
  - Most popular meals and student food preferences.
- **Visualization**: Generate charts and graphs to visually represent data trends and send them to the frontend.
- **Secure Login**: Secure login for users with role-based access control (students, mess admins, etc.).
  
---

## **Data Visualization and Analytics**

This project utilizes Python libraries such as **Matplotlib** and **Plotly** to analyze and visualize mess entry data:

- **Meal Attendance**: The system analyzes student attendance at meals and displays visual trends, such as which meals (breakfast, lunch, or dinner) have the highest attendance.
- **Weekly/Monthly Trends**: The system identifies patterns in student attendance over time, enabling mess administrators to make informed decisions on resource management.

These visualizations are generated as PNG images and sent to the frontend for user interaction.

---

## **How It Works**

1. **User Registration & Login**:
   - Users (students and admins) can log in securely to the system via the provided API. Their roles are stored in the user model, allowing for customized access to the data.

2. **RFID/QR Data Entry**:
   - When a student scans their RFID card/QR code, their attendance is recorded in the `Foodlog` model. This entry includes the roll number, meal category, timestamp, and role (student/admin).

3. **Data Analysis**:
   - Using collected data, admins can request analysis results, which are returned in the form of graphs or charts. These analyses help in optimizing food resources and understanding food consumption patterns.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
