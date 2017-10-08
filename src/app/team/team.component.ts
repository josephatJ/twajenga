import { Component, OnInit } from '@angular/core';
import {TeamService} from '../providers/team.service';
import {Team} from '../models/team';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  analysts: Array<any>;
  developers:  Array<any>;
  private allMembers: any;
  private biography: any;

  team1: FirebaseListObservable<any[]>;
  team2: FirebaseListObservable<any[]>;
  constructor(private teamService: TeamService, private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.loading = true;
    this.hasError = false;
    this.analysts = [];
    this.developers = [];
  }

  ngOnInit() {
    this.team1 = this.db.list('/members/developers/');
    this.team1.subscribe(members => {
      this.developers = members;
    });

    this.team2 = this.db.list('/members/analysts/');
    this.team2.subscribe(members => {
      this.analysts = members;
    });
  }

}
