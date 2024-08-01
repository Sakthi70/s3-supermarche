"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik } from "formik";
import * as yup from "yup"; 
// GLOBAL CUSTOM COMPONENTS

import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box"; 
// STYLED COMPONENTS

import { UploadImageBox, StyledClear } from "../styles"; 
import { createCategory, getCategories, updateCategory } from "actions/categories";
import { useRouter } from "next/navigation";
import { deleteUpload, imageUpload } from "utils/cloudinary";
import useApp from "hooks/useApp";
import Warning from "components/warning/warning";
import { Avatar, FormControl, InputLabel, Select, Typography } from "@mui/material";
import { stringAvatar } from "utils/util";
// FORM FIELDS VALIDATION

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name required")
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

export default function CategoryForm({isEdit, category = {}}) {
  const router = useRouter()
  const [files, setFiles] = useState([]);
  const INITIAL_VALUES = isEdit ? category : {
    name: "",
    parent: "",
    featured: false,
    best: false,
    additional: false
  };
  

  const {categories : catCrud,loading,content} = useApp();

  const {categories} = content || {categories:[]};
    const [error, setError] = useState("");


  const handleFormSubmit = async(values) => {
    loading(true);
    let isError = false;
    if(isEdit){
      if(values.name.trim().toLowerCase() !== category.name.trim().toLowerCase()){
        if(values.parent !== ""){
          parentId = categories.find(x=> x.slug === values.parent).id;
        if(categories.filter(x=>  x.parentId === parentId).some(x => x.name.trim().toLowerCase() === values.name.trim().toLowerCase())){
          setError('Category name already exist under the parent');
          isError = true;
        }
    }else{
      if(categories.filter(x=> x.parentId === null).some(x => x.name.trim().toLowerCase() === values.name.trim().toLowerCase())){
        setError('Category name already exist');
        isError = true;
      }
    }
      }
      if(!isError){
        let data = {
          name: values.name.trim(),
          featured: values.featured,
          additional: values.additional,
          best: values.best
        }
        let result = '';
        if(category.image !== '' && values.image === ''){
          await deleteUpload(category.image, 'Category');
          data.image = "";
        }
        if(files.length > 0){
             result = await imageUpload(files[0], 'Category');
             data.image = result
      }
          
       await updateCategory( data,category.id).then(value => {
        catCrud.updateCategory(value);
        router.push('/admin/categories'); 
       });
      }
    }
    else{
    let parentId = null;
    if(values.parent !== ""){
          parentId = categories.find(x=> x.slug === values.parent).id;
        if(categories.filter(x=>  x.parentId === parentId).some(x => x.name.trim().toLowerCase() === values.name.trim().toLowerCase())){
          setError('Category name already exist under the parent');
          isError = true;
        }
    }else{
      if(categories.filter(x=> x.parentId === null).some(x => x.name.trim().toLowerCase() === values.name.trim().toLowerCase())){
        setError('Category name already exist');
        isError = true;
      }
    }
    if(!isError){
      let result = '';
      if(files.length > 0){
           result = await imageUpload(files[0], 'Category');
    }
        const {parent, ...data} = values;
      await createCategory( {...data,parentId, slug: values.parent+'/' + values.name.trim(), name: values.name.trim()},result).then(values => {
        catCrud.createCategory(values);
        router.push('/admin/categories'); 
      });
    
    }
  }
    loading(false)
  }; 
// HANDLE UPDATE NEW IMAGE VIA DROP ZONE


    const isFeatured = categories.filter(x => isEdit? x.id != category.id : true).some(x => x.featured === true);
    const isBest = categories.filter(x => isEdit? x.id != category.id : true).some(x => x.best === true);
    const isAdditional = categories.filter(x => isEdit? x.id != category.id : true).some(x => x.additional === true);



  const handleChangeDropZone = files => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);
  }; 
// HANDLE DELETE UPLOAD IMAGE


  const handleFileDelete = file => () => {
    setFiles(files => files.filter(item => item.name !== file.name));
  };


  return <Card className="p-3">
    <Warning content={error} title={'Error'} open={error !=''} handleClose={() =>{setError('')}}/>
      <Formik onSubmit={handleFormSubmit} initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA}>
        {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit
      }) => <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="name" label="Name" color="info" size="medium" placeholder="Name" value={values.name} onBlur={handleBlur} onChange={handleChange} helperText={touched.name && errors.name} error={Boolean(touched.name && errors.name)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Select disabled={isEdit}  MenuProps={MenuProps}  fullWidth color="info" size="medium" name="parent" onBlur={handleBlur} value={values.parent} onChange={handleChange} placeholder="Parent Category" >
              <MenuItem value={""}> <Box display={'flex'} alignItems={'center'} gap={2}>  <Avatar
          {...stringAvatar("E", {
            borderRadius: 2,
            mr:2
          })}
        /> <Typography variant="subtitle2"> {''}</Typography> </Box></MenuItem>
              
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

              {!values.image && <Grid item xs={12}>
                {files.length < 1 && 
                  <DropZone multiple={false} title="Drop & drag category image" onChange={files => handleChangeDropZone(files)} />
                }
                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                return <UploadImageBox key={index}>
                        <Box component="img" alt="product" src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>;
              })}
                </FlexBox>
              </Grid>}

              {values.image && <Grid item xs={12}>
                
                 <UploadImageBox >
                        <Box component="img" alt="product" src={values.image} width="100%" />
                        <StyledClear onClick={() => setFieldValue('image','')} />
                      </UploadImageBox>
              </Grid>}

              <Grid item  xs={12}>
                <FormControlLabel disabled={isFeatured || (values.best || values.additional)} label="Featured Category" control={<Checkbox color="info" name="featured" onBlur={handleBlur} onChange={handleChange} value={values.featured} checked={values.featured}/>} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel disabled={isBest || (values.featured || values.additional)}  label="Best Category" control={<Checkbox color="info" name="best" onBlur={handleBlur} onChange={handleChange} value={values.best} checked={values.best} />} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel disabled={isAdditional || (values.best || values.featured)}  label="Additional Category" control={<Checkbox color="info" name="additional" onBlur={handleBlur} onChange={handleChange} value={values.additional} checked={values.additional}/>} />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save category
                </Button>
              </Grid>
            </Grid>
          </form>}
      </Formik>
    </Card>;
}