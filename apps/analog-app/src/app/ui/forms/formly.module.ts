import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { NullTypeComponent } from './null.type';
import { ArrayTypeComponent } from './array.type';
import { MultiSchemaTypeComponent } from './multischema.type';
import { ObjectTypeComponent } from './object.type';
import { CommonModule } from '@angular/common';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

export function minItemsValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `should NOT have fewer than ${field.props?.['minItems']} items`;
}

export function maxItemsValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `should NOT have more than ${field.props?.['maxItems']} items`;
}

export function minLengthValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `should NOT be shorter than ${field.props?.['minLength']} characters`;
}

export function maxLengthValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `should NOT be longer than ${field.props?.['maxLength']} characters`;
}

export function minValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should be >= ${field.props?.min}`;
}

export function maxValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should be <= ${field.props?.max}`;
}

export function multipleOfValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `should be multiple of ${field.props?.step}`;
}

export function exclusiveMinimumValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `should be > ${field.props?.step}`;
}

export function exclusiveMaximumValidationMessage(
  error: any,
  field: FormlyFieldConfig
) {
  return `should be < ${field.props?.step}`;
}

export function constValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should be equal to constant "${field.props?.['const']}"`;
}

export function typeValidationMessage({ schemaType }: any) {
  return `should be "${schemaType[0]}".`;
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule,
    // FormlyModule.forRoot({
    //   validationMessages: [
    //     { name: 'required', message: 'This field is required' },
    //     { name: 'type', message: typeValidationMessage },
    //     { name: 'minLength', message: minLengthValidationMessage },
    //     { name: 'maxLength', message: maxLengthValidationMessage },
    //     { name: 'min', message: minValidationMessage },
    //     { name: 'max', message: maxValidationMessage },
    //     { name: 'multipleOf', message: multipleOfValidationMessage },
    //     {
    //       name: 'exclusiveMinimum',
    //       message: exclusiveMinimumValidationMessage,
    //     },
    //     {
    //       name: 'exclusiveMaximum',
    //       message: exclusiveMaximumValidationMessage,
    //     },
    //     { name: 'minItems', message: minItemsValidationMessage },
    //     { name: 'maxItems', message: maxItemsValidationMessage },
    //     { name: 'uniqueItems', message: 'should NOT have duplicate items' },
    //     { name: 'const', message: constValidationMessage },
    //   ],
    //   types: [
    //     {
    //       name: 'null',
    //       component: NullTypeComponent,
    //       wrappers: ['form-field'],
    //     },
    //     { name: 'array', component: ArrayTypeComponent },
    //     { name: 'object', component: ObjectTypeComponent },
    //     { name: 'multischema', component: MultiSchemaTypeComponent },
    //   ],
    // }),
  ],
  exports: [FormlyBootstrapModule, ReactiveFormsModule],
  declarations: [
    NullTypeComponent,
    ArrayTypeComponent,
    ObjectTypeComponent,
    MultiSchemaTypeComponent,
  ],
})
export class FormlyAppModule {}
