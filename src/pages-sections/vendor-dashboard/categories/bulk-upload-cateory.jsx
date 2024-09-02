"use client"; 

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import DropZone from 'components/DropZone';
import React, { useState } from 'react'
import Papa from 'papaparse';


const BulkUploadCategory = ({open = true, handleClose}) => {
    const handleChangeDropZone = (files) => {
        if (files) {
          Papa.parse(files[0], {
            skipEmptyLines:true,
            header: true,
            complete: function(results) {
                let arr = results.data
              console.log("Finished:", arr);
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
        <DropZone
                title="Drag & drop Category File here"
                  multiple={false}
                  accept={{
                    'text/csv': [".csv"]
                  }}
                  onChange={(files) => handleChangeDropZone(files)}
                  imageSize='CSV ONLY'
                />

               
        </DialogContent>
        <DialogActions sx={{alignItems:'center', justifyContent:'center', textAlign:'center'}}>
          <Button onClick={handleClose} color="primary" >{'Cancel'}</Button>
          <Button variant="contained"  color="primary" size='small' onClick={() =>{}}>
            {'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default BulkUploadCategory