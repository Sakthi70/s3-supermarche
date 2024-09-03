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
  FormControlLabel,
  IconButton,
  InputAdornment,
  Select,
  Typography,
} from "@mui/material";
import PageContentWithEditor from "components/utils/PageContentWithEditor";
import MultiField from "../../../components/Utils/MultiField";
import ProductType from "../../../components/Utils/ProductType";
import IOSSwitch from "../../../components/Utils/IOSSwitch";
import { Add, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { createProduct } from "actions/products";
import { imageUpload } from "utils/cloudinary";

const Amount = {
  startAdornment: <InputAdornment position="start">€</InputAdornment>,
};
// FORM FIELDS VALIDATION SCHEMA

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  description: yup.string(),
  category: yup.string()
    // .min(1, "Category must have at least 1 items")
    .required("Category is required!"),
  tags: yup.array().optional(),
  brandName: yup.string(),
  price: yup.number().required("Price is required!"),
  salePrice: yup.number().nullable().lessThan(yup.ref('price'),(less) => `Sale price must be less than €${less.less}`),
  stock: yup.number().required("Stock is required!"),
  isMultiPrice: yup.boolean().required(),
  variants: yup.array().of(
    yup.object().shape({
      type: yup.string().required("Type is required!"),
      option: 
   
      yup.string().required("Option is required!"),
      isSubCategory: yup.boolean().required(),
      subType: yup.string().optional(),
      subOption: yup.array().optional(),
      price: yup.number().when("$isMultiPrice", {
        is: (val) => {
          //this will output undefined
          return val === true;
        },
        then: (s) => s.required('Price is Required'),
        otherwise: (s) => s,
      }),
      salePrice: yup.number().nullable().lessThan(yup.ref('price'),(less) => `Sale price must be less than €${less.less}`),
      stock: yup.number().required('Stock is Required'),
    })
  ),
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

export default function ProductForm({ isEdit = false }) {
  const { loading, content } = useApp();
  const rteref = useRef(null);

  const router = useRouter();

  const { categories } = content || { categories: [] };
  const INITIAL_VALUES = {
    name: "",
    tags: [],
    stock: "",
    price: "",
    category: "",
    brandName: "",
    brandImage: [],
    images: [],
    salePrice: "",
    description: "",
    isMultiPrice: false,
    isBrand: false,
    variants: [],
  };


  const handleFormSubmit = async(values) => {
    loading(true);
    let data = {
      name: values.name,
      categoryId: values.category,
      description: rteref.current?.editor?.getHTML(),
      tags: values.tags,
      isBrand: values.isBrand,
      brandName: values.isBrand ? values.brandName : '',
      price: values.price,
      offerPrice: values.salePrice === "" ? null : values.salePrice,
      stock: values.stock,
      isMulti: values.isMultiPrice,
    }
    if(values.images.length > 0){
        
        let result = [];
        for(let i= 0; i<values.images.length; i++){
          let image =  await imageUpload(values.images[i], 'Product');
          result.push(image);
        }
        data.image= result;
    }
    if(values.isBrand && values.brandImage.length > 0){
        let image =  await imageUpload(values.brandImage[0], 'Brand');
      data.brandImage= image;
    }
    let variants = [];
    if(values.variants.length > 0){
      for(let j =0; j< values.variants.length; j++){
        let val = values.variants[j];
        let result = [];
        if(val.images.length > 0){
          for(let i= 0; i<val.images.length; i++){
            let image =  await imageUpload(val.images[i], 'Variant');
            result.push(image);
          }
      }
      let variantData =  {
        type : val.type,
        value: val.option.toString(),
        subType: val.subType,
        isSubCategory: val.isSubCategory,
        subValue: val.isSubCategory ? val.subOption.map(x=> x.toString()):[],
        stock: val.stock,
        price: values.isMultiPrice ? val.price : null,
        image: result,
        offerPrice:values.isMultiPrice ? val.offerPrice === "" ? null:val.offerPrice : null,
      }
      variants.push(variantData);
      }
    data['productVariant'] = {create: variants}
    }
    await createProduct( data).then(values => {
      router.push('/admin/products'); 
    });
    loading(false);
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
          const handleChangeDropZone = (files, name) => {
            files.forEach((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
            setFieldValue(name, [...values[name], ...files])
          };
          // HANDLE DELETE UPLOAD IMAGE
        
          const handleFileDelete = (file,name)  => {
            setFieldValue(name, values[name].filter((item) => item.name !== file.name))
          };

          console.log(errors)
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
                  label="Add Brand"
                />
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={values.isMultiPrice}
                      onChange={(event) =>
                        setFieldValue("isMultiPrice", event.target.checked)
                      }
                    />
                  }
                  label="Multi Price"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Select
                  disabled={isEdit}
                  MenuProps={MenuProps}
                  fullWidth
                  color="info"
                  size="medium"
                  name="category"
                  onBlur={handleBlur}
                  value={values.category}
                  onChange={handleChange}
                  placeholder="Category"
                  error={Boolean(touched.category && errors.category)}
                >
                  {categories &&
                    categories.map((data) => (
                      <MenuItem key={data.id} value={data.id}>
                        {" "}
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          {data.slug}
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={values.isBrand ? 6: 12}>
                <DropZone
                  multiple={true}
                  onChange={(files) => handleChangeDropZone(files, 'images')}
                />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {values.images.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <Box component="img" src={file.preview} width="100%" />
                        <StyledClear onClick={() => handleFileDelete(file,'images')} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>

              {values.isBrand && <Grid item xs={12} sm={6} display={'flex'} flexDirection={'column'} gap={2}>
              <TextField
                  fullWidth
                  name="brandName"
                  label="Brand Name"
                  color="info"
                  size="medium"
                  placeholder="Brand Name"
                  value={values.brandName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <DropZone
                title="Drag & drop brand image here"
                  multiple={false}
                  onChange={(files) => handleChangeDropZone(files, 'brandImage')}
                />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {values.brandImage.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <Box component="img" src={file.preview} width="100%" />
                        <StyledClear onClick={() => handleFileDelete(file,'brandImage')} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>}

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
                  label={"Tags"}
                  name={"tags"}
                  values={values.tags}
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="stock"
                  type="number"
                  color="info"
                  size="medium"
                  label="Stock"
                  placeholder="Stock"
                  onBlur={handleBlur}
                  value={values.stock}
                  onChange={handleChange}
                  helperText={touched.stock && errors.stock}
                  error={Boolean(touched.stock && errors.stock)}
                />
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
                  label="Regular Price"
                  onChange={handleChange}
                  placeholder="Regular Price"
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
                  label="Sale Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Sale Price"
                  value={values.salePrice}
                  helperText={touched.salePrice && errors.salePrice}
                  error={Boolean(touched.salePrice && errors.salePrice)}
                />
              </Grid>
            

              <ProductVariant
                variants={values.variants}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                isMultiPrice={values.isMultiPrice}
                setFieldValue={setFieldValue}
              />

           
            </Grid>
            <Box p={2} display={'flex'} gap={2} justifyContent={'end'}>
            <Button variant="outlined" color="info" onClick={() => router.replace('/admin/products')}>
                  Cancel
                </Button>
            <Button variant="contained" color="info" type="submit">
                  Save product
                </Button>
            </Box>
          </form>
        }}
      </Formik>
    </Card>
  );
}

export const ProductVariant = ({
  variants,
  setFieldValue,
  isMultiPrice,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const INITIAL_VARIANT_VALUES = {
    type: 'Other',
    option: "",
    subType: 'Other',
    subOption: [],
    isSubCategory: false,
    price: "",
    salePrice: "",
    stock: "",
    images: []
  };

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE

  const handleChangeDropZone = (files, index) => {
    files.forEach((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFieldValue(`variants[${index}].images`,[...variants[index].images,...files]);
   
  };
  // HANDLE DELETE UPLOAD IMAGE

  const handleFileDelete = (file, index) => {
    setFieldValue(`variants[${index}].images`,variants[index].images.filter((item) => item.name !== file.name));
  };
  return (
    <>
      {variants.map((variant, index) => (
        <Grid key={index} item sm={6} xs={12}>
          <Card elevation={3} sx={{ padding: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} textAlign={"end"}>

                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={variant.isSubCategory}
                      onChange={(event) =>
                        setFieldValue(
                          `variants[${index}].isSubCategory`,
                          event.target.checked
                        )
                      }
                    />
                  }
                  label="Sub Category"
                />
                <IconButton size="large" color="error" onClick={() => setFieldValue('variants', variants.filter((v,i) => i !== index))}><Delete/></IconButton>
              </Grid>
              <Grid item xs={12}>
                <ProductType
                  index={index}
                  value={variant}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </Grid>
              {variant.isSubCategory && (
                <Grid item xs={12}>
                  <ProductType
                    isMulti={true}
                    index={index}
                    value={variant}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <DropZone
                  multiple={true}
                  onChange={(files) => handleChangeDropZone(files,index)}
                />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {variant.images.map((file, ind) => {
                    return (
                      <UploadImageBox key={ind}>
                        <Box component="img" src={file.preview} width="100%" />
                        <StyledClear onClick={() =>handleFileDelete(file,index)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name={`variants[${index}].stock`}
                  type="number"
                  color="info"
                  size="medium"
                  label="Stock"
                  placeholder="Stock"
                  onBlur={handleBlur}
                  value={variants.stock}
                  onChange={handleChange}
                  helperText={
                    touched.variants && errors.variants &&  touched.variants[index] &&  errors.variants[index] &&
                    touched.variants[index].stock &&
                    errors.variants[index].stock
                  }
                  error={Boolean(
                    touched.variants && errors.variants &&  touched.variants[index] &&  errors.variants[index] &&
                      touched.variants[index].stock &&
                      errors.variants[index].stock
                  )}
                />
              </Grid>
              {isMultiPrice && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name={`variants[${index}].price`}
                      color="info"
                      size="medium"
                      type="number"
                      onBlur={handleBlur}
                      value={variant.price}
                      label="Regular Price"
                      onChange={handleChange}
                      placeholder="Regular Price"
                      helperText={
                        touched.variants && errors.variants &&  touched.variants[index] &&  errors.variants[index] &&
                        touched.variants[index].price &&
                        errors.variants[index].price
                      }
                      error={Boolean(
                        touched.variants && errors.variants &&  touched.variants[index] &&  errors.variants[index] &&
                          touched.variants[index].price &&
                          errors.variants[index].price
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      size="medium"
                      type="number"
                      name={`variants[${index}].salePrice`}
                      label="Sale Price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Sale Price"
                      value={variant.salePrice}
                      helperText={
                        touched.variants && errors.variants &&  touched.variants[index] &&  errors.variants[index] &&
                        touched.variants[index].salePrice &&
                        errors.variants[index].salePrice
                      }
                      error={Boolean(
                        touched.variants && errors.variants &&  touched.variants[index] &&  errors.variants[index] &&
                          touched.variants[index].salePrice &&
                          errors.variants[index].salePrice
                      )}
                      
                    />
                  </Grid>
                </>
              )}
             
            </Grid>
          </Card>
        </Grid>
      ))}{" "}
      <Grid item sm={6} xs={12}>
        <Card>
          <Box
            display={"flex"}
            minHeight={400}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <IconButton
              sx={{ width: 200, height: 200 }}
              onClick={() =>
                setFieldValue("variants", [...variants, INITIAL_VARIANT_VALUES])
              }
            >
              <Box display={"block"}>
                <Add sx={{ fontSize: 100 }} />{" "}
                <Typography variant="h6">Add New Variant</Typography>
              </Box>
            </IconButton>
          </Box>
        </Card>
      </Grid>{" "}
    </>
  );
};
