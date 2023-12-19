import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryLevel2Component } from './edit-category-level-2.component';

describe('EditCategoryLevel2Component', () => {
  let component: EditCategoryLevel2Component;
  let fixture: ComponentFixture<EditCategoryLevel2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCategoryLevel2Component]
    });
    fixture = TestBed.createComponent(EditCategoryLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
