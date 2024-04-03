import { SelectChangeEvent } from '@mui/material';

export interface StepProps {
  formik: {
    handleChange: (e: SelectChangeEvent<string> | React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    setFieldValue: (field: string, value: unknown) => void;
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
    touched: any;
    errors: any;
    values: {
      meal: string;
      number_of_people: number;
      restaurant: string;
      dish_list: {
        id: number;
        dish: string;
        no_of_servings: number;
      }[];
    };
  };
}

export interface Noti {
  message: string;
  color: 'success' | 'error' | 'info' | 'warning';
}
