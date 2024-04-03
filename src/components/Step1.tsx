import { Box, FormHelperText, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { StepProps } from '../types';

const Step1: React.FC<StepProps> = ({ formik }) => {
  return (
    <>
      <FormControl fullWidth size="small" error={!!formik.touched.meal && !!formik.errors.meal}>
        <Typography gutterBottom>
          <span style={{ color: 'red' }}>*</span> Please Select a meal
        </Typography>

        <Select
          id="mean"
          name="meal"
          value={formik.values.meal}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value={'breakfast'}>Breakfast</MenuItem>
          <MenuItem value={'lunch'}>Lunch</MenuItem>
          <MenuItem value={'dinner'}>Dinner</MenuItem>
        </Select>
        <FormHelperText>{!!formik.touched.meal && formik.errors.meal}</FormHelperText>
      </FormControl>

      <Box>
        <Typography gutterBottom>
          <span style={{ color: 'red' }}>*</span> Please Select a number of people
        </Typography>
        <TextField
          fullWidth
          value={formik.values.number_of_people}
          type="number"
          size="small"
          id="number_of_people"
          name="number_of_people"
          error={!!formik.touched.number_of_people && !!formik.errors.number_of_people}
          helperText={!!formik.touched.number_of_people && formik.errors.number_of_people}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Box>
    </>
  );
};

export default Step1;
