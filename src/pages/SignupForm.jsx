import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  InputAdornment,
  Button,
  Link,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TextFields from '../components/TextFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { pawdRegExp, phoneRegExp } from '../utils';
import LoginForm from './loginForm';

const Schema = yup.object({
  fullName: yup.string().required('Full Name is Required '),
  email: yup.string().required('Email is required').email(),
  mobile: yup
    .string()
    .required('Mobile Phone is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      pawdRegExp,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  cofirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match'),
});

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      cofirmPassword: '',
    },
    resolver: yupResolver(Schema),
  });

  const [activeForm, setActiveForm] = useState('signup');

  const onSubmit = (data) => {
    localStorage.setItem('newuser', JSON.stringify(data));
    console.log(data);
    reset();
  };

  const handleFormSwitch = () => {
    setActiveForm(activeForm === 'signup' ? 'login' : 'signup');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {activeForm === 'signup' && (
        <>
          <Avatar sx={{ m: 1, bgcolor: '#c25b07' }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component='h1'>Sign Up</Typography>
          <Box
            noValidate
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '80%', mt: '20px' }}
          >
            <TextFields
              label='Full Name'
              control={control}
              name='fullName'
              errors={errors}
            />
            <TextFields
              label='Email'
              control={control}
              name='email'
              errors={errors}
            />
            <TextFields
              control={control}
              name='mobile'
              label='Mobile'
              errors={errors}
              inputProps={{
                startAdornment: (
                  <InputAdornment position='start'>+91</InputAdornment>
                ),
                type: 'number',
              }}
            />
            <TextFields
              control={control}
              name='password'
              label='Password '
              errors={errors}
              type='password'
            />
            <TextFields
              control={control}
              name='cofirmPassword'
              label='Confirm Password'
              errors={errors}
              type='password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 1, mb: 2, backgroundColor: '#FC9B4E' }}
            >
              SignUp
            </Button>
            <Typography variant='caption'>
              Already have an account?
              <Link
                sx={{ cursor: 'pointer', color: 'darkmagenta' }}
                onClick={handleFormSwitch}
              >
                {activeForm === 'Log In' ? 'Sign Up' : 'Log In'}
              </Link>
            </Typography>
          </Box>
        </>
      )}
      {activeForm === 'login' && <LoginForm />}
    </Box>
  );
};

export default SignupForm;
