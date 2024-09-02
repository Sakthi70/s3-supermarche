"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup"; 
// GLOBAL CUSTOM COMPONENTS

import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box"; 
// STYLED COMPONENTS

import { UploadImageBox, StyledClear } from "../styles"; 
import { useRouter } from "next/navigation";
import { deleteUpload, imageUpload } from "utils/cloudinary";
import useApp from "hooks/useApp";
import Warning from "components/warning/warning";
import MUIRichTextEditor from "mui-rte";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { addDays } from 'date-fns'
import { createBanner, updateBanner } from "actions/banner";
import PageContentWithEditor from "components/utils/PageContentWithEditor";
import _ from "lodash";
import { CircularProgress } from "@mui/material";

// FORM FIELDS VALIDATION

const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title required")
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

export default function BannerForm({isEdit, banner = {}}) {
  const router = useRouter()
  const [files, setFiles] = useState([]);
  const INITIAL_VALUES = {
    title: "",
    description: "",
    expires:null,
    type:1
  };
  const rteref = useRef(null);

  const {loading} = useApp();

    const [error, setError] = useState("");


  const handleFormSubmit = async(values) => {
    loading(true);
    if(isEdit){
      let data = {
        title: values.title.trim(),
        description: rteref.current?.editor?.getHTML(),
        expires: values.expires,
      }
        let result = '';
        if(banner.image !== '' && values.image === ''){
          await deleteUpload(banner.image, 'Banner');
          data.image = "";
        }
        if(files.length > 0){
             result = await imageUpload(files[0], 'Banner');
             data.image = result
      }
          
       await updateBanner( data,banner.id).then(value => {
        router.replace('/admin/banners'); 
       });
      
    }
    else{
      let result = '';
      if(files.length > 0){
           result = await imageUpload(files[0], 'Banner');
    }
      await createBanner( {...values,description:rteref.current?.editor?.getHTML()},result).then(values => {
        router.replace('/admin/banners'); 
      });
    
  }
    loading(false)
  }; 
// HANDLE UPDATE NEW IMAGE VIA DROP ZONE


    
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

  if( isEdit && _.isEmpty(banner) ){
    return <Box height={400} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}><CircularProgress/></Box>
  }


  return <Card className="p-3">
    <Warning content={error} title={'Error'} open={error !=''} handleClose={() =>{setError('')}}/>
      <Formik onSubmit={handleFormSubmit} enableReinitialize={true} initialValues={isEdit ? {...banner}: INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA}>
        {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit
      }) => <form onSubmit={handleSubmit}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={8}>
                <TextField fullWidth name="title" label="Title" color="info" size="medium" placeholder="Title" value={values.title} onBlur={handleBlur} onChange={handleChange} helperText={touched.title && errors.title} error={Boolean(touched.title && errors.title)} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DatePicker disablePast format="dd/MM/yyyy" onChange={(value) => setFieldValue('expires', value)} defaultValue={values.expires} minDate={addDays(new Date(), 1)} disableHighlightToday slotProps={{textField:{fullWidth:true,size:'medium', color:'info'}}}  label="Expires on" />
              </Grid>
              <Grid item xs={12}>
                  <PageContentWithEditor value={values.description} rteRef={rteref}/>
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

              {/* <Grid item  xs={12}>
                <FormControlLabel disabled={isFeatured || (values.best || values.additional)} label="Featured Category" control={<Checkbox color="info" name="featured" onBlur={handleBlur} onChange={handleChange} value={values.featured} checked={values.featured}/>} />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel disabled={isBest || (values.featured || values.additional)}  label="Best Category" control={<Checkbox color="info" name="best" onBlur={handleBlur} onChange={handleChange} value={values.best} checked={values.best} />} />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel disabled={isAdditional || (values.best || values.featured)}  label="Additional Category" control={<Checkbox color="info" name="additional" onBlur={handleBlur} onChange={handleChange} value={values.additional} checked={values.additional}/>} />
                </Grid> */}

              <Grid item xs={12}  display={'flex'} justifyContent={'end'} gap={2}>
            
              <Button variant="outlined" color="info" onClick={() =>   router.replace('/admin/banners')}>
                  Cancel
                </Button>
                <Button variant="contained" color="info" type="submit">
                  Save Banner
                </Button>
              </Grid>
            </Grid>
                </LocalizationProvider>
          </form>}
      </Formik>
    </Card>;
}