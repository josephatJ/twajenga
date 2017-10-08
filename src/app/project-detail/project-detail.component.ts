import { Component, OnInit } from '@angular/core';
import {Project} from '../models/project';
import {ProjectsService} from '../providers/projects.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  public project: Project;
  public loading: boolean;
  public hasError: boolean;
  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    const projectId = this.route.snapshot.params['id'];
    this.projectService.find(projectId).subscribe((project) => {
      this.project = project;
      this.loading = false;
      this.hasError = false;
    }, error => {
      this.loading = false;
      this.hasError = true;
    });
  }

}
