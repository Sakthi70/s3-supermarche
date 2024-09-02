import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import MultiField from "./MultiField";
import { ColorPicker } from "mui-color";
import { Add, Delete } from "@mui/icons-material";

const ProductType = ({
  isMulti = false,
  value,
  index,
  setFieldValue,
  handleBlur,
  handleChange,
  touched,
  errors,
}) => {
  const typeChange = (event) => {
    if (isMulti) {
      setFieldValue(`variants[${index}].subType`, event.target.value);
      setFieldValue(`variants[${index}].subOption`, []);
    } else {
      setFieldValue(`variants[${index}].type`, event.target.value);
      setFieldValue(`variants[${index}].option`, "");
    }
  };
  console.log(value.option)
  return (
    <Grid container gap={2}>
      <Grid xs={12}>
        <FormControl fullWidth>
          <InputLabel>
            {isMulti ? "Product Sub Variant" : "Product Variant"}
          </InputLabel>
          <Select
            value={!isMulti ? value.type : value.subType}
            label={isMulti ? "Product Sub Variant" : "Product Variant"}
            onChange={typeChange}
          >
            <MenuItem value={'Other'}>Other</MenuItem>
            <MenuItem value={'Colour'}>Colour</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={12}>
        {!isMulti ? (
          <>
            {value.type === 'Other' ? (
              <TextField
                fullWidth
                name={`variants[${index}].option`}
                label="Option"
                color="info"
                size="medium"
                placeholder="Option"
                value={value.option}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  touched.variants && touched.variants[index] &&  touched.variants[index].option &&
                  errors.variants && errors.variants[index] && errors.variants[index].option
                }
                error={Boolean(
                  touched.variants && touched.variants[index] && touched.variants[index].option &&
                  errors.variants && errors.variants[index] && errors.variants[index].option
                )}
              />
            ) : (
              <ColorPicker
                hideTextfield
                disableAlpha
                value={value.option}
                defaultValue="transparent"
                onChange={(color) =>
                  setFieldValue(`variants[${index}].option`, color.value)
                }
              />
            )}
          </>
        ) : (
          <>
            {value.subType === 'Other' ? (
              <MultiField
                label={"Options"}
                name={`variants[${index}].subOption`}
                values={value.subOption}
                setFieldValue={setFieldValue}
                color="info"
              />
            ) : (
              <Box display={"flex"} gap={2} flexWrap={"wrap"}>
                {value.subOption &&
                  value.subOption.map((col, i) => (
                    <Box display={"block"} textAlign={"center"}>
                      <ColorPicker
                        hideTextfield
                        value={col}
                        disableAlpha
                        defaultValue="transparent"
                        onChange={(color) =>
                          setFieldValue(
                            `variants[${index}].subOption[${i}]`,
                            color.value
                          )
                        }
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setFieldValue(
                            `variants[${index}].subOption`,
                            value.subOption.filter((v, j) => j !== i)
                          );
                        }}
                      >
                        <Delete fontSize="12" />
                      </IconButton>
                    </Box>
                  ))}
                <IconButton
                  onClick={() =>
                    setFieldValue(`variants[${index}].subOption`, [
                      ...(value.subOption ? value.subOption : []),
                      "transparent",
                    ])
                  }
                >
                  <Add />
                </IconButton>
              </Box>
            )}
          </>
        )}
      </Grid>
      
    </Grid>
  );
};

export default ProductType;
