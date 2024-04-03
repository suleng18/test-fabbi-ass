import { Chip, Grid } from '@mui/material';
import React from 'react';
import { StepProps } from '../types';

const Step4: React.FC<StepProps> = ({ formik }) => {
  const { values } = formik;

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          Meal
        </Grid>
        <Grid item xs={6}>
          {values.meal.slice(0, 1).toLocaleUpperCase() + values.meal.slice(1)}
        </Grid>
        <Grid item xs={6}>
          No. of. People
        </Grid>
        <Grid item xs={6}>
          {values.number_of_people}
        </Grid>
        <Grid item xs={6}>
          Restaurant
        </Grid>
        <Grid item xs={6}>
          {values.restaurant}
        </Grid>
        <Grid item xs={6}>
          Dishes
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {values.dish_list.map((dish) => (
            <Chip sx={{ maxWidth: '200px' }} color="warning" label={`${dish.dish} - ${dish.no_of_servings}`} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Step4;
