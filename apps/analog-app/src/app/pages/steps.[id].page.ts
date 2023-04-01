import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  ActivatedRoute,
  RouterLinkWithHref,
  RouterModule,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { LetModule } from '@rx-angular/template/let';
import { ForModule } from '@rx-angular/template/for';
import { PushModule } from '@rx-angular/template/push';
import { IfModule } from '@rx-angular/template/if';
import { RxState } from '@rx-angular/state';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

@Component({
  selector: 'analog-app-steps',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>{{ productId$ | push }}</h2>

    <br />
    <form
      [formGroup]="form3"
      (ngSubmit)="onSubmit(model3$)"
      *rxLet="fields3$; let fields3"
    >
      <formly-form [form]="form3" [model]="model3$ | push" [fields]="fields3">
      </formly-form>

      <button class="btn btn-primary" type="submit">Submit</button>

      <button class="btn btn-danger" type="reset">Reset</button>
    </form>
  `,
  imports: [
    CommonModule,
    RouterModule,
    ForModule,
    LetModule,
    IfModule,
    PushModule,
    UnpatchModule,
    FormlyBootstrapModule,
    AsyncPipe,
    JsonPipe,
    RouterLinkWithHref,
    ReactiveFormsModule,
    FormlyModule,
  ],
  providers: [RxState],
})
export default class StepsPageComponent
  extends RxState<{
    form3: FormGroup;
    model3: any;
    options3: FormlyFormOptions;
    fields3: FormlyFieldConfig[];
  }>
  implements OnInit
{
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private formlyJsonschema = inject(FormlyJsonschema);

  readonly productId$ = this.route.paramMap.pipe(
    map((params) => params.get('id'))
  );

  readonly state$ = this.select();

  form3: FormGroup = new FormBuilder().group({});

  model3$: Observable<any> = this.select('model3');
  options3$: Observable<FormlyFormOptions> = this.select('options3');
  fields3$: Observable<FormlyFieldConfig[]> = this.select('fields3');

  constructor() {
    super();
  }
  ngOnInit() {
    this.loadExample();
    this.set({ fields3: [], options3: {}, model3: {} });
  }

  loadExample() {
    this.http
      .get<any>(`assets/schema.json`)
      .pipe(
        tap(({ schema, model }) => {
          this.form3 = new FormGroup({});
          this.set('options3', (_) => ({}));
          this.set('fields3', (_) => [
            this.formlyJsonschema.toFieldConfig(schema),
          ]);
          this.set('model3', (_) => model);
        })
      )
      .subscribe();
  }

  onSubmit(model3: any) {
    if (this.form3?.valid) {
      alert(JSON.stringify(model3, null, 2));
    }
  }
}
