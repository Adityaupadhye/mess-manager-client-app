import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartConfiguration, Chart, Plugin, TooltipItem } from 'chart.js';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_BASE_URL } from '../../constants';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-get-chart',
  standalone: false,
  // imports: [SharedMaterialComponentsModule, BaseChartDirective, AppModule],
  templateUrl: './get-chart.component.html',
  styleUrls: ['./get-chart.component.css']
})
export class GetChartComponent implements OnInit {
  public weeklyData: any;
  public dates: any;
  public dayOfWeekArray: any;
  public checkPieAttendenceData: any;
  public checkPieWastageData: any;
  public loadingForPieAttendence: boolean = true;
  public loadingForPieWastage: boolean = true;
  
  public test: any;
  // public dateWiseData: Date = new Date(); // for displaying yesterday's data
  public displayYesterdayDate: Date; // Declare without initializing here
  public dateSelected: any; //Selected date for daily data 
  public displayDate: Date | null = null; // Date to display, null by default
  

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getWeeklyData(); 
    const dateToSend = this.getYesterdayDate();  // Get yesterday's date
    this.dateSelected = dateToSend;
    this.displayYesterdayDate = dateToSend;
    this.getDataWithDate(dateToSend);
    this.getYesterdayWastageData(dateToSend);
    
  }

//========================== fetch the selected date ================================
fetchSelectedDate(){
  const selectedDate = this.dateSelected ? new Date(this.dateSelected) : this.getYesterdayDate();
  this.displayDate = selectedDate;
  this.getDataWithDate(selectedDate);
  this.getYesterdayWastageData(selectedDate);
  // console.log("Date used for data:", this.displayDate);
}


onDateChange() {

  console.log('date change: ', this.dateSelected, typeof(this.dateSelected));

}


//=========================== Food Watage last day (doughnut) ==========================

getYesterdayWastageData(date: Date) {
  this.doughnutChartData = null;

  // Format the date to YYYY-MM-DD
  const formattedDateWastage = this.formateDateWaste(date);
  let params = new HttpParams().set('date', formattedDateWastage);

  // API CALL
  this.http.get(API_BASE_URL + 'menu/foodmenu/search_by_date/', {
    params,
    observe: 'response'
  }).subscribe({
    next: (response: any) => {
      this.loadingForPieWastage = false;

      if (response.body && response.body.data && response.body.data.length > 0) {
        const checkPieWastageData = response.body.data; //Assigning the results
        //Preapre labels
        const labels: string[] = [];
        const datasetWithMenuAndWastage: { food_wastage: number, menu: string[] }[] = [];
        
        checkPieWastageData.forEach((item: any) => {
          //Extract food_category as labels
          labels.push(item.food_category);
          //Extreact food wastage and menu
          datasetWithMenuAndWastage.push({
            food_wastage: item.food_wastage,
            menu: [item.menu],
          });
        });
        this.doughnutChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Food Wastage',
              data: datasetWithMenuAndWastage.map(d => d.food_wastage),
              backgroundColor: this.generateBackgroundColor(labels.length),
              menu: datasetWithMenuAndWastage.map(d => d.menu),
            }
          ]
        };
      }else {
        // If no data, display a "No Data" message
        console.warn('No data available for the selected date');
      }
        this.cdr.detectChanges();
    },
    error: (error: any) => {
      console.error('Error occurred:', error);
      this.loadingForPieWastage = false;
    }

  });
}

// Function to caps
//  capitalize(s: string): string {
//   return s.charAt(0).toUpperCase() + s.slice(1);
// }

//generatw colors
generateBackgroundColor(count: number): string[] {
  const colors = ['#002F5D', '#8BC1F7', '#4CB140', '#5752D1'];
  return colors.slice(0, count); // Use only the required number of colors
}

// Helper method to format date to YYYY-MM-DD
formateDateWaste(date: Date): string {
  const day = ('0' + date.getDate()).slice(-2); // Pad single digits with zero
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
  const year = date.getFullYear();
  return `${year}-${month}-${day}`; // Return formatted date
}


//============================Get Yesterday's Date============================
getYesterdayDate(): Date {
  const today = new Date();  // Get today's date
  const yesterday = new Date(today);  // Create a copy of today's date
  yesterday.setDate(today.getDate() - 1);  // Subtract one day
  console.log("Yesterday: "+yesterday)
  return yesterday;  // Return yesterday's date
}

//============================Send Date for Pie chart ==================================
getDataWithDate(date: Date) {
  this.pieChartData = null;
  // Format the date to DD-MM-YYYY
  const formattedDate = this.formatDate(date);


  let params = new HttpParams().set('date', formattedDate);

  // Make GET request with query parameters
  this.http.get(API_BASE_URL + 'pie/', {
    params,
    observe: 'response'
  }).subscribe({
    next: (response: any) => {
      this.loadingForPieAttendence = false;
      if (response.body && response.body.result) {
        this.checkPieAttendenceData = response.body.result;  // Assign the result to checkPieAttendenceData
        console.log(this.checkPieAttendenceData);
        // Initialize arrays for labels and data
      const labels: string[] = [];
      const data: number[] = [];

      for (const [key, value] of Object.entries(this.checkPieAttendenceData)as [string, number][])  {
        labels.push(key);      // Push each key (breakfast, lunch, etc.) to labels
        data.push(value);      // Push each value to data array
      }
      

      this.pieChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Pie Chart',
            data: data,
            backgroundColor: this.generateBackgroundColorPieChart(labels.length),
            hoverBackgroundColor: this.generateHoverBackgroundColorPieChart(labels.length),
            borderWidth: 1
          }
        ]
      };
        // // Update pieChartDatasets based on the received data
        // this.pieChartDatasets[0].data = [
        //   this.checkPieAttendenceData.breakfast,
        //   this.checkPieAttendenceData.lunch,
        //   this.checkPieAttendenceData.snacks,
        //   this.checkPieAttendenceData.dinner
        // ];
        this.cdr.detectChanges();
      } else {
        console.error('Unexpected response structure:', response.body);
      }
    },
    error: (error: any) => {
      console.error('Error occurred:', error);
    }
  });
}

//generate colors
generateBackgroundColorPieChart(count: number): string[] {
  const colors = [
    '#007bff', // Vibrant Blue
    '#ffc107', // Bright Amber
    '#dc3545', // Bold Red
    '#fd7e14'  // Lively Orange
  ];
  return colors.slice(0, count); // Use only the required number of colors
}

//gen hover colors
generateHoverBackgroundColorPieChart(count: number): string[] {
  const colors = [
   '#66b3ff', // Lighter Blue
      '#ffda66', // Lighter Amber
      '#f56c73', // Lighter Red
      '#ffae66'  // Lighter Orange
  ];
  return colors.slice(0, count); // Use only the required number of colors
}


// Helper method to format date to DD-MM-YYYY
formatDate(date: Date): string {
  const day = ('0' + date.getDate()).slice(-2); // Pad single digits with zero
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // Return formatted date
}




//============================SEND DATE END =============================

//=============================Convert Date to Day -------------------------



getWeeklyData() {
  this.http.get(API_BASE_URL + 'weekly/', {
    observe: 'response'
  }).subscribe({

    next: (response: any) => {
      this.weeklyData = response.body.result;

      //get all dates
      const dates = Object.keys(this.weeklyData);
      const mealTypes: Array<'breakfast' | 'lunch' | 'snacks' | 'dinner'> = ['breakfast', 'lunch', 'snacks', 'dinner'];


      //Initialize with zero
      const datasets: { [key in 'breakfast' | 'lunch' | 'snacks' | 'dinner']: number[] } = {
        breakfast: new Array(dates.length).fill(0),
        lunch: new Array(dates.length).fill(0),
        snacks: new Array(dates.length).fill(0),
        dinner: new Array(dates.length).fill(0)
      };

      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const date_day = dates.map(dateStr => {
        const date = new Date(dateStr);
        const dayOfWeek = daysOfWeek[date.getDay()];
        return [dateStr, dayOfWeek]; // Array of two strings for each label (multi-line)
      });




      //Input values i.e. Populate
      dates.forEach((date, index) => {
        mealTypes.forEach(meal => {
          if (this.weeklyData[date][meal] !== undefined) {
            datasets[meal][index] = this.weeklyData[date][meal];
          }
        });
      });

      // Update the chart data
      this.barChartData = {
        labels: date_day,//dates, //dayOfWeekArray, // Dates from the API
        datasets: [
          {
            data: datasets.breakfast, label: 'Breakfast', backgroundColor: '#002F5D'
          },
          {
            data: datasets.lunch, label: 'Lunch', backgroundColor: '#8BC1F7'
          },
          {
            data: datasets.snacks, label: 'Snacks', backgroundColor: '#4CB140'
          },
          {
            data: datasets.dinner, label: 'Dinner', backgroundColor: '#5752D1'
          }
        ]
      };

    },
    error: (error: any) => {
      console.error('Error occurred:', error);
    }
  });
}



  // =================================================== PIE ===========================================================
  public pieChartData: any = null;
  public pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  // maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 19,
        }
      }
    },
    tooltip: {
      titleFont: {
        size: 16
      },
      bodyFont: {
        size: 14
      }
    }
  }
};

  // public pieChartLabels: string[] = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
//   public pieChartDatasets = [
//   {
//     data: [0, 0, 0, 0],
//     backgroundColor: [
//       '#007bff', // Vibrant Blue
//       '#ffc107', // Bright Amber
//       '#dc3545', // Bold Red
//       '#fd7e14'  // Lively Orange
//     ],
//     hoverBackgroundColor: [
//       '#66b3ff', // Lighter Blue
//       '#ffda66', // Lighter Amber
//       '#f56c73', // Lighter Red
//       '#ffae66'  // Lighter Orange
//     ]
//   }
// ];

  public pieChartLegend = true;
  public pieChartPlugins = [];

  // ==================================================== Doughnut ===========================================================
  public doughnutChartLegend = true;
  public doughnutChartPlugins = [];
  public doughnutChartData: any = null;

  public doughnutChartOptions: ChartConfiguration < 'doughnut' > ['options'] = {
  responsive: true,
    // maintainAspectRatio: true,
    plugins: {
    legend: {
      display: true,
        position: 'top',
          align: 'center',
            labels: {
        font: {
          size: 19, 
          },
        padding: 10,
          boxWidth: 35,
        }
    },
    tooltip: {
      enabled: true,
        callbacks: {
        // Customize the tooltip to display both the wastage and the menu
        label: (tooltipItem: TooltipItem<'doughnut'>) => {
          const dataset = tooltipItem.dataset; // Current dataset
          const dataIndex = tooltipItem.dataIndex; // Index of current item in dataset

          // Retrieve the food_wastage value
          const foodWastage = dataset.data[dataIndex] as number;

          // Retrieve the menu from your API response
          const menu = this.doughnutChartData.datasets[0].menu[dataIndex]; // Access the menu for the corresponding data point

          // Format the tooltip label
          return `Food Wastage: ${foodWastage} kg, Menu: ${menu.join(', ')}`;
        }
      },
      titleFont: {
        size: 16
      },
      bodyFont: {
        size: 14
      }
    },

  }
};


  // ==================================================== Bar chart ===========================================================
  public barChartLegend = true;
  public barChartPlugins = [];



  public barChartData: ChartConfiguration < 'bar' > ['data'] = {
  labels: [],
    datasets: []
};

  public barChartOptions: ChartConfiguration < 'bar' > ['options'] = {
  responsive: true,
    // maintainAspectRatio: true,
    plugins: {
    legend: {
      labels: {
        font: {
          size: 19,       // Increase label size
            family: 'Arial', // Optional: specify font family
              weight: 'bold',  // Optional: specify font weight
            // Set label font color to black
          }
      }
    },
    tooltip: {
      titleFont: {
        size: 16,
          family: 'Arial',
            weight: 'bold',
          // Set tooltip title font color to black
        },
      bodyFont: {
        size: 14,
          family: 'Arial',
            weight: 'normal',
          // Set tooltip body font color to black
        }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'black', // Set x-axis tick color
          font: {
          size: 16, // Increase x-axis label size
            family: 'Arial',
              weight: 'bold'
        }
      }
    },
    y: {
      ticks: {
        color: 'black', // Set y-axis tick color
          font: {
          size: 16, // Increase y-axis label size
            family: 'Arial',
              weight: 'bold'
        }
      }
    }
  }
};

  // ==================================================== Line chart ===========================================================


  public lineChartData: ChartConfiguration < 'line' > ['data'] = {
  labels: [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ],
    datasets: [
      {
        data: [50, 40, 60, 70, 80, 30, 90],
        label: 'Breakfast',
        tension: 0.5,
        borderColor: 'green',
        backgroundColor: 'transparent', // No fill
        fill: false
      },
      {
        data: [70, 55, 75, 65, 45, 85, 95],
        label: 'Lunch',
        tension: 0.5,
        borderColor: 'orange',
        backgroundColor: 'transparent', // No fill
        fill: false
      },
      {
        data: [30, 50, 70, 90, 60, 40, 20],
        label: 'Snacks',
        tension: 0.5,
        borderColor: 'blue',
        backgroundColor: 'transparent', // No fill
        fill: false
      },
      {
        data: [80, 60, 40, 20, 50, 70, 100],
        label: 'Dinner',
        tension: 0.5,
        borderColor: 'purple',
        backgroundColor: 'transparent', // No fill
        fill: false
      }
    ]
};


  public lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  // maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 19,       // Increase label size
          family: 'Arial', // Optional: specify font family
          weight: 'bold',  // Optional: specify font weight
          // Set label font color to black
        }
      }
    },
    tooltip: {
      titleFont: {
        size: 16,
        family: 'Arial',
        weight: 'bold',
        // Set tooltip title font color to black
      },
      bodyFont: {
        size: 14,
        family: 'Arial',
        weight: 'normal',
        // Set tooltip body font color to black
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'black', // Set x-axis tick color
        font: {
          size: 16, // Increase x-axis label size
          family: 'Arial',
          weight: 'bold'
        }
      }
    },
    y: {
      ticks: {
        color: 'black', // Set y-axis tick color
        font: {
          size: 16, // Increase y-axis label size
          family: 'Arial',
          weight: 'bold'
        }
      }
    }
  }
};
  public lineChartLegend = true;

  //============================================== Second Bar CHart ======================================

  // Second Bar Chart Data
  public secondBarChartData: ChartConfiguration < 'bar' > ['data'] = {
  labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()), // Generate labels 1-31
    datasets: [
      {
        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)), // Random data for mean attendance
        label: 'Mean Attendance',
        backgroundColor: '#FF6384', // Customize the color
      }
    ]
};

  // Second Bar Chart Options
  public secondBarChartOptions: ChartConfiguration < 'bar' > ['options'] = {
  responsive: true,
    maintainAspectRatio: true,
      plugins: {
    legend: {
      labels: {
        font: {
          size: 18, // Adjust label size
            family: 'Arial',
              weight: 'bold',
          }
      }
    },
    tooltip: {
      titleFont: {
        size: 16,
          family: 'Arial',
            weight: 'bold',
        },
      bodyFont: {
        size: 14,
          family: 'Arial',
            weight: 'normal',
        }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'black',
          font: {
          size: 16,
            family: 'Arial',
              weight: 'bold',
          }
      },
      title: {
        display: true,
          text: 'Dates', // X-axis title
            font: {
          size: 18,
            family: 'Arial',
              weight: 'bold',
          },
        color: 'black',
        }
    },
    y: {
      ticks: {
        color: 'black',
          font: {
          size: 16,
            family: 'Arial',
              weight: 'bold',
          }
      },
      title: {
        display: true,
          text: 'Avg. No. of Students', // Y-axis title
            font: {
          size: 18,
            family: 'Arial',
              weight: 'bold',
          },
        color: 'black',
        }
    }
  }
};

  //==========================================Second Line CHart ======================================

  // Line Chart Data (with Dates on X-axis)
  public secondLineChartData: ChartConfiguration < 'line' > ['data'] = {
  labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()), // Empty labels for X-axis (1-31 dates)
    datasets: [
      {
        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)), // Random data for avg food wastage
        label: 'Mean Wastage',
        tension: 0.5,
        borderColor: 'green',
        backgroundColor: 'transparent',
        fill: false
      }


    ]
};

  // Line Chart Options (with "Dates" label)
  public secondLineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  // maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 19,
          family: 'Arial',
          weight: 'bold',
        }
      }
    },
    tooltip: {
      titleFont: {
        size: 16,
        family: 'Arial',
        weight: 'bold',
      },
      bodyFont: {
        size: 14,
        family: 'Arial',
        weight: 'normal',
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'black',
        font: {
          size: 16,
          family: 'Arial',
          weight: 'bold',
        },

      },
      title: {
        display: true,
        text: 'Dates', // X-axis title
        font: {
          size: 18,
          family: 'Arial',
          weight: 'bold',
        },
        color: 'black',
      }
    },
    y: {
      ticks: {
        color: 'black',
        font: {
          size: 16,
          family: 'Arial',
          weight: 'bold',
        }
      },
      title: {
        display: true,
        text: 'Avg Food Wastage (in Kgs)', // Y-axis title
        font: {
          size: 18,
          family: 'Arial',
          weight: 'bold',
        },
        color: 'black',
      }
    }
  }
};

  public secondlineChartLegend = true;


}
