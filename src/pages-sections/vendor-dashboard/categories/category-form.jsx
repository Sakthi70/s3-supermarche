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
import { createCategory, getCategories } from "actions/categories";
import { useRouter } from "next/navigation";
import Loading from "app/loading";
// FORM FIELDS VALIDATION

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name required"),
});
// ================================================================

// ================================================================
export default function CategoryForm(props) {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const INITIAL_VALUES = {
    name: "",
    parent: [],
    featured: false,
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories().then((val) => {
      setCategories(val.categories);
    });
  }, []);

  const handleFormSubmit = async(values) => {
    console.log(files[0]);
    setLoading(true);
    await createCategory( values.name,files[0]).then(values => {router.push('/admin/categories'); setLoading(false);});
  };
  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE

  const handleChangeDropZone = (files) => {
    files.forEach((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(files);
  };
  // HANDLE DELETE UPLOAD IMAGE

  const handleFileDelete = (file) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
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
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="parent"
                  onBlur={handleBlur}
                  value={values.parent}
                  onChange={handleChange}
                  placeholder="Parent Category"
                  label="Select Parent Category"
                  SelectProps={{
                    multiple: false,
                  }}
                >
                  {categories &&
                    categories.map((data) => (
                      <MenuItem key={data.id} value={data.id}>
                        {data.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                {files.length < 1 && (
                  <DropZone
                    multiple={false}
                    title="Drop & drag category image"
                    onChange={(files) => handleChangeDropZone(files)}
                  />
                )}
                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <Box
                          component="img"
                          alt="product"
                          src={file.preview}
                          width="100%"
                        />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControlLabel
                  label="Featured Category"
                  control={
                    <Checkbox
                      color="info"
                      name="featured"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.featured}
                    />
                  }
                />
              </Grid>

              {loading ? (
                <Loading />
              ) : (
                <Grid item xs={12}>
                  <Button variant="contained" color="info" type="submit">
                    Save category
                  </Button>
                </Grid>
              )}
            </Grid>
            {error && <p>{error}</p>}
          </form>
        )}
      </Formik>
    </Card>
  );
}
