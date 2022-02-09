import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function ToastAlert({ errorMessage }) {
  return (
    <Stack sx={{ width: '25%', position: 'absolute', top: 20, right: 30 }} spacing={2}>
      <Alert severity="error">{errorMessage}</Alert>
    </Stack>
  );
}