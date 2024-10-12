import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Formik } from "formik"; 
// MUI ICON COMPONENTS

import Twitter from "@mui/icons-material/Twitter";
import YouTube from "@mui/icons-material/YouTube";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram"; 
// CUSTOM ICON COMPONENTS

import PlayStore from "icons/PlayStore";
import AppleStore from "icons/AppleStore"; 
// GLOBAL CUSTOM COMPONENT

import { H4 } from "components/Typography";
import { Email, Phone } from "@mui/icons-material";

const SocialLinksForm = ({values, onSave}) => {
 

  const handleFormSubmit = async values => {
   await onSave(values)
  };

  return <Formik onSubmit={handleFormSubmit} initialValues={values}>
      {({
      values,
      handleChange,
      handleBlur,
      handleSubmit
    }) => <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <H4>Social Links</H4>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField fullWidth name="phone" color="info" size="medium" label="Phone" onBlur={handleBlur} value={values.phone} onChange={handleChange} placeholder="0000000000" InputProps={{
            startAdornment: <Phone fontSize="small" color="info" sx={{
              mr: 1
            }} />
          }} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField fullWidth color="info" name="email" size="medium" label="Email" onBlur={handleBlur} value={values.email} onChange={handleChange} placeholder="email@example.com" InputProps={{
            startAdornment: <Email fontSize="small" color="info" sx={{
              mr: 1
            }} />
          }} />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth color="info" size="medium" name="facebook" label="Facebook" value={values.facebook} onChange={handleChange} placeholder="https://example.com" InputProps={{
            startAdornment: <Facebook fontSize="small" color="info" sx={{
              mr: 1
            }} />
          }} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField fullWidth color="info" size="medium" name="twitter" label="Twitter" value={values.twitter} onChange={handleChange} placeholder="https://example.com" InputProps={{
            startAdornment: <Twitter fontSize="small" color="info" sx={{
              mr: 1
            }} />
          }} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField fullWidth color="info" size="medium" name="instagram" label="Instagram" onChange={handleChange} value={values.instagram} placeholder="https://example.com" InputProps={{
            startAdornment: <Instagram fontSize="small" color="info" sx={{
              mr: 1
            }} />
          }} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField fullWidth color="info" size="medium" name="youtube" label="Youtube" value={values.youtube} onChange={handleChange} placeholder="https://example.com" InputProps={{
            startAdornment: <YouTube fontSize="small" color="info" sx={{
              mr: 1
            }} />
          }} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" color="info" variant="contained">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>}
    </Formik>;
};

export default SocialLinksForm;