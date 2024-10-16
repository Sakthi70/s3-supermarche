"use client"; 

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import DropZone from 'components/DropZone';
import React, { useState } from 'react'
import Papa from 'papaparse';


const BulkUploadCategory = ({open = true, handleClose, uploadCategory}) => {
  const [categories, setCategories] = useState([])
    const handleChangeDropZone = async(files) => {
        if (files) {
          Papa.parse(files[0], {
            skipEmptyLines:true,
            header: true,
            complete: async function(results) {
                let arr = results.data
                setCategories(arr);
            }}
          )
        }
      }
  return (
    <Dialog
        open={open}
      >
        <Typography variant='h6' color="primary.main" p={1} textAlign={'center'} fontWeight={700}  >
                  {'Bulk Upload Category'}
                </Typography>
        <Divider/>
        <DialogContent>
       {categories.length < 1 ?  <DropZone
                title="Drag & drop Category File here"
                  multiple={false}
                  accept={{
                    'text/csv': [".csv"]
                  }}
                  onChange={(files) => handleChangeDropZone(files)}
                  imageSize='CSV ONLY'
                /> :
                <Typography variant='subtitle2' color="primary.info" p={1} textAlign={'center'} fontWeight={700}  >
                  {categories.length + ' categories available to upload'}
                </Typography>
                }

               
        </DialogContent>
        <DialogActions sx={{alignItems:'center', justifyContent:'center', textAlign:'center'}}>
          <Button onClick={() => {setCategories([]); handleClose();}} color="primary" >{'Cancel'}</Button>
          <Button variant="contained" disabled={categories.length < 1} color="primary" size='small' onClick={() =>{ uploadCategory(categories);setCategories([])}}>
            {'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default BulkUploadCategory