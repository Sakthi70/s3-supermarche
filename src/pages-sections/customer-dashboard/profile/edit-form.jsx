"use client";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; 
// FORMIK
import "yup-phone-lite";
import { Formik } from "formik"; 
// YUP

import * as yup from "yup"; 
import { MuiTelInput } from "mui-tel-input";
import { H6 } from "components/Typography";
import { Box } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { updateUserDetail } from "actions/user";
import { useRouter } from "next/navigation";
import { deleteUpload, imageUpload } from "utils/cloudinary";
import _ from "lodash";
// CUSTOM DATA MODEL


// ==============================================================
export default function ProfileEditForm({
  user,oldImage,newImage,id
}) {
  const INITIAL_VALUES = {
    email: user.email || "",
    phone: user.phone || "",
    name: user.name || "",
    dob: new Date(user.dob) || new Date()
  };
  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    phone: yup
    .string()
    .phone("FR", "Please enter a valid phone number")
    .required("Phone number is required"),
    dob: yup.date().required("Birth date is required")
  });

  const router = useRouter();

  const handleFormSubmit = async values => {
    let data = {
      name: values.name.trim(),
      phone: values.phone,
      dob: values.dob,
    };
        if (oldImage && oldImage === "") {
          await deleteUpload(oldImage, "Profile");
          data.image = "";
        }
        if (newImage && _.isObject(newImage)) {
          data.image = await imageUpload(newImage, "Profile");
        }
    await updateUserDetail(data,id).then(() => router.replace('/profile'))
  };

  return <Formik onSubmit={handleFormSubmit} initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA}>
      {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
    }) => {
      const handlePhoneChange = (newValue) => {
        setFieldValue("phone", newValue);
      };
    return <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField fullWidth name="name" label="Name" onBlur={handleBlur} onChange={handleChange} value={values.name} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField fullWidth disabled name="email" type="email" label="Email" onBlur={handleBlur} value={values.email} onChange={handleChange} error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
            </Grid>

            <Grid item md={6} xs={12}>
            <Box>
              
              <MuiTelInput
                forceCallingCode
                disableDropdown
                sx={{ mb: 1.5 }}
                langOfCountryName="fr"
                fullWidth
                // InputProps={{ size: "small", sx: { p: 0.5 } }}
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                defaultCountry="FR"
                value={values.phone}
                onChange={handlePhoneChange}
              />
            </Box>
              {/* <TextField fullWidth label="Phone" name="phone" onBlur={handleBlur} value={values.phone} onChange={handleChange} error={!!touched.phone && !!errors.phone} helperText={touched.phone && errors.phone} /> */}
            </Grid>

            <Grid item md={6} xs={12}>
            <MobileDatePicker
                disableFuture
                
                format="dd-MM-yyyy"
                sx={{
                  "& .MuiInputBase-input": {
                    // padding: 1.5,
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
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      }}
    </Formik>;
}