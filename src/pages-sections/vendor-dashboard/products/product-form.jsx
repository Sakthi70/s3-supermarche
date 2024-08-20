"use client";

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup"; 
// GLOBAL CUSTOM COMPONENTS

import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box"; 
// STYLED COMPONENTS

import { UploadImageBox, StyledClear } from "../styles"; 
import useApp from "hooks/useApp";
import { Avatar, InputAdornment, Select, Typography } from "@mui/material";
import { stringAvatar } from "utils/util";
import PageContentWithEditor from "components/utils/PageContentWithEditor";

const Amount =  {
  startAdornment: <InputAdornment position="start">€</InputAdornment>,
};
// FORM FIELDS VALIDATION SCHEMA

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array(yup.string()).min(1, "Category must have at least 1 items").required("Category is required!"),
  description: yup.string().required("Description is required!"),
  stock: yup.number().required("Stock is required!"),
  price: yup.number().required("Price is required!"),
  sale_price: yup.number().optional(),
  tags: yup.string().required("Tags is required!")
}); 
// ================================================================


// ================================================================
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ProductForm({isEdit=false}) {
  const {loading,content} = useApp();
  const rteref = useRef(null);

  const {categories} = content || {categories:[]};
  const INITIAL_VALUES = {
    name: "",
    tags: "",
    stock: "",
    price: "",
    category: "",
    sale_price: "",
    description: ""
  };

  const handleFormSubmit = values => {
    console.log(values);
  };

  const [files, setFiles] = useState([]); 
// HANDLE UPDATE NEW IMAGE VIA DROP ZONE

  const handleChangeDropZone = files => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles((prev) => {return [...prev,...files]});
  }; 
// HANDLE DELETE UPLOAD IMAGE


  const handleFileDelete = file => () => {
    setFiles(files => files.filter(item => item.name !== file.name));
  };

  return <Card className="p-3">
      <Formik onSubmit={handleFormSubmit} initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA}>
        {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="name" label="Name" color="info" size="medium" placeholder="Name" value={values.name} onBlur={handleBlur} onChange={handleChange} helperText={touched.name && errors.name} error={Boolean(touched.name && errors.name)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Select disabled={isEdit}  MenuProps={MenuProps}  fullWidth color="info" size="medium" name="category" onBlur={handleBlur} value={values.category} onChange={handleChange} placeholder="Category" >
               { categories && categories.map(data => <MenuItem key={data.id} value={data.slug}> <Box display={'flex'} alignItems={'center'} gap={2}> <Avatar 
               
               {...(data.image === '' ? stringAvatar(data.name, {
                borderRadius: 2,
                mr:2
              }) : {alt: data.name, src:data.image, sx: {borderRadius: 2,
                mr:2}})}
          
          
        /> <Typography variant="subtitle2"> {data.slug}</Typography> </Box></MenuItem>)
          }
                </Select>
              </Grid>
              <Grid item xs={12}>
                <DropZone multiple={true} onChange={files => handleChangeDropZone(files)} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                return <UploadImageBox key={index}>
                        <Box component="img" src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>;
              })}
                </FlexBox>
              </Grid>

              <Grid item xs={12}>
                  <PageContentWithEditor value={values.description} rteRef={rteref}/>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="stock" color="info" size="medium" label="Stock" placeholder="Stock" onBlur={handleBlur} value={values.stock} onChange={handleChange} helperText={touched.stock && errors.stock} error={Boolean(touched.stock && errors.stock)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="tags" label="Tags" color="info" size="medium" placeholder="Tags" onBlur={handleBlur} value={values.tags} onChange={handleChange} helperText={touched.tags && errors.tags} error={Boolean(touched.tags && errors.tags)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField   InputProps={{...Amount}} fullWidth name="price" color="info" size="medium" type="number" onBlur={handleBlur} value={values.price} label="Regular Price" onChange={handleChange} placeholder="Regular Price" helperText={touched.price && errors.price} error={Boolean(touched.price && errors.price)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField  InputProps={{...Amount}} fullWidth color="info" size="medium" type="number" name="sale_price" label="Sale Price" onBlur={handleBlur} onChange={handleChange} placeholder="Sale Price" value={values.sale_price} helperText={touched.sale_price && errors.sale_price} error={Boolean(touched.sale_price && errors.sale_price)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Card elevation={3} sx={{padding:2}}>
                <Grid container spacing={3}>
                <Grid item xs={12} >
                <Select disabled={isEdit}  MenuProps={MenuProps}  fullWidth color="info" size="medium" name="category" onBlur={handleBlur} value={values.category} onChange={handleChange} placeholder="Category" >
               { categories && categories.map(data => <MenuItem key={data.id} value={data.slug}>  
       <Typography variant="subtitle2"> {data.slug}</Typography></MenuItem>)
          }
                </Select>
              </Grid>
                  <Grid item xs={12}>
                  <DropZone multiple={true} onChange={files => handleChangeDropZone(files)} />

                  <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                    {files.map((file, index) => {
                  return <UploadImageBox key={index}>
                          <Box component="img" src={file.preview} width="100%" />
                          <StyledClear onClick={handleFileDelete(file)} />
                        </UploadImageBox>;
                })}
                  </FlexBox>
                </Grid>
                <Grid item  xs={12}>
                <TextField  fullWidth name="price" color="info" size="medium" type="number" onBlur={handleBlur} value={values.price} label="Regular Price" onChange={handleChange} placeholder="Regular Price" helperText={touched.price && errors.price} error={Boolean(touched.price && errors.price)} />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth color="info" size="medium" type="number" name="sale_price" label="Sale Price" onBlur={handleBlur} onChange={handleChange} placeholder="Sale Price" value={values.sale_price} helperText={touched.sale_price && errors.sale_price} error={Boolean(touched.sale_price && errors.sale_price)} />
              </Grid>
                </Grid>
                </Card>
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save product
                </Button>
              </Grid>
            </Grid>
          </form>}
      </Formik>
    </Card>;
}

