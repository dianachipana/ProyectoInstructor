import { Component, OnInit, Input } from '@angular/core';
import { Workshop } from '@galaxy/commons/models';

@Component({
  selector: 'app-workshop-item',
  templateUrl: './workshop-item.component.html',
  styleUrls: ['./workshop-item.component.scss']
})
export class WorkshopItemComponent implements OnInit {
  @Input() workshop: Workshop;

  constructor() { }

  ngOnInit(): void {
  }

}
