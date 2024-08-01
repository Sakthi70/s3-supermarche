import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material'
import {  H3, Paragraph } from 'components/Typography'
import React from 'react'

const Warning = ({open,handleClose, title, content, ok = 'close',submit='ok', onSubmit, isSubmit= false }) => {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
      >
        <Typography variant='h6' color="primary.main" p={1} textAlign={'center'} fontWeight={700}  >
                  {title}
                </Typography>
        <Divider/>
        <DialogContent>
          {/* <DialogContentText > */}
          <Paragraph color="grey.600" >
                 {content}
                </Paragraph>
          {/* </DialogContentText> */}
        </DialogContent>
        <Divider/>
        <DialogActions sx={{alignItems:'center', justifyContent:'center', textAlign:'center'}}>
          <Button onClick={handleClose} color="primary" >{ok}</Button>
          {isSubmit && <Button variant="contained"  color="primary" size='small' onClick={onSubmit}>
            {submit}
          </Button>}
        </DialogActions>
      </Dialog>
  )
}

export default Warning