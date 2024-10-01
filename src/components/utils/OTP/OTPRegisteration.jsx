import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, Divider, IconButton, Typography } from '@mui/material';
import BazaarTextField from 'components/BazaarTextField';
import { H6 } from 'components/Typography';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as yup from "yup"; 

const OTPRegisteration = ({mailOTP,email, phone, phoneOTP,open,handleClose,resendEmail, resendPhone, formSubmit}) => {
    const [emailSentCount, setemailSentCount] = useState(2);
    const [phoneSentCount, setphoneSentCount] = useState(2);
    const isEqualToExternalValue = (externalValue) => {
        return yup.string().test('isEqualToExternalValue', 'OTP is invalid', (value) => {
          return value === externalValue;
        });
      };
    const initialValues = {
        otp:"",
        phoneOtp:""
      }; 

      const validationSchema = yup.object().shape({
        otp: yup.string().required('OTP is required')
        .length(6, 'OTP must be 6 digits long'),
        phoneOtp: yup.string().required('OTP is required')
        .length(6, 'OTP must be 6 digits long')
      });

      const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldError,
        handleSubmit
      } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async(values) => {
            let error = false;
            if(values.otp != mailOTP){
                 error = true;
                setFieldError('otp', 'OTP is invalid' )
              }
              if(values.phoneOtp != phoneOTP){
                error = true;
                setFieldError('phoneOtp', 'OTP is invalid' )
              }
              if(!error){
                formSubmit();
      handleClose();
              }
    }
      });

  return (
    <> <Dialog
    open={open}
    
    PaperProps={{sx:{p:1, borderRadius:4,maxWidth:400, width:1}}}
    // onClose={handleClose}
  >
    <IconButton disableRipple
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 6,
            top: 6,
            color: 'black',
          })}
        > <Close  fontSize='small'/>
        </IconButton>
    <DialogContent>
    <Typography variant='h6' color="primary.main" p={1} textAlign={'center'}   >
              {'Enter OTP sent to'}
            </Typography>
            <H6 mb={1} textAlign={'center'}  fontSize={13} color="grey.700">
          {email}
        </H6>
    <BazaarTextField  fullWidth name="otp" size="small"  variant="outlined" placeholder="Email OTP (check inbox & spam)" onBlur={handleBlur} value={values.name} onChange={handleChange}  error={!!touched.otp && !!errors.otp} helperText={touched.otp && errors.otp} />
    {emailSentCount > 0 && <Button variant='text' mb={1.5}  sx={{color:'#3399ff', '&:hover':{
        backgroundColor:'transparent'
    }}} onClick={async() => {
        setemailSentCount(emailSentCount-1);
        await resendEmail();
    }}>Resend OTP</Button>}
    <H6 my={1} textAlign={'center'}  fontSize={13} color="grey.700">
          {phone}
        </H6>
<BazaarTextField  fullWidth name="phoneOtp" size="small" variant="outlined" placeholder="Phone OTP" onBlur={handleBlur} value={values.email} onChange={handleChange}   error={!!touched.phoneOtp && !!errors.phoneOtp} helperText={touched.phoneOtp && errors.phoneOtp} />
{phoneSentCount > 0 && <Button variant='text' mb={1.5}  sx={{color:'#3399ff', '&:hover':{
        backgroundColor:'transparent'
    }}} onClick={async() => {
        setphoneSentCount(phoneSentCount-1);
        await resendPhone();
    }}>Resend OTP</Button>}
     <Button variant="contained"  color="primary" sx={{mt:2}} size='large' fullWidth onClick={handleSubmit}>
        {"Verify"}
      </Button>
    </DialogContent>
  </Dialog></>
  )
}

export default OTPRegisteration