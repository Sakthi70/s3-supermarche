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
// CUSTOM DATA MODEL

const validationSchema = yup.object({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  city: yup.string().required("required"),
  phone: yup.number().required("required"),
}); 
// ==================================================================


// ==================================================================
export default function NewAddressForm({
  handleAddNewAddress
}) {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  const initialValues = {
    name: "UI Lib",
    address: "321, Subid Bazaar",
    phone: "01789123456",
    city: "Sylhet",
  };
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    values
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, {
      resetForm
    }) => {
      handleAddNewAddress(values);
      handleCloseModal();
      resetForm({});
    }
  });
  return <Fragment>
      <Button color="primary" variant="outlined" onClick={() => setOpenModal(true)}>
        Add New Address
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <H5 mb={4}>Add New Address Information</H5>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth type="text" name="name" value={values.name} label="Enter Your Name" onChange={handleChange} helperText={touched.name && errors.name} error={touched.name && Boolean(errors.name)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth type="text" name="address" label="Address" value={values.address} onChange={handleChange} helperText={touched.address && errors.address} error={touched.address && Boolean(errors.address)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth type="text" name="street2" label="Address line 2" value={values.street2} onChange={handleChange} helperText={touched.street2 && errors.street2} error={touched.street2 && Boolean(errors.street2)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth type="text" name="phone" value={values.phone} onChange={handleChange} label="Enter Your Phone" helperText={touched.phone && errors.phone} error={touched.phone && Boolean(errors.phone)} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>;
}