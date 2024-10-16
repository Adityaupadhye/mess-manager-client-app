import { Component } from '@angular/core';
import { SharedMaterialComponentsModule } from '../../shared-material-components/shared-material-components.module';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-get-chart',
  standalone: true,
  imports: [SharedMaterialComponentsModule, BaseChartDirective],
  templateUrl: './get-chart.component.html',
  styleUrls: ['./get-chart.component.css']
})
export class GetChartComponent {

  constructor() { }



  // =================================================== PIE ===========================================================
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
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

  public pieChartLabels: string[] = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
  public pieChartDatasets = [
    {
      data: [35, 25, 25, 15],
      backgroundColor: [
        '#007bff', // Vibrant Blue
        '#ffc107', // Bright Amber
        '#dc3545', // Bold Red
        '#fd7e14'  // Lively Orange
      ],
      hoverBackgroundColor: [
        '#66b3ff', // Lighter Blue
        '#ffda66', // Lighter Amber
        '#f56c73', // Lighter Red
        '#ffae66'  // Lighter Orange
      ]
    }
  ];

  public pieChartLegend = true;
  public pieChartPlugins = [];

  // ==================================================== Doughnut ===========================================================
  public doughnutChartLabels: string[] = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: [350, 450, 100, 50],
      backgroundColor: [
        '#002F5D',
        '#8BC1F7',
        '#4CB140',
        '#5752D1',
      ]
    }
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
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

  // ==================================================== Bar chart ===========================================================
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        data: [34, 55, 67, 23, 45, 78, 90], label: 'Breakfast', backgroundColor: [
          '#002F5D',
        ]
      },
      {
        data: [20, 50, 30, 40, 70, 80, 90], label: 'Lunch', backgroundColor: [

          '#8BC1F7',

        ]
      },
      {
        data: [15, 35, 25, 55, 65, 45, 35], label: 'Snacks', backgroundColor: [

          '#4CB140',

        ]
      },
      {
        data: [40, 30, 60, 50, 20, 10, 70], label: 'Dinner', backgroundColor: [
          '#5752D1',
        ]
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
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


  public lineChartData: ChartConfiguration<'line'>['data'] = {
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
    responsive: false,
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
public secondBarChartData: ChartConfiguration<'bar'>['data'] = {
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
public secondBarChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
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
public secondLineChartData: ChartConfiguration<'line'>['data'] = {
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
