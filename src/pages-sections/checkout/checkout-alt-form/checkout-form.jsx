"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup"; 
// LOCAL CUSTOM COMPONENTS

import DeliveryDate from "./delivery-date";
import PaymentDetails from "./payment-details";
import DeliveryAddress from "./delivery-address";
import { useSession } from "next-auth/react";
import { createAddress, deleteAddress, finduserById, updateAddress } from "actions/user";
import { PageLoader } from "pages-sections/vendor-dashboard/categories/page-view/create-category";
import useApp from "hooks/useApp";
import { loadStripe } from "@stripe/stripe-js";
import {Elements,useStripe,useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Box, Button, Card, Typography } from "@mui/material";
import Heading from "./heading";
import { Paragraph } from "components/Typography";
import useCart from "hooks/useCart";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const checkoutSchema = yup.object().shape({
  // card: yup.string().required("required"),
  // date: yup.string().required("required"),
  // time: yup.string().required("required"),
  // address: yup.string().required("required"),
  // cardHolderName: yup.string().required("required"),
  // cardNumber: yup.number().required("required"),
  // cardMonth: yup.string().required("required"),
  // cardYear: yup.number().required("required"),
  // cardCVC: yup.number().required("required"),
  voucher: yup.string()
});
export default function CheckoutForm({clientSecret,dpmCheckerLink}) {
  const router = useRouter();
  const [hasVoucher, setHasVoucher] = useState(false);
  const [userDetail, setuserDetail] = useState();
  const {data:session} = useSession();
  const {loading} =useApp();
  useEffect(() => {
   if(session.user){
        getUserDetails(session.user.id);
   }
  }, [session])
  

  const getUserDetails =async(id) => {
   await finduserById(id).then(x => setuserDetail(x));
  } 

  const handleAddNewAddress =async(address)=>{
    loading(true);
    await createAddress({...address, userId: session.user?.id}).then(async() => await getUserDetails(session.user.id)).finally(()=> loading(false))
}

const handleDeleteAddress = async(id)=>{
  loading(true);
    await deleteAddress(id).then(async() => await getUserDetails(session.user.id)).finally(()=> loading(false))

}

const handleEditAddress =async(data)=>{
  loading(true);
    await updateAddress(data).then(async() => await getUserDetails(session.user.id)).finally(()=> loading(false))

}



  const toggleHasVoucher = () => setHasVoucher(has => !has);

  const initialValues = {
    card: "",
    date: "",
    time: "",
    address: "",
    voucher: "",
    cardHolderName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCVC: ""
  };

  const handleFormSubmit = async values => {
    console.log(values);
    router.push("/payment");
  };

  
  return <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
      {({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue
    }) => {
      
// CHANGE FIELD VALUE DATA
      const handleFieldValueChange = (value, fieldName) => {
        setFieldValue(fieldName, value);
      };

      // const stripePromise = loadStripe('pk_test_51PwidaRunPbXlNKlJBlHrJulrFGwWWJddaYfmptu10aKB1TTqhVHMYox6YgUYxaoPNZSRqMaqSwQ3tW08aYdHIxc00bX1LE9Sl');
      
      // const fetchClientSecret = useCallback(() => {
      //   // Create a Checkout Session
      //   return fetch("/api/checkout_sessions", {
      //     method: "POST",
      //   })
      //     .then((res) => res.json())
      //     .then((data) => data.clientSecret);
      // }, []);
    
      // const options = {fetchClientSecret};
    
      
      return <>{userDetail ? 
        <>
      {/* // <form onSubmit={handleSubmit}> */}
        {/* <Elements stripe={stripePromise} options={options}> */}
            <DeliveryDate errors={errors} values={values} touched={touched} handleChange={handleChange} />

          
            <DeliveryAddress 
            handleFieldValueChange={handleFieldValueChange}
            isSelection={true}
            selectedItem={values.address}
            handleEditAddress={handleEditAddress} 
            handleDeleteAddress={handleDeleteAddress} 
            handleAddNewAddress={handleAddNewAddress} 
            userId={userDetail?.id} 
            addresses={userDetail?.addresses}/> 

{/* <PaymentElement/> */}
{clientSecret && (
  <Elements options={{clientSecret}} stripe={stripePromise}>
   
      <PaymentCheckoutForm  dpmCheckerLink={dpmCheckerLink} />
  </Elements>
)}
            {/* <PaymentDetails values={values} errors={errors} touched={touched} hasVoucher={hasVoucher} handleChange={handleChange} toggleHasVoucher={toggleHasVoucher} handleFieldValueChange={handleFieldValueChange} />
            </Elements> */}
          {/* </form>  */}
          </>
          : <PageLoader/>}</>;
    }}
    </Formik>;
}



export  function PaymentCheckoutForm({dpmCheckerLink}) {
  const stripe = useStripe();
  const elements = useElements();
  const {
    dispatch
  } = useCart(); 
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error,paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });
    if(error){
    if ( (error.type === "card_error" || error.type === "validation_error" || error.type === "payment_intent_authentication_failure")) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
  }else{
    dispatch({
              type: "EMPTY_CART"});
          router.replace('/orders/confirmation');
  }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Card sx={{
      p: 3,
      mb: 3
    }}>
    <Heading number={3} title="Payment Details" />
      <form id="payment-form" onSubmit={handleSubmit}>
    <Box>
      <Paragraph mb={1.5}>Enter Card Information</Paragraph>

        <PaymentElement  id="payment-element" options={paymentElementOptions} />
        <Button sx={{my:2}} fullWidth  disabled={isLoading || !stripe || !elements} type="submit" color="primary" variant="contained">
        Place Order
      </Button>
        {message && <Typography color="error" variant="subtitle2" id="payment-message">{message}</Typography>}
      </Box>
      </form>
    </Card>
  );
}