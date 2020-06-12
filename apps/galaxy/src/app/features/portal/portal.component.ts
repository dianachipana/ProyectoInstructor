import { Component, OnInit } from '@angular/core';
import { GlxThemeService } from '@galaxy/commons/theme';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(public theme: GlxThemeService) { }

  ngOnInit(): void {
  }

}
