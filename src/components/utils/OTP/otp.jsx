import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField, Typography } from '@mui/material'
import {  H3, Paragraph } from 'components/Typography'
import React, { useState } from 'react'

const OTP = ({open,handleClose, title, content, ok = 'close',submit='ok', onSubmit,otp, isSubmit= true }) => {
  const [otpValue, setotpValue] = useState("");

 const [error, seterror] = useState("")

  const handeleSubmit =() => {
     if(otpValue.length ===6 && otpValue === otp){
      onSubmit();
      handleClose();
    }else{
      seterror('Entered OTP is invalid')
    }
      
  }

  return (
    <Dialog
        open={open}
        // onClose={handleClose}
      >
        <Typography variant='h6' color="primary.main" p={1} textAlign={'center'} fontWeight={700}  >
                  {title}
                </Typography>
        <Divider/>
        <DialogContent>
          {/* <DialogContentText > */}
          <Paragraph color="grey.600" sx={{mb:2}} >
                 {content}
                </Paragraph>
                <TextField helperText={error} error={error !==""} fullWidth  label={'Enter the OTP'}  value={otpValue}  slotProps={{
                  htmlInput:{
                    inputMode:'numeric',
                    pattern:'[0-9]*',
                    maxLength:6
                  }
      }} onChange={(e) => { 
                  setotpValue(e.target.value)
                }}/>
          {/* </DialogContentText> */}
        </DialogContent>
        <Divider/>
        <DialogActions sx={{alignItems:'center', justifyContent:'center', textAlign:'center'}}>
          <Button onClick={handleClose} color="primary" >{ok}</Button>
          {isSubmit && <Button variant="contained"  color="primary" size='small' onClick={handeleSubmit}>
            {submit}
          </Button>}
        </DialogActions>
      </Dialog>
  )
}

export default OTP