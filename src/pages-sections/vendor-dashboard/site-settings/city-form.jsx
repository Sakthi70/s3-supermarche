import { Fragment, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { FieldArray, Formik } from "formik"; 
// GLOBAL CUSTOM COMPONENTS

import { H4 } from "components/Typography";
import { FlexBox } from "components/flex-box";

const CityForm = ({cities,onSave}) => {

  const handleFormSubmit = async values => {
    await onSave({cities: values.cities.filter(x => !(x.city.trim() === '' && x.zip.trim() === '')).map(x => `${x.city.trim()} - ${x.zip.trim()}`)})
  };

  return <Formik initialValues={ {cities: cities.map(x => {
    let data = x.split(' - ');
    return {
      city : data.length > 0 ? data[0] : '',
      zip: data.length > 1 ? data[1] : '',
    }
  })}} onSubmit={handleFormSubmit}>
      {({
      values,
      handleChange,
      handleBlur,
      resetForm,
      enableReinitialize,
      handleSubmit
    }) =>
     {
      useEffect(() => {
        resetForm({
          values: {cities: cities.map(x => {
            let data = x.split(' - ');
            return {
              city : data.length > 0 ? data[0] : '',
              zip: data.length > 1 ? data[1] : '',
            }
          })}
        })
      }, [cities])
      
      return <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <FieldArray name="cities" render={arrayHelper => <Fragment>
                  <Grid item xs={12}>
                    <FlexBox alignItems="center" justifyContent="space-between">
                      <H4>Supported Cities</H4>

                      <Button color="info" variant="contained" onClick={() => arrayHelper.push({
                city: "",
                zip: ""
              })}>
                        Add Item
                      </Button>
                    </FlexBox>
                  </Grid>

                  {values?.cities.map((item, index) => <Grid item container spacing={2} key={index}>
                      <Grid item xs={5}>
                        <TextField fullWidth color="info" size="medium" label="City" value={item.city} onBlur={handleBlur} onChange={handleChange} name={`cities.${index}.city`} />
                      </Grid>

                      <Grid item xs={5}>
                        <TextField fullWidth color="info" size="medium" label="Zip" value={item.zip} onBlur={handleBlur} onChange={handleChange} name={`cities.${index}.zip`} />
                      </Grid>

                      <Grid item xs={2}>
                        <IconButton onClick={() => arrayHelper.remove(index)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>)}
                </Fragment>} />

            <Grid item xs={12}>
              <Button type="submit" color="info" variant="contained">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>}}
    </Formik>;
};

export default CityForm;