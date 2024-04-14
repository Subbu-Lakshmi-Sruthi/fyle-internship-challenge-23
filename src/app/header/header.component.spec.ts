import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let renderer: Renderer2;

  beforeEach(async () => {
    renderer = jasmine.createSpyObj<Renderer2>(['addClass', 'removeClass']);
  
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [FormsModule],
      providers: [{ provide: Renderer2, useValue: renderer }]
    }).compileComponents();
  });

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [ Renderer2 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    renderer = TestBed.inject(Renderer2);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event when search method is called', () => {
    const spy = spyOn(component.searchUser, 'emit');
    component.username = 'testUser';
    component.search();
    expect(spy).toHaveBeenCalledWith('testUser');
  });

  it('should set light mode when setLightMode is called with true', () => {
    component.setLightMode(true);
    expect(component.isLightMode).toBe(true);
    expect(localStorage.getItem('preferenceTheme')).toBe('light');
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  it('should set dark mode when setLightMode is called with false', () => {
    component.setLightMode(false);
    expect(component.isLightMode).toBe(false);
    expect(localStorage.getItem('preferenceTheme')).toBe('dark');
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  });

  it('should set light mode on init if preferenceTheme is "light"', () => {
    spyOn(localStorage, 'getItem').and.returnValue('light');
    component.ngOnInit();
    expect(component.isLightMode).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  it('should set dark mode on init if preferenceTheme is "dark"', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dark');
    component.ngOnInit();
    expect(component.isLightMode).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  });
});
