import React, { useState } from 'react';
import { CardMedia, Container, Paper, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SnackbarNoti from './components/SnackbarNoti';
import { Noti } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex !important',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    alignItems: 'center',
    width: '600px',
    height: '70vh',
    padding: '16px',
  },
  renderFieldsStep: {
    width: '100%',
    height: 'fit-content',
    overflow: 'auto',
    padding: '10px',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  wrapButtonsAction: {
    width: '100%',
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    pt: 2,
  },
}));

const steps = ['Step 1', 'Step 2', 'Step 3', 'Review'];

function App() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [noti, setNoti] = useState<Noti>({
    message: '',
    color: 'success',
  });

  const validationSchema = yup.object().shape({
    meal: yup.string().required('Please choose a meal.'),
    number_of_people: yup
      .number()
      .required('Please choose a number of people.')
      .max(10, 'Maximum number is 10 people')
      .min(1, 'Minimum quantity is 1 person'),
    restaurant: yup.string().required('Please choose a restaurant.'),
    dish_list: yup.array().of(
      yup.object().shape({
        id: yup.number().required('ID is required.'),
        dish: yup.string().required('Please choose a dish.'),
        no_of_servings: yup
          .number()
          .required('Number of servings is required.')
          .min(1, 'Minimum number of servings is 1'),
      }),
    ),
  });

  const formik = useFormik({
    initialValues: {
      meal: '',
      number_of_people: 1,
      restaurant: '',
      dish_list: [
        {
          id: new Date().getTime(),
          dish: '',
          no_of_servings: 1,
        },
      ],
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  const { values, errors, resetForm } = formik;
  const numberOfPeople = values.number_of_people;
  const totalNumberOfDishes = values.dish_list.reduce((acc, curr) => {
    return (acc += curr.no_of_servings);
  }, 0);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 2 && totalNumberOfDishes < numberOfPeople) {
      setNoti({
        message: `The total number of servings must be greater than or equal to ${numberOfPeople}`,
        color: 'error',
      });
      setOpenSnackbar(true);
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    resetForm();
  };

  const renderFieldsStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 formik={formik} />;
      case 1:
        return <Step2 formik={formik} />;
      case 2:
        return <Step3 formik={formik} />;

      default:
        return <Step4 formik={formik} />;
    }
  };

  return (
    <>
      <Container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography color="peru" fontWeight={600} fontSize={24}>
            Fabbi React Assignment 1
          </Typography>

          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography fontWeight={600} fontSize={18} sx={{ mt: 2 }}>
                Congratulations your order has been placed successfully 🎉
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />

                <CardMedia
                  component="img"
                  src="https://www.icegif.com/wp-content/uploads/icegif-3608.gif"
                  sx={{ width: '300px', mb: 2 }}
                />
                <Button variant="contained" color="warning" onClick={handleReset}>
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box className={classes.renderFieldsStep}>{renderFieldsStep()}</Box>

              <Box className={classes.wrapButtonsAction}>
                <Button color="secondary" variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={
                    (activeStep === 0 &&
                      (!!errors.meal || !!errors.number_of_people || !values.meal || !values.number_of_people)) ||
                    (activeStep === 1 && (!!errors.restaurant || !values.restaurant)) ||
                    (activeStep === 2 && !!errors?.dish_list?.length)
                  }
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
      {openSnackbar && <SnackbarNoti open={openSnackbar} setOpen={setOpenSnackbar} noti={noti} />}
    </>
  );
}

export default App;
