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
import { Observable, forkJoin, map, tap } from 'rxjs';
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

    <div class="font-mono">
      <header class="px-xl py-md bg-primary-light text-xl font-bold shadow-md">
        Angular + Tailwind CSS + Nx
      </header>

      <main
        class="max-w-xl md:max-w-2xl lg:max-w-6xl mx-auto py-xl px-md md:px-xl grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          class="flex flex-col p-lg bg-secondary-light shadow-md hover:shadow-lg"
        >
          <div class="pb-md text-lg font-bold">Angular</div>
          <p class="mb-xl flex-1">
            Angular is an application design framework and development platform
            for creating efficient and sophisticated single-page apps.
          </p>
          <a
            class="py-sm px-md bg-primary-dark hover:bg-primary text-white flex self-end"
            href="https://angular.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Show me!
          </a>
        </div>

        <div
          class="flex flex-col p-lg bg-secondary-light shadow-md hover:shadow-lg"
        >
          <div class="pb-md text-lg font-bold">Tailwind CSS</div>
          <p class="mb-xl flex-1">
            Tailwind CSS is a utility-first CSS framework packed with classes
            like flex, pt-4, text-center and rotate-90 that can be composed to
            build any design, directly in your markup.
          </p>
          <a
            class="py-sm px-md bg-primary-dark hover:bg-primary text-white flex self-end"
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Show me!
          </a>
        </div>

        <div
          class="flex flex-col p-lg bg-secondary-light shadow-md hover:shadow-lg"
        >
          <div class="pb-md text-lg font-bold">Nx</div>
          <p class="mb-xl flex-1">
            Nx is a smart, fast and extensible build system with first class
            monorepo support and powerful integrations.
          </p>
          <a
            class="py-sm px-md bg-primary-dark hover:bg-primary text-white flex self-end"
            href="https://nx.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Show me!
          </a>
        </div>
      </main>
    </div>
    <br />
    <form
      [formGroup]="form3"
      (ngSubmit)="onSubmit(model$)"
      *rxLet="fields$; let fields3"
    >
      <formly-form [form]="form3" [model]="model$ | push" [fields]="fields3">
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
    form: FormGroup;
    model: any;
    options: FormlyFormOptions;
    fields: FormlyFieldConfig[];
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

  model$: Observable<any> = this.select('model');
  options$: Observable<FormlyFormOptions> = this.select('options');
  fields$: Observable<FormlyFieldConfig[]> = this.select('fields');

  constructor() {
    super();
    this.set({ fields: [], options: {}, model: {} });
  }
  ngOnInit() {
    this.loadExample();
  }

  loadExample() {
    // .get<any>(`assets/schema.json`)
    this.fetchModelAndSchema()
      .pipe(
        tap(([schema, model]) => {
          this.form3 = new FormGroup({});
          this.set('options', (_) => ({
            formState: {
              age: false,
            },
          }));
          // this.set('options', (_) => ({}));
          console.log(schema);
          this.set('fields', (_) => [
            this.formlyJsonschema.toFieldConfig(schema),
            {
              key: 'es',
              type: 'input',
              expressions: {
                hide: '!model.first',
                'props.disabled': 'model.first == "es"',
              },
            },
            {
              fieldGroupClassName: 'flex',
              fieldGroup: [
                {
                  className: 'flex-1',
                  type: 'input',
                  key: 'first',
                  props: {
                    label: 'First Name',
                  },
                },
                {
                  className: 'flex-1',
                  type: 'input',
                  key: 'last',
                  props: {
                    label: 'Last Name',
                  },
                  expressions: {
                    'props.disabled': '!model.first',
                  },
                },
              ],
            },
          ]);
          this.fields$.pipe(tap(console.log));
          this.set('model', (_) => model);
        })
      )
      .subscribe();
  }

  onSubmit(model3: any) {
    if (this.form3?.valid) {
      alert(JSON.stringify(model3, null, 2));
    }
  }

  fetchModelAndSchema = () =>
    forkJoin([
      this.http.get<any>(`http://localhost:3006/schema`),
      this.http.get<any>(`http://localhost:3006/model`),
    ]);
}
