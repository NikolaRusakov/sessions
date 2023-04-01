import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Subject, takeUntil, tap } from 'rxjs';
import { FormlyAppModule } from './formly.module';

@Component({
  selector: 'analog-app-form',
  standalone: true,
  imports: [CommonModule, FormlyAppModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

  template: `
    <div class="container">
      <div class="py-3 text-center">
        <img
          class="d-block mx-auto mb-2"
          src="https://raw.githubusercontent.com/ngx-formly/ngx-formly/v5/logo.svg?sanitize=true"
          alt=""
          width="72"
          height="72"
        />
        <h5>Angular Formly Bootstrap</h5>
      </div>
      <!--
  <div class="row">
    <div class="col-md-4 mb-4">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <formly-form
          [form]="form"
          [model]="model"
          [fields]="fields">
        </formly-form>

        <button class="btn btn-primary" type="submit">
          Submit
        </button>

        <button class="btn btn-danger" type="reset">
          Reset
        </button>
      </form>
    </div>
  </div> -->
    </div>
  `,
})
export class FormTestComponent {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'input',
      type: 'input',
      props: {
        label: 'Input',
        placeholder: 'Input placeholder',
        required: true,
      },
    },
    {
      key: 'textarea',
      type: 'textarea',
      props: {
        label: 'Textarea',
        placeholder: 'Textarea placeholder',
        required: true,
      },
    },
    {
      key: 'checkbox',
      type: 'checkbox',
      props: {
        label: 'Checkbox',
      },
    },
    {
      key: 'select',
      type: 'select',
      props: {
        label: 'Select',
        placeholder: 'Select placeholder',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ],
      },
    },
    {
      key: 'radio',
      type: 'radio',
      props: {
        label: 'Radio',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
      },
    },
  ];

  private destroy$: Subject<any> = new Subject<any>();
  form3: FormGroup | undefined;
  model3: any;
  options3: FormlyFormOptions | undefined;
  fields3: FormlyFieldConfig[] | undefined;

  type: string | undefined;
  form2 = new FormGroup({});
  model2 = {};
  fields2: FormlyFieldConfig[] = [];

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient
  ) {
    this.loadExample('simple');
  }

  loadExample(type: string) {
    this.http
      .get<any>(`assets/json-schema/${type}.json`)
      .pipe(
        tap(({ schema, model }) => {
          this.type = type;
          this.form3 = new FormGroup({});
          this.options3 = {};
          this.fields3 = [this.formlyJsonschema.toFieldConfig(schema)];
          console.log(this.fields3);
          this.model3 = model;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onSubmit() {
    if (this.form2.valid) {
      alert(JSON.stringify(this.model2, null, 2));
    }
  }

  ngOnInit() {
    this.fields2 = [
      {
        key: 'input2',
        type: 'input',
        props: {
          label: 'Input2',
          placeholder: 'Input placeholder',
          required: true,
        },
      },
      {
        key: 'textarea2',
        type: 'textarea',
        props: {
          label: 'Textarea2',
          placeholder: 'Textarea placeholder',
          required: true,
        },
      },
      {
        key: 'checkbox2',
        type: 'checkbox',
        props: {
          label: 'Checkbox2',
        },
      },
      {
        key: 'select2',
        type: 'select',
        props: {
          label: 'Select',
          placeholder: 'Select placeholder',
          required: true,
          options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ],
        },
      },
      {
        key: 'radio',
        type: 'radio',
        props: {
          label: 'Radio',
          required: true,
          options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ],
        },
      },
    ];
  }
}

// <div class="row">
// <div class="col-md-4 mb-4">
//   {{ model2 | json }}
//   <br />
//   <!-- {{fields2 | json}} -->
//   <form [formGroup]="form2" (ngSubmit)="onSubmit()">
//     <formly-form [form]="form2" [model]="model2" [fields]="fields2">
//     </formly-form>

//     <button class="btn btn-primary" type="submit">Submit</button>

//     <button class="btn btn-danger" type="reset">Reset</button>
//   </form>
// </div>
// </div>

// JSON powered example does not work
// <div class="row">
// <div class="col-md-4 mb-4">
//   {{ model3 | json }}
//   <br />
//   <!-- {{fields2 | json}} -->
//   <form [formGroup]="form3!" (ngSubmit)="onSubmit()" *ngIf="fields3">
//     <formly-form [form]="form3!" [model]="model3" [fields]="fields3">
//     </formly-form>

//     <button class="btn btn-primary" type="submit">Submit</button>

//     <button class="btn btn-danger" type="reset">Reset</button>
//   </form>
// </div>
// </div>
// </div>
