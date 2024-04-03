import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Noti } from '../types';

interface SnackbarNotiProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noti: Noti;
}

export default function SnackbarNoti({ open, setOpen, noti }: SnackbarNotiProps) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={noti.color} variant="filled" sx={{ width: '100%' }}>
          {noti.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
