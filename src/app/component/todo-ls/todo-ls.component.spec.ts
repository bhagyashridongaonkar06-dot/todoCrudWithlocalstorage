import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoLSComponent } from './todo-ls.component';

describe('TodoLSComponent', () => {
  let component: TodoLSComponent;
  let fixture: ComponentFixture<TodoLSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoLSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoLSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
