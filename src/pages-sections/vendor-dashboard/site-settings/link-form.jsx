import { Fragment, useEffect, useState } from "react";
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
import { createFooterLinks, deleteFooterLink, getFooterLinks } from "actions/settings";
import useApp from "hooks/useApp";
import { PageLoader } from "../categories/page-view/create-category";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const LinkForm = () => {

  const [links, setLinks] = useState();
  const {loading} =useApp();


  useEffect(() => {
    getLinks();
  }, [])

  const getLinks =async()=>{
      await getFooterLinks().then((footerLinks) => {setLinks(footerLinks)})
  }

  const handleFormSubmit = async values => {
    loading(true);
    await createFooterLinks(values.links.filter(x=> !(!x.id && x.name.trim() === '' && x.url.trim() === ''))).then(async() => await getLinks()).finally(() => loading(false))
  };
  

  const handleDelete =async(id)=> {
    loading(true)
      await deleteFooterLink(id).finally(() => loading(false))
  }

  if(!links){
    <PageLoader/>
  }

  return <Formik initialValues={{links:links}} onSubmit={handleFormSubmit}>
      {({
      values,
      handleChange,
      handleBlur,
      setFieldValue,
      enableReinitialize = true,
      resetForm,
      handleSubmit
    }) =>{
      useEffect(() => {
        resetForm({
          values: {
            links:links
          }
        })
      }, [links])

      
    return <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <FieldArray name="links" render={arrayHelper => <Fragment>
                  <Grid item xs={12}>
                    <FlexBox alignItems="center" justifyContent="space-between">
                      <H4>Footer Links</H4>

                      <Button color="info" variant="contained" onClick={() => arrayHelper.push({
                name: "",
                url: "",
                col:2
              })}>
                        Add Item
                      </Button>
                    </FlexBox>
                  </Grid>

                  {values?.links && values.links.map((item, index) => <Grid item container spacing={2} key={index}>
                      <Grid item xs={12} sm={3}>
                        <TextField fullWidth color="info" size="medium" label="Name" value={item.name} onBlur={handleBlur} onChange={handleChange} name={`links.${index}.name`} />
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <TextField fullWidth color="info" size="medium" label="URL" value={item.url} onBlur={handleBlur} onChange={handleChange} name={`links.${index}.url`} />
                      </Grid>
                      <Grid item xs={10} sm={3}>
                      <FormControl fullWidth>
        <InputLabel>Footer Header</InputLabel>
        <Select
          value={item.col}
          label="Footer Header"
          onChange={(event) => {
            setFieldValue(`links.${index}.col`,event.target.value);
          }}
        >
          <MenuItem value={2}>Second Column Heading</MenuItem>
          <MenuItem value={3}>Third Column Heading</MenuItem>
        </Select>
      </FormControl>
                      </Grid>
                      <Grid item xs={2} sm={3}>
                        <IconButton onClick={async() => {
                          if(item.id){
                           await  handleDelete(item.id);
                          }
                          arrayHelper.remove(index)}}>
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

export default LinkForm;