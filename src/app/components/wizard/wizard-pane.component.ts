import { Component, input, OnInit, output } from '@angular/core';
import { Subject } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: 'wizard-pane',
  standalone: true,
  imports: [NgClass],
  templateUrl: './wizard-pane.component.html',
  styles: ``,
})
export class WizardPaneComponent implements OnInit {
  /**
   * Sets the title text of the wizard
   */
  title = input.required<string>();
  subTitle = input.required<string>();

  private onCancelEmitter = new Subject<void>();
  protected onCancelObserved = false;
  onCancel = outputFromObservable(this.onCancelEmitter);

  private onPreviousEmitter = new Subject<void>();
  protected onPreviousObserved = false;
  onPrevious = outputFromObservable(this.onPreviousEmitter);

  private onNextEmitter = new Subject<void>();
  protected onNextObserved = false;
  onNext = outputFromObservable(this.onNextEmitter);

  private onFinishEmitter = new Subject<void>();
  protected onFinishObserved = false;
  onFinish = outputFromObservable(this.onFinishEmitter);

  ngOnInit(): void {
    this.onCancelObserved = this.onCancelEmitter.observed;
    this.onPreviousObserved = this.onPreviousEmitter.observed;
    this.onNextObserved = this.onNextEmitter.observed;
    this.onFinishObserved = this.onFinishEmitter.observed;
  }

  cancel() {
    this.onCancelEmitter.next();
  }

  previous() {
    this.onPreviousEmitter.next();
  }

  next() {
    this.onNextEmitter.next();
  }

  finish() {
    this.onFinishEmitter.next();
  }
}
