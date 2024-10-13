"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
export default function CheckoutForm() {
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
      

      return <>{userDetail ? <form onSubmit={handleSubmit}>
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


            <PaymentDetails values={values} errors={errors} touched={touched} hasVoucher={hasVoucher} handleChange={handleChange} toggleHasVoucher={toggleHasVoucher} handleFieldValueChange={handleFieldValueChange} />
          </form> : <PageLoader/>}</>;
    }}
    </Formik>;
}