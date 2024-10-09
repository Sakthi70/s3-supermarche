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
import {
  Avatar,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import PageContentWithEditor from "components/utils/PageContentWithEditor";
import MultiField from "../../../components/utils/MultiField";
import IOSSwitch from "../../../components/utils/IOSSwitch";
import { useRouter } from "next/navigation";
import { createProduct, updateProductById } from "actions/products";
import { imageUpload } from "utils/cloudinary";
import { ColorPicker } from "mui-color";
import { t } from "utils/util";
import _ from "lodash";
const Amount = {
  startAdornment: <InputAdornment position="start">€</InputAdornment>,
};
// FORM FIELDS VALIDATION SCHEMA

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(t("Name is required!")),
  description: yup.string(),
  category: yup.string()
    .required(t("Category is required!")),
    shortDescription:yup.string()
    .required(t("Short Description is required!")),
  tags: yup.array().optional(),
  brandName: yup.string(),
  price: yup.number().required(t("Price is required!")),
  salePrice: yup.number().nullable().lessThan(yup.ref('price'),(less) => `${t("Sale price must be less than")} €${less.less}`),
  stock: yup.number().required(t("Stock is required!")),
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

const PRODUCT_VALUE =  {
  name: "",
  tags: [],
  stock: "",
  price: "",
  category: "",
  brandName: "",
  brandImage: null,
  limit:null,
  images: [],
  shortDescription:"",
  salePrice: "",
  description: "",
  isBrand: false,
  type: 'Other',
  value: "",
};

export default function ProductForm({ isEdit = false, product }) {

  const { loading, content } = useApp();
  const rteref = useRef(null);

  const router = useRouter();

  const { categories } = content || { categories: [] };

  const parentIds = categories.map(x=> x.parentId);

  const INITIAL_VALUES =  !isEdit ? PRODUCT_VALUE : {...PRODUCT_VALUE,...product,category:product.categoryId};


  const handleFormSubmit = async(values) => {
    if(isEdit){
      loading(true);
      let data = {
        name: values.name,
        categoryId: values.category,
        description: rteref.current?.editor?.getHTML(),
        tags: values.tags,
        isBrand: values.isBrand,
        brandName: values.isBrand ? values.brandName : '',
        price: values.price,
        salePrice: values.salePrice === "" ? null : values.salePrice,
        stock: values.stock,
        limit:values.limit === "" ? null:  values.limit,
        type: values.type,
        value: values.value,
        shortDescription: values.shortDescription
      }

      let result = [...values.images.filter(x=> !_.isObject(x))];
      if(values.images.filter(x=> _.isObject(x)).length > 0){
        let objImages = values.images.filter(x=> _.isObject(x));
        for(let i= 0; i<objImages.length; i++){
          let image =  await imageUpload(objImages[i], 'Product');
          result.push(image);
        }
      }
      data.images= result;
    if(values.isBrand && _.isObject(values.brandImage)){
        let image =  await imageUpload(values.brandImage, 'Brand');
      data.brandImage= image;
    }else{
      data.brandImage = (values.brandImage && values.brandImage.trim() === '') ?  null : values.brandImage;
    }
    await updateProductById(data,product.id).then(values => {
      router.push('/admin/products'); 
    });
      loading(false);
    }else{
    loading(true);
    let data = {
      name: values.name,
      categoryId: values.category,
      description: rteref.current?.editor?.getHTML(),
      tags: values.tags,
      isBrand: values.isBrand,
      brandName: values.isBrand ? values.brandName : '',
      price: values.price,
      salePrice: values.salePrice === "" ? null : values.salePrice,
      limit:values.limit === "" ? null : values.limit,
      stock: values.stock,
      type: values.type,
      value: values.value,
      shortDescription: values.shortDescription
    }
    if(values.images.length > 0){
        
        let result = [];
        for(let i= 0; i<values.images.length; i++){
          if(_.isObject(values.images[i])){
            let image =  await imageUpload(values.images[i], 'Product');
            result.push(image);
          }else{
            if(values.images[i] && values.images[i].trim() !== ''){
              result.push(values.images[i]);
            }
          }
        }
        data.images= result;
    }
    if(values.isBrand && _.isObject(values.brandImage)){
        let image =  await imageUpload(values.brandImage, 'Brand');
      data.brandImage= image;
    }else{
      data.brandImage = (values.brandImage && values.brandImage.trim() === '') ?  null : values.brandImage;
    }
    await createProduct( data).then(values => {
      router.push('/admin/products'); 
    });
    loading(false);
  }
  };

  return (
    <Card className="p-3">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const handleChangeDropZone = (files, name, isMulti = true) => {
            files.forEach((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
            if(isMulti){
              setFieldValue(name, [...values[name] ?? [], ...files])
            }else{
              setFieldValue(name, files[0])
            }
          };
          // HANDLE DELETE UPLOAD IMAGE
        
          const handleFileDelete = (file,name,index)  => {
            setFieldValue(name, values[name].filter((item, ind) => ind !== index))
          };

          const handleFileDelete1 = (file,name)  => {
            setFieldValue(name, null);
          };

          const typeChange = (event) => {
              setFieldValue(`type`, event.target.value);
              setFieldValue(`value`, "");
          };

          return <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} display={'flex'} spacing={2} justifyContent={"end"}>
              <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={values.isBrand}
                      onChange={(event) =>
                        setFieldValue("isBrand", event.target.checked)
                      }
                    />
                  }
                  label={t("Add Brand")}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label={t("Name")}
                  color="info"
                  size="medium"
                  placeholder={t("Name")}
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
              <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                  <InputLabel>
                  {t("Category")}
                  </InputLabel>
                <Select
                  // disabled={isEdit}
                  MenuProps={MenuProps}
                  fullWidth
                  color="info"
                  size="medium"
                  name="category"
                  label={t('Category')}
                  onBlur={handleBlur}
                  value={values.category}
                  onChange={handleChange}
                  placeholder={t("Category")}
                  error={Boolean(touched.category && errors.category)}
                >
                  {categories &&
                     categories.filter(x => !parentIds.includes(x.id)).map((data) => (
                      <MenuItem key={data.id} value={data.id}>
                        {" "}
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          {data.name}
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
                {Boolean(touched.category && errors.category) && <FormHelperText>{touched.category && errors.category}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={values.isBrand ? 6: 12}>
                <DropZone
                  multiple={true}
                  isBoth={true}
                  name={'images'}
                  urlTitle="Product Images"
                  urlValues={values.images.filter(x => !_.isObject(x))}
                      setFieldValue={(name,val) => {if(val){ setFieldValue(name,[...values.images, val])}}}

                  onChange={(files) => handleChangeDropZone(files, 'images')}
                />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {values.images.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <Box component="img" src={ _.isObject(file) ? file.preview: file} width="100%" />
                        <StyledClear onClick={() => handleFileDelete(file,'images',index)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>

              {values.isBrand && <Grid item xs={12} sm={6} display={'flex'} flexDirection={'column'} gap={2}>
              <TextField
                  fullWidth
                  name="brandName"
                  label={t("Brand Name")}
                  color="info"
                  size="medium"
                  placeholder={t("Brand Name")}
                  value={values.brandName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {( values.brandImage === null && !_.isObject(values.brandImage)) && <DropZone
                  isBoth={true}
                  name={'brandImage'}
                  urlTitle="Brand Images"
                  urlValues={_.isObject(values.brandImage) ? "" : values.brandImage}
                      setFieldValue={setFieldValue}
                title={t("Drag & drop brand image here")}
                  multiple={false}
                  onChange={(files) => handleChangeDropZone(files, 'brandImage', false)}
                />}

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {values.brandImage && values.brandImage &&
                      <UploadImageBox >
                        <Box component="img" src={_.isObject(values.brandImage) ? values.brandImage.preview: values.brandImage} width="100%" />
                        <StyledClear onClick={() => handleFileDelete1(values.brandImage,'brandImage')} />
                      </UploadImageBox>
                  }
                </FlexBox>
              </Grid>}
              <Grid item  xs={12}>
                <TextField
                  fullWidth
                  name="shortDescription"
                  label={t("Short Description")}
                  color="info"
                  size="medium"
                  multiline
                  placeholder={t("Short Description")}
                  value={values.shortDescription}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.shortDescription && errors.shortDescription}
                  error={Boolean(touched.shortDescription && errors.shortDescription)}
                />
              </Grid>
              <Grid item xs={12}>
                <PageContentWithEditor
                  value={values.description}
                  rteRef={rteref}
                  helperText={touched.description && errors.description}
                  error={Boolean(touched.description && errors.description)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <MultiField
                  label={t("Tags")}
                  name={"tags"}
                  values={values.tags}
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box display={'flex'} gap={2}>
                <TextField
                  fullWidth
                  name="stock"
                  type="number"
                  color="info"
                  size="medium"
                  label={t("Stock")}
                  placeholder={t("Stock")}
                  onBlur={handleBlur}
                  value={values.stock}
                  onChange={handleChange}
                  helperText={touched.stock && errors.stock}
                  error={Boolean(touched.stock && errors.stock)}
                />
                <TextField
                  fullWidth
                  name="limit"
                  type="number"
                  color="info"
                  size="medium"
                  label={t("Limit")}
                  placeholder={t("Limit")}
                  onBlur={handleBlur}
                  value={values.limit}
                  onChange={handleChange}
                  helperText={touched.limit && errors.limit}
                  error={Boolean(touched.limit && errors.limit)}
                />
                </Box>
               
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  InputProps={{ ...Amount }}
                  fullWidth
                  name="price"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.price}
                  label={t("Regular Price")}
                  onChange={handleChange}
                  placeholder={t("Regular Price")}
                  helperText={touched.price && errors.price}
                  error={Boolean(touched.price && errors.price)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  InputProps={{ ...Amount }}
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  name="salePrice"
                  label={t("Sale Price")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={t("Sale Price")}
                  value={values.salePrice}
                  helperText={touched.salePrice && errors.salePrice}
                  error={Boolean(touched.salePrice && errors.salePrice)}
                />
              </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>
                    {t("Variant Type")}
                  </InputLabel>
                  <Select
                    value={values.type}
                    label={t("Variant Type")}
                    onChange={typeChange}
                  >
                    <MenuItem value={'Other'}>{t("Other")}</MenuItem>
                    <MenuItem value={'Colour'}>{t("Colour")}</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            {values.type === 'Other' ? (
              <TextField
                fullWidth
                name={'value'}
                label={t("Variant")}
                color="info"
                size="medium"
                placeholder={t("Variant")}
                value={values.value}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={touched.value && errors.value}
                error={Boolean(touched.value && errors.value)}
              />
            ) : (
              <ColorPicker
                hideTextfield
                disableAlpha
                value={values.value}
                defaultValue="transparent"
                onChange={(color) =>
                  setFieldValue(`value`, color.value)
                }
              />
            )}
            </Grid>
            </Grid>
            <Box p={2} display={'flex'} gap={2} justifyContent={'end'}>
            <Button variant="outlined" color="info" onClick={() => router.replace('/admin/products')}>
                  {t("Cancel")}
                </Button>
            <Button variant="contained" color="info" type="submit">
                  {t("Save product")}
                </Button>
            </Box>
          </form>
        }}
      </Formik>
    </Card>
  );
}
