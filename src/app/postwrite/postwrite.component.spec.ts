import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostwriteComponent } from './postwrite.component';

describe('PostwriteComponent', () => {
  let component: PostwriteComponent;
  let fixture: ComponentFixture<PostwriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostwriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostwriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
