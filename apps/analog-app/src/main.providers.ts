/**
 * Common providers shared with client and server-side.
 */

import { importProvidersFrom } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';

import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ArrayTypeComponent } from './app/ui/forms/array.type';
import {
  typeValidationMessage,
  minLengthValidationMessage,
  maxLengthValidationMessage,
  minValidationMessage,
  maxValidationMessage,
  multipleOfValidationMessage,
  exclusiveMinimumValidationMessage,
  exclusiveMaximumValidationMessage,
  minItemsValidationMessage,
  maxItemsValidationMessage,
  constValidationMessage,
  FormlyAppModule,
} from './app/ui/forms/formly.module';
import { MultiSchemaTypeComponent } from './app/ui/forms/multischema.type';
import { NullTypeComponent } from './app/ui/forms/null.type';
import { ObjectTypeComponent } from './app/ui/forms/object.type';

export const mainProviders = [
  provideHttpClient(),
  // provideAnimations(),
  importProvidersFrom(
    // BrowserAnimationsModule,
    CommonModule,
    FormlyAppModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'type', message: typeValidationMessage },
        { name: 'minLength', message: minLengthValidationMessage },
        { name: 'maxLength', message: maxLengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
        { name: 'multipleOf', message: multipleOfValidationMessage },
        {
          name: 'exclusiveMinimum',
          message: exclusiveMinimumValidationMessage,
        },
        {
          name: 'exclusiveMaximum',
          message: exclusiveMaximumValidationMessage,
        },
        { name: 'minItems', message: minItemsValidationMessage },
        { name: 'maxItems', message: maxItemsValidationMessage },
        { name: 'uniqueItems', message: 'should NOT have duplicate items' },
        { name: 'const', message: constValidationMessage },
      ],
      types: [
        {
          name: 'null',
          component: NullTypeComponent,
          wrappers: ['form-field'],
        },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'multischema', component: MultiSchemaTypeComponent },
      ],
    })
  ),
];
