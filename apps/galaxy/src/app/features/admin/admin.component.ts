import { Component, OnInit } from '@angular/core';
import { MenuOption } from './interfaces/menu-option.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menuOpts: MenuOption[] =  [
    { title: 'Talleres', icon: 'bookmark', url: '/administrador/talleres' },
    { title: 'Instructores', icon: 'person', url: '/administrador/instructores' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
