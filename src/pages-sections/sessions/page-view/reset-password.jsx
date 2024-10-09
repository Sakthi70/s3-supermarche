"use client";

import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup"; 
// LOCAL CUSTOM COMPONENT

import BoxLink from "../components/box-link"; 
// GLOBAL CUSTOM COMPONENTS

import { H3 } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import BazaarTextField from "components/BazaarTextField";
import usePasswordVisible from "../use-password-visible";
import EyeToggleButton from "../components/eye-toggle-button";
import useApp from "hooks/useApp";
import { checkEmailExists } from "actions/auth";
import axios from "axios";
import { generateOTP } from "utils/util";
import OTP from "components/utils/OTP/otp";
import { getplainResetTemplate, resetPasswordTemplate } from "utils/mailTemplate";
import Warning from "components/warning/warning";
import { updateUserPassword } from "actions/user";
import { useRouter } from "next/navigation";

const ResetPassword = ({isEdit= false,email,executeCallBack}) => {

  const [otp, setotp] = useState("");
  const [error, seterror] = useState("");
  const [otpDailog, setotpDailog] = useState(false);
  const router = useRouter();
  const {loading}=useApp()
  const {
    visiblePassword,
    togglePasswordVisible
  } = usePasswordVisible(); 
  const inputProps = {
    endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
  }; 
// FORM FIELD INITIAL VALUE
  const initialValues = {
    email: "",
    password: "",
    re_password: "",
    isverified: false
  }; 
// FORM FIELD VALIDATION SCHEMA

  const validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("Email is required"),
    isverified: yup.bool(),
    password:  yup.string().when('isverified', {
      is: true, 
      then: () => yup.string().required('Password is required'), }),
    re_password: yup.string().when('isverified', {
      is: true, 
      then: () => yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Please re-type password"), })
    
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit
  } = useFormik({
    initialValues : isEdit ? {...initialValues,isverified:true,email:email}: initialValues ,
    validationSchema,
    onSubmit: async(values) => {
      if(values.isverified){
        loading(true);
        await updateUserPassword(values).then(() => {
          isEdit ? executeCallBack(): router.replace('/login')
        }).finally(() => loading(false))
      }else{
        loading(true);
        await checkEmailExists(values.email)
        .then(async(exists) => {
          if (!exists) {
            seterror(`User with email ${values.email} does not exist!`)
          } else {
            let otpValue = generateOTP();
            setotp(otpValue);
            try {
              const response = await axios.post('/api/send-email', {
                email: values.email,
                subject: 'S3 Supermarche Email Verification',
                message: getplainResetTemplate(otpValue),
                html: resetPasswordTemplate(otpValue)
              });
              setotpDailog(true);
          
        } catch (error) {
          // alert(error.response?.data?.error || 'Failed to send email');
        }
      }
        })
        .catch(err => {
          console.error(err);
        }).finally(() => loading(false));
      }
    }
  });

  const handleReset =() => {
    setFieldValue('isverified', true)
  }
  return <Fragment>
    <OTP otp={otp} title={'Email Verification OTP'}  content={'Enter the otp recieved in the email'} open={otpDailog} handleClose={() => setotpDailog(false)} onSubmit={handleReset} submit={'Submit'}/>
    <Warning content={error} handleClose={() => seterror("")} open={error !==""} title={'Reset Password Error'}  />

      <H3 mb={3} textAlign="center">
        Reset your password
      </H3>

      {
      /* FORM AREA */
    }
      { <Box onSubmit={handleSubmit} component="form" display="flex" flexDirection="column" gap={2}>
        {!values.isverified &&<><TextField fullWidth name="email" type="email" label="Email" onBlur={handleBlur} value={values.email} onChange={handleChange} helperText={touched.email && errors.email} error={Boolean(touched.email && errors.email)} />

        <Button fullWidth type="submit" color="primary" variant="contained">
          Reset
        </Button></>
        }
        {values.isverified && <>
        <BazaarTextField mb={1.5} fullWidth size="small" name="password" label="Password" variant="outlined" autoComplete="on" placeholder="*********" onBlur={handleBlur} onChange={handleChange} value={values.password} type={visiblePassword ? "text" : "password"} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} InputProps={inputProps} />

<BazaarTextField mb={1.5}  fullWidth size="small" autoComplete="on" name="re_password" variant="outlined" label="Retype Password" placeholder="*********" onBlur={handleBlur} onChange={handleChange} value={values.re_password} type={visiblePassword ? "text" : "password"} error={!!touched.re_password && !!errors.re_password} helperText={touched.re_password && errors.re_password} InputProps={inputProps} />

<Button fullWidth type="submit" color="primary" variant="contained" size="large">
        Reset Password
      </Button>
</>}
      </Box>}

      {
      /* BOTTOM LINK AREA */
    }
     {!isEdit && <FlexRowCenter mt={3} justifyContent="center" gap={1}>
        Don&apos;t have an account?
        <BoxLink title="Register" href="/register" />
      </FlexRowCenter>}
      
    </Fragment>;
};

export default ResetPassword;