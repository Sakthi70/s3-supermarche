"use client";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormik } from "formik";
import * as yup from "yup";
// LOCAL CUSTOM COMPONENTS
import "yup-phone-lite";

import EyeToggleButton from "../components/eye-toggle-button";
// LOCAL CUSTOM HOOK

import BoxLink from "../components/box-link";
import usePasswordVisible from "../use-password-visible";
// GLOBAL CUSTOM COMPONENTS

import { H6, Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import BazaarTextField from "components/BazaarTextField";
import { checkEmailExists, registerUser } from "actions/auth";
import useApp from "hooks/useApp";
import Warning from "components/warning/warning";
import { useState } from "react";
import axios from "axios";
import { generateOTP } from "utils/util";
import { registerPlainTemplate, registerTemplate } from "utils/mailTemplate";
import { useRouter } from "next/navigation";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { Box, FormControl, FormHelperText } from "@mui/material";
import OTPRegisteration from "components/utils/OTP/OTPRegisteration";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const RegisterPageView = () => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();

  const { loading } = useApp();

  const [error, seterror] = useState("");
  const [otpDailog, setotpDailog] = useState(false);
  const [phoneOtp, setphoneOtp] = useState("");
  // COMMON INPUT PROPS FOR TEXT FIELD
  const [otp, setotp] = useState("");

  const router = useRouter();

  const inputProps = {
    endAdornment: (
      <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
    ),
  };
  // REGISTER FORM FIELDS INITIAL VALUES

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
    dob: "",
    agreement: false,
  };
  // REGISTER FORM FIELD VALIDATION SCHEMA

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    phone: yup
      .string()
      .phone("FR", "Please enter a valid phone number")
      .required("Phone number is required"),
    password: yup.string().required("Password is required"),
    re_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please re-type password"),
    agreement: yup.bool(),
    dob: yup
      .date()
      .required("Birth date is required")
      // .test("age", "You must be 18 or older", function (dob) {
      //   const cutoff = new Date();
      //   cutoff.setFullYear(cutoff.getFullYear() - 18);
      //   return dob <= cutoff;
      // }),
    // .test("agreement", "You have to agree with our Terms and Conditions!", value => value === true)
    // .required("You have to agree with our Terms and Conditions!")
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!values.agreement) {
        seterror(`You have to agree with our Terms and Conditions!`);
      } else {
        loading(true);
        await checkEmailExists(values.email)
          .then(async (exists) => {
            if (exists) {
              seterror(`User with email ${values.email} already exist!`);
            } else {
              let otpValue = generateOTP();
              let phoneOtpValue = generateOTP();
              console.log(phoneOtpValue);
              setphoneOtp(phoneOtpValue);
              setotp(otpValue);
              try {
                const response = await axios.post("/api/send-email", {
                  email: values.email,
                  subject: "S3 Supermarche Registeration",
                  message: registerPlainTemplate(values.name, otpValue),
                  html: registerTemplate(values.name, otpValue),
                });
                setotpDailog(true);
              } catch (error) {
                // alert(error.response?.data?.error || 'Failed to send email');
              }
            }
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => loading(false));
      }
    },
  });

  const handleResendEmailOTP = async () => {
    try {
      const response = await axios.post("/api/send-email", {
        email: values.email,
        subject: "S3 Supermarche Registeration",
        message: registerPlainTemplate(values.name, otp),
        html: registerTemplate(values.name, otp),
      });
    } catch (error) {
      // alert(error.response?.data?.error || 'Failed to send email');
    }
  };

  const handleResendPhoneOTP = async () => {};

  const handleRegister = async () => {
    loading(true);
    try {
      await registerUser({
        ...values,
      }).then(() => router.replace("/"));
    } catch (e) {
    } finally {
      loading(false);
    }
  };

  const handlePhoneChange = (newValue) => {
    setFieldValue("phone", newValue);
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="name"
            size="small"
            label="Full Name"
            variant="outlined"
            onBlur={handleBlur}
            value={values.name}
            onChange={handleChange}
            placeholder="Ralph Awards"
            error={!!touched.name && !!errors.name}
            helperText={touched.name && errors.name}
          />

          <BazaarTextField
            mb={1.5}
            fullWidth
            name="email"
            size="small"
            type="email"
            variant="outlined"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            label="Email"
            placeholder="exmple@mail.com"
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
          <Box  sx={{ display: { sm: "flex" }, mb:{sx:1.5, sm:0} }} gap={1}>
            <Box>
              <H6 mb={1} fontSize={13} color="grey.700">
                {"Phone Number"}
              </H6>
              <MuiTelInput
                forceCallingCode
                disableDropdown
                sx={{ mb: 1.5 }}
                langOfCountryName="fr"
                fullWidth
                InputProps={{ size: "small", sx: { p: 0.5 } }}
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                defaultCountry="FR"
                value={values.phone}
                onChange={handlePhoneChange}
              />
            </Box>
            <Box>
              <H6 mb={1} fontSize={13} color="grey.700">
                {"Date of Birth"}
              </H6>
              <MobileDatePicker
                disableFuture
                
                format="dd-MM-yyyy"
                sx={{
                  "& .MuiInputBase-input": {
                    padding: 1.5,
                  },
                }}
                value={values.dob}
                slotProps={{
                  toolbar:{hidden:true},
                  textField: {
                    error: !!touched.dob && !!errors.dob,
                    helperText: touched.dob && errors.dob,
                    fullWidth:true
                  },
                }}
                onChange={(newValue) => setFieldValue("dob", newValue)}
              />
            </Box>
          </Box>
          <Box sx={{ display: { sm: "flex" } }} gap={1}>
            <BazaarTextField
              mb={1.5}
              fullWidth
              size="small"
              name="password"
              label="Password"
              variant="outlined"
              autoComplete="on"
              placeholder="*********"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              type={visiblePassword ? "text" : "password"}
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              InputProps={inputProps}
            />

            <BazaarTextField
              fullWidth
              size="small"
              autoComplete="on"
              name="re_password"
              variant="outlined"
              label="Retype Password"
              placeholder="*********"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.re_password}
              type={visiblePassword ? "text" : "password"}
              error={!!touched.re_password && !!errors.re_password}
              helperText={touched.re_password && errors.re_password}
              InputProps={inputProps}
            />
          </Box>
          <FormControlLabel
            name="agreement"
            className="agreement"
            onChange={handleChange}
            control={
              <Checkbox
                size="small"
                color="secondary"
                checked={values.agreement || false}
              />
            }
            label={
              <FlexBox
                flexWrap="wrap"
                alignItems="center"
                justifyContent="flex-start"
                gap={1}
              >
                <Span
                  display={{
                    sm: "inline-block",
                    xs: "none",
                  }}
                >
                  By signing up, you agree to
                </Span>
                <Span
                  display={{
                    sm: "none",
                    xs: "inline-block",
                  }}
                >
                  Accept Our
                </Span>
                <BoxLink title="Terms & Condition" href="/" />
              </FlexBox>
            }
          />

          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Create Account
          </Button>
        </LocalizationProvider>
      </form>
      <OTPRegisteration
        email={values.email}
        mailOTP={otp}
        phoneOTP={phoneOtp}
        resendEmail={handleResendEmailOTP}
        resendPhone={handleResendPhoneOTP}
        phone={values.phone}
        open={otpDailog}
        handleClose={() => setotpDailog(false)}
        formSubmit={handleRegister}
      />
      <Warning
        content={error}
        handleClose={() => seterror("")}
        open={error !== ""}
        title={"Registeration Error"}
      />
    </>
  );
};

export default RegisterPageView;
