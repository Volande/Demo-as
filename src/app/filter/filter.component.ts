import { Component, OnInit, Input} from '@angular/core';
import {Hero} from "../hero";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
 filter : Hero []=[];

  constructor() { }

  ngOnInit(): void {
  }

}
