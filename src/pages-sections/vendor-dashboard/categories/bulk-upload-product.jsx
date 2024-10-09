"use client"; 

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import DropZone from 'components/DropZone';
import React, { useState } from 'react'
import Papa from 'papaparse';


const BulkUploadProduct = ({open = true, handleClose, uploadProduct}) => {
  const [products, setProducts] = useState([])
    const handleChangeDropZone = async(files) => {
        if (files) {
          Papa.parse(files[0], {
            skipEmptyLines:true,
            header: true,
            complete: async function(results) {
                let arr = results.data
                setProducts(arr.filter(y => !Object.values(y).every(x => x === null || x === '')));
            }}
          )
        }
      }
  return (
    <Dialog
        open={open}
      >
        <Typography variant='h6' color="primary.main" p={1} textAlign={'center'} fontWeight={700}  >
                  {'Bulk Upload Product'}
                </Typography>
        <Divider/>
        <DialogContent>
       {products.length < 1 ?  <DropZone
                title="Drag & drop Product File here"
                  multiple={false}
                  accept={{
                    'text/csv': [".csv"]
                  }}
                  onChange={(files) => handleChangeDropZone(files)}
                  imageSize='CSV ONLY'
                /> :
                <Typography variant='subtitle2' color="primary.info" p={1} textAlign={'center'} fontWeight={700}  >
                  {products.length + ' Products available to upload'}
                </Typography>
                }

               
        </DialogContent>
        <DialogActions sx={{alignItems:'center', justifyContent:'center', textAlign:'center'}}>
          <Button onClick={() => {setProducts([]); handleClose();}} color="primary" >{'Cancel'}</Button>
          <Button variant="contained" disabled={products.length < 1} color="primary" size='small' onClick={() =>{ uploadProduct(products);setProducts([])}}>
            {'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default BulkUploadProduct