// Modified by Mariagrazia Staffieri, 2026-11-01: tests for the support of TEI lb/@break.
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';

import { Lb } from '../../models/evt-models';
import { EVTModelService } from '../../services/evt-model.service';
import { LbComponent } from './lb.component';

describe('LbComponent', () => {
  let component: LbComponent;
  let fixture: ComponentFixture<LbComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LbComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('LbComponent and TEI lb/@break', () => {
  const lines$ = of([{}]);
  const make = (attributes: { [key: string]: string }) => {
    const component = new LbComponent({ lines$ } as unknown as EVTModelService);
    component.data = { id: 'l2', n: '2', attributes, break: attributes.break, type: Lb, content: [] } as Lb;
    component.editionLevel = 'diplomatic';
    component.textFlow = 'verses';

    return component;
  };

  it('should continue the word when break="no"', () => {
    expect(make({ n: '2', break: 'no' }).continuesWord).toBeTrue();
  });

  it('should keep the word separator when @break is absent or "yes"', () => {
    expect(make({ n: '2' }).continuesWord).toBeFalse();
    expect(make({ n: '2', break: 'yes' }).continuesWord).toBeFalse();
  });

  it('should still render the line beginning inline in the verses flow', (done) => {
    make({ n: '2', break: 'no' }).displayInline$.subscribe((inline) => {
      expect(inline).toBeTrue();
      done();
    });
  });
});
