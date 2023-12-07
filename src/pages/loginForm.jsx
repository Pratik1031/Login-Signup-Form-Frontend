import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button,
  Radio,
  Link,
  FormHelperText,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TextFields from '../components/TextFields';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { pawdRegExp } from '../utils';
import SignupForm from './SignupForm';

const Schema = yup.object({
  email: yup.string().required('Email is required').email(),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      pawdRegExp,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  userType: yup.string().required('User type is required'),
});

const LoginForm = () => {
  const [activeForm, setActiveForm] = useState('login');

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      userType: '',
    },
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    console.log(data);
    reset();
  };

  const handleFormSwitch = () => {
    setActiveForm(activeForm === 'login' ? 'signup' : 'login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '1rem',
        alignItems: 'center',
      }}
    >
      {activeForm === 'login' && (
        <>
          {' '}
          <Avatar sx={{ m: 1, bgcolor: '#c25b07' }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component='h1'>Login </Typography>
          <Box
            noValidate
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '80%', mt: '1rem' }}
          >
            <TextFields
              label='Email'
              control={control}
              name='email'
              errors={errors}
            />
            <TextFields
              control={control}
              name='password'
              label='Password '
              errors={errors}
              type='password'
            />
            <Typography>Login Type </Typography>
            <FormControl component='fieldset' margin='normal'>
              <Controller
                render={({ field }) => (
                  <RadioGroup row aria-labelledby='user-type-label' {...field}>
                    <FormControlLabel
                      value='admin'
                      control={<Radio />}
                      label='Admin'
                    />
                    <FormControlLabel
                      value='user'
                      control={<Radio />}
                      label='User'
                    />
                    <FormControlLabel
                      value='client'
                      control={<Radio />}
                      label='Client'
                    />
                  </RadioGroup>
                )}
                control={control}
                name='userType'
              />
              <FormHelperText error>{errors.userType?.message}</FormHelperText>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 1, mb: 2, backgroundColor: '#FC9B4E' }}
            >
              Login
            </Button>
            <Typography variant='caption'>
              Don't have an account?
              <Link
                sx={{ cursor: 'pointer', color: 'darkmagenta' }}
                onClick={handleFormSwitch}
              >
                {activeForm === 'login' ? 'Sign Up' : 'Log In'}
              </Link>
            </Typography>
          </Box>
        </>
      )}
      {activeForm === 'signup' && <SignupForm />}
    </Box>
  );
};

export default LoginForm;
