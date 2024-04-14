import { Component, Output, EventEmitter, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string = '';
  isLightMode: boolean = true;

  constructor (
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const preferenceTheme = localStorage.getItem('preferenceTheme');
    if(preferenceTheme) {
      if(preferenceTheme=='light') this.setLightMode(true);
      else if(preferenceTheme=='dark') this.setLightMode(false);
    }
  }

  @Output() searchUser: EventEmitter<string> = new EventEmitter();

  search() {
    this.searchUser.emit(this.username);
  }

  setLightMode(isLightMode: boolean) {
    this.isLightMode = isLightMode;
    if(!this.isLightMode) {this.renderer.addClass(document.body, 'dark-mode');}
    else {this.renderer.removeClass(document.body, 'dark-mode');}
    //Store user preference persistently
    localStorage.setItem('preferenceTheme', this.isLightMode ? 'light' : 'dark');
  }
}