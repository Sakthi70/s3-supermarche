import { Fragment, useState } from "react";
// MUI

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
// FORMIK

import { useFormik } from "formik";
// YUP

import * as yup from "yup";
// LOCAL CUSTOM COMPONENT

import { H5 } from "components/Typography";
import useApp from "hooks/useApp";
import { Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect } from "react";
// CUSTOM DATA MODEL

const validationSchema = yup.object({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  city: yup.string().required("required"),
  phone: yup.number().required("required"),
});
// ==================================================================


// ==================================================================
export default function EditAddressForm({
  handleEditAddress,
  openModal,
  handleCloseModal,
  currentAddress
}) {

  const { content } = useApp();

  const { settings } = content

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    resetForm,
    touched,
    values
  } = useFormik({
    initialValues: currentAddress,
    validationSchema,
    onSubmit: (values, {
      resetForm
    }) => {
      handleEditAddress(values);
      handleCloseModal();
      resetForm({});
    }
  });
  useEffect(() => {
      resetForm({values:currentAddress})
  }, [openModal])
  
  return <Fragment>
    <Dialog open={openModal} >
      <DialogContent>
        <H5 mb={4}>Edit Address Information</H5>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth type="text" name="name" value={values.name} label="Enter Your Name" onChange={handleChange} helperText={touched.name && errors.name} error={touched.name && Boolean(errors.name)} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth type="text" name="address" label="Address" value={values.address} onChange={handleChange} helperText={touched.address && errors.address} error={touched.address && Boolean(errors.address)} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControl size="small" fullWidth error={ touched.city && Boolean(errors.city)}>
                <InputLabel>City</InputLabel>
                <Select
                  value={values.city}
                  size="small"
                  label="City"
                  onChange={(e) => setFieldValue('city', e.target.value)}
                >
                  {settings.cities.map((x,index) => <MenuItem key={index} value={x}>{x}</MenuItem>)}
                </Select>
                <FormHelperText>{touched.city && errors.city}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth type="text" name="phone" value={values.phone} onChange={handleChange} label="Enter Your Phone" helperText={touched.phone && errors.phone} error={touched.phone && Boolean(errors.phone)} />
            </Grid>
            <Grid item sm={6}  xs={12}>
            <Button color="primary" sx={{mr:1}} variant="text" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </Grid>
            <Grid item xs={12}><Divider /></Grid>
            <Typography pt={1} px={3} color="textSecondary" variant="subtitle2" fontStyle={'italic'}>

              If your city is not listed, we are still working to reach our service to your city
            </Typography>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  </Fragment>;
}