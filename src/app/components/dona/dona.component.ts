import { Component, Input } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})

export class DonaComponent {

  @Input() title:string = 'Sin titulo';
  @Input('labels') doughnutChartLabels:string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input() data:ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 50, 250, 500 ] },
    ]
  };  

  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = this.data;
  public doughnutChartType: ChartType = 'doughnut';

  public colors:Color[] = [
    //{ backgroundColor: ['#9E120E','#FF5800','#FFB414']}
  ];
}
