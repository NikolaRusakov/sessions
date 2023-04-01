import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FieldType, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'analog-app-formly-object-type',
  // standalone: true,
  // imports: [ReactiveFormsModule, FormlyModule, FormlyBootstrapModule],
  template: `
    <div class="mb-3">
      <legend *ngIf="props.label">{{ props.label }}</legend>
      <p *ngIf="props.description">{{ props.description }}</p>
      <div
        class="alert alert-danger"
        role="alert"
        *ngIf="showError && formControl.errors"
      ></div>
      <formly-field
        *ngFor="let f of field.fieldGroup"
        [field]="f"
      ></formly-field>
    </div>
  `,
})
export class ObjectTypeComponent extends FieldType {}
