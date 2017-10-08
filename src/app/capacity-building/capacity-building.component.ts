import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../providers/training.service';
import {Training} from '../models/training';

@Component({
  selector: 'app-capacity-building',
  templateUrl: './capacity-building.component.html',
  styleUrls: ['./capacity-building.component.css']
})
export class CapacityBuildingComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  trainings: Training[];
  constructor(private trainingService: TrainingService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.trainingService.loadAll().subscribe(trainings => {
      this.trainings = trainings;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.hasError = true;
    });
  }

}
