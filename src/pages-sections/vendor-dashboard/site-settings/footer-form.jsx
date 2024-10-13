import { Fragment, useRef } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { FieldArray, Formik } from "formik";
// MUI ICON COMPONENT

// GLOBAL CUSTOM COMPONENTS

import DropZone from "components/DropZone";
import PageContentWithEditor from "components/utils/PageContentWithEditor";
import _ from "lodash";
import { Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { StyledClear } from "../styles";
import { deleteUpload } from "utils/cloudinary";

const FooterForm = ({ settings, onSave }) => {

  const rteref = useRef(null);

  const handleFormSubmit = async values => {
    let result = null;
    if (values.footerImage && _.isObject(values.footerImage)) {
      result = await imageUpload(values.footerImage, "Other");
    }else{
      result = values.footerImage;
    }
    if (settings.footerImage  && values.footerImage !== settings.footerImage) {
      await deleteUpload(settings.footerImage, "Other");
    }
   
    await onSave({
      secondHeader: values.secondHeader,
      thirdHeader: values.thirdHeader,
      description: rteref.current?.editor?.getHTML(),
      footerImage: result
    })

  };



  return <Formik initialValues={settings} onSubmit={handleFormSubmit}>
    {({
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
    }) => {
      const handleChangeDropZone = (file) => {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
        setFieldValue('footerImage', file);
      };
      return <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={values.footerImage ? 6:12}>
            {values.footerImage ? 
            <FlexBox position={'relative'} flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
              <Box component={'img'} src={_.isObject(values.footerImage) ? values.footerImage.preview : values.footerImage}>
              </Box>
              <StyledClear onClick={() => setFieldValue('footerImage',null)} />
              </FlexBox> : <DropZone isBoth={true} urlTitle="Footer Image" multiple={false} setFieldValue={(n, val) => setFieldValue('footerImage', val)} urlValues={values.footerImage && !_.isObject(values.footerImage) ? values.footerImage : ''} onChange={files => handleChangeDropZone(files[0])} title="Drag & Drop Footer Logo" />}
          </Grid>

          <Grid item xs={12}>
            <PageContentWithEditor value={values.description} rteRef={rteref} />
            {/* <TextField rows={4} multiline fullWidth color="info" size="medium" onBlur={handleBlur} onChange={handleChange} name="footer_description" label="Footer Description" value={values.footer_description} /> */}
          </Grid>



          <Grid item xs={12} sm={6}>
            <TextField fullWidth color="info" size="medium" onBlur={handleBlur} label="Column Two Heading" onChange={handleChange} name="secondHeader" value={values.secondHeader} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth color="info" size="medium" onBlur={handleBlur} label="Column Three Heading" onChange={handleChange} name="thirdHeader" value={values.thirdHeader} />
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
      </form>
    }}
  </Formik>;
};

export default FooterForm;