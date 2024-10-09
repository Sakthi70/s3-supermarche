import { Autocomplete, TextField } from '@mui/material';
import React from 'react'

const MultiField = ({setFieldValue, name, label,values, color='info',multiple=true}) => {
    const filter = (searchText, key) => {
        return key.toLowerCase().includes(searchText.toLowerCase());
      };
    
    
  return (
    <Autocomplete
                      multiple={multiple}
                      freeSolo
                      isOptionEqualToValue={filter}
                      options={[]}
                      getOptionLabel={() => ""}
                      ChipProps={{color:color}}
                      value={values}
                      onChange={(e, newval, reason) => {
                        if(newval){
                          setFieldValue(name, newval);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={label} 
                          color='secondary'
                          size='medium'
                          placeholder={label}
                          onKeyDown={(e) => {
                            if (e.code === "enter" && e.target.value) {
                              setFieldValue(name, [
                                ...values,
                                e.target.value,
                              ]);
                            }
                          }}
                        />
                      )}
                    />

  )
}

export default MultiField