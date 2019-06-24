import React from 'react';
import styled from 'styled-components';

import { ProductFormModel } from './models';
import {
  Input, Button, FormDescription, Form, ImageUploader,
} from '../../../components';

const MainContainer = styled.div``;

enum FormFields {
  ProductName = 'productName',
  Price = 'price',
  Image = 'image',
  Submit = 'submit',
}

const formDescription: FormDescription = {
  [FormFields.ProductName]: {
    initValue: '',
    validators: [
      {
        errorMessage: 'Name is too long',
        isValid: (value: string) => {
          const maxLength = 20;
          const isValid = !(value.length > maxLength);
          return isValid;
        },
      },
      {
        errorMessage: 'Name is too short',
        isValid: (value: string) => {
          const minLength = 3;
          const isValid = !(value.length < minLength);
          return isValid;
        },
      },
    ],
    renderControl: (control): JSX.Element => {
      const { value, handleChange, errorMessage } = control;
      return (
        <Input
          title="Name"
          name={FormFields.ProductName}
          placeholder="Name"
          value={value}
          onChange={handleChange}
          errorMessage={errorMessage}
        />
      );
    },
  },
  [FormFields.Price]: {
    initValue: '',
    validators: [],
    renderControl: (control): JSX.Element => {
      const { value, handleChange, errorMessage } = control;
      return (
        <Input
          title="Price"
          name={FormFields.Price}
          value={value}
          onChange={handleChange}
          errorMessage={errorMessage}
        />
      );
    },
  },
  [FormFields.Image]: {
    renderControl: (control) => {
      const { value, handleChange, errorMessage } = control;
      return (
        <ImageUploader
          value={value}
          onChange={(file, url) => {
            handleChange(file);
            console.log(file, url);
          }}
        />
      );
    },
  },
  [FormFields.Submit]: {
    renderControl: (_, form) => {
      const { isFormValid } = form;
      return (
        <Button type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      );
    },
  },
};

interface ProductFormProps {
  onSubmit: (form: ProductFormModel) => void;
  formInit?: any;
}

export const ProductForm = (props: ProductFormProps): JSX.Element => {
  const { onSubmit, formInit } = props;

  return (
    <MainContainer>
      <Form formDescription={formDescription} onSubmit={onSubmit} />
    </MainContainer>
  );
};
