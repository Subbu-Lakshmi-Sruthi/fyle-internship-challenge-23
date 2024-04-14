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
      if(preferenceTheme=='light') this.isLightMode = false;
      else if(preferenceTheme=='dark') this.isLightMode = true;
      this.toggleTheme();
    }
  }

  @Output() searchUser: EventEmitter<string> = new EventEmitter();

  search() {
    this.searchUser.emit(this.username);
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    if(!this.isLightMode) {this.renderer.addClass(document.body, 'dark-mode');}
    else {this.renderer.removeClass(document.body, 'dark-mode');}
    localStorage.setItem('preferenceTheme', this.isLightMode ? 'light' : 'dark');
  }
}