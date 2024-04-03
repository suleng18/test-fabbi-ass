import { Box, FormControl, FormHelperText, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import jsonData from '../dishes.json';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Noti, StepProps } from '../types';
import SnackbarNoti from './SnackbarNoti';
import DeleteIcon from '@mui/icons-material/Delete';

interface uniqueDishes {
  [key: string]: boolean;
}

const Step3: React.FC<StepProps> = ({ formik }) => {
  const fieldListDish = formik.values.dish_list;
  const restaurantName = formik.values.restaurant;
  const mealSelected = formik.values.meal;
  const listOfSelectedDishes = formik.values.dish_list.map((item) => item.dish);

  const [listOfResDishes, setListOfResDishes] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [noti, setNoti] = useState<Noti>({
    message: '',
    color: 'success',
  });

  useEffect(() => {
    const uniqueDishesArray: string[] = [];
    const uniqueDishes: uniqueDishes = {};

    jsonData.dishes.forEach((dish) => {
      if (dish.restaurant === restaurantName && dish.availableMeals.includes(mealSelected)) {
        if (!uniqueDishes[dish.name]) {
          uniqueDishes[dish.name] = true;
          uniqueDishesArray.push(dish.name);
        }
      }
    });
    setListOfResDishes(uniqueDishesArray);
  }, [mealSelected, restaurantName]);

  const handleAddDishes = () => {
    if (listOfSelectedDishes?.length === listOfResDishes.length) {
      setNoti({
        message: 'There are no other dishes available!',
        color: 'error',
      });
      setOpenSnackbar(true);
    } else {
      const currentDishList = formik.values?.dish_list;
      const newDishList = [...currentDishList];
      newDishList.push({
        id: new Date().getTime(),
        dish: '',
        no_of_servings: 1,
      });
      formik.setFieldValue('dish_list', newDishList);
    }
  };

  const handleDeleteDishes = (dish: { id: number; dish: string }, index: number) => {
    const newDishList = formik.values?.dish_list?.filter((item) => item.id !== dish.id);
    formik.setFieldValue('dish_list', newDishList);

    if (!!formik?.touched?.dish_list) {
      const newTouchedList = formik?.touched?.dish_list?.filter((item: { id: number }, idx: number) => idx !== index);
      formik.setFieldTouched('dish_list', newTouchedList);
    }
  };

  return (
    <>
      {fieldListDish.map((item: any, index: number) => {
        return (
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
              <Typography gutterBottom>
                <span style={{ color: 'red' }}>*</span> Please Select a Dish
              </Typography>
              <FormControl
                sx={{ width: '250px' }}
                size="small"
                error={!!formik.touched.dish_list?.[index]?.dish && !!formik.errors.dish_list?.[index]?.dish}
              >
                <Select
                  id={`dish_list.[${index}].dish`}
                  name={`dish_list.[${index}].dish`}
                  value={formik.values.dish_list?.[index]?.dish}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {listOfResDishes.map((dish) => (
                    <MenuItem disabled={!!listOfSelectedDishes.includes(dish)} key={dish} value={dish}>
                      {dish}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {!!formik.touched.dish_list?.[index]?.dish && formik.errors.dish_list?.[index]?.dish}
                </FormHelperText>
              </FormControl>
            </Box>

            <Box>
              <Typography gutterBottom>
                <span style={{ color: 'red' }}>*</span> Please enter no. of servings
              </Typography>
              <TextField
                sx={{ width: '220px' }}
                value={formik.values.dish_list?.[index]?.no_of_servings}
                type="number"
                size="small"
                id={`dish_list.[${index}].no_of_servings`}
                name={`dish_list.[${index}].no_of_servings`}
                error={
                  !!formik.touched.dish_list?.[index]?.no_of_servings &&
                  !!formik.errors.dish_list?.[index]?.no_of_servings
                }
                helperText={
                  !!formik.touched.dish_list?.[index]?.no_of_servings &&
                  formik.errors.dish_list?.[index]?.no_of_servings
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>

            <Box alignSelf="start" mt={'28px'}>
              <IconButton color="error" onClick={() => handleDeleteDishes(item, index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        );
      })}

      <Box>
        <IconButton onClick={handleAddDishes}>
          <AddCircleIcon />
        </IconButton>
      </Box>

      {openSnackbar && <SnackbarNoti open={openSnackbar} setOpen={setOpenSnackbar} noti={noti} />}
    </>
  );
};

export default Step3;
