import { Box, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import jsonData from '../dishes.json';
import { StepProps } from '../types';

const Step2: React.FC<StepProps> = ({ formik }) => {
  const [restaurants, setRestaurants] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dishesList = jsonData.dishes.filter((dish) => dish.availableMeals.includes(formik.values.meal));

        const uniqueRestaurants: string[] = [];
        dishesList.forEach((dish) => {
          if (!uniqueRestaurants.includes(dish.restaurant)) {
            uniqueRestaurants.push(dish.restaurant);
          }
        });

        setRestaurants(uniqueRestaurants);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [formik.values.meal]);

  const handleOnChangeStep = (e: SelectChangeEvent<any>) => {
    formik.handleChange(e);

    if (e.target.value !== formik.values.restaurant) {
      formik.setFieldValue('dish_list', [
        {
          id: new Date().getTime(),
          dish: '',
          no_of_servings: 1,
        },
      ]);
      formik.setFieldTouched('dish_list', false);
    }
  };

  return (
    <Box>
      <Typography gutterBottom>
        <span style={{ color: 'red' }}>*</span> Please Select a Restaurant
      </Typography>
      <FormControl fullWidth size="small" error={!!formik.touched.restaurant && !!formik.errors.restaurant}>
        <Select
          id="restaurant"
          name="restaurant"
          value={formik.values.restaurant}
          onChange={handleOnChangeStep}
          onBlur={formik.handleBlur}
        >
          {restaurants.map((res) => (
            <MenuItem key={res} value={res}>
              {res}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{!!formik.touched.restaurant && formik.errors.restaurant}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default Step2;
