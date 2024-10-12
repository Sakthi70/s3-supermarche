"use client"
import { Box } from '@mui/material'
import { getPagebyPageId } from 'actions/pages';
import { H2, H6 } from 'components/Typography'
import useApp from 'hooks/useApp';
import { useParams } from 'next/navigation';
import { PageLoader } from 'pages-sections/vendor-dashboard/categories/page-view/create-category';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { NO_IMAGE_FOR_PAGE } from 'utils/constants';
import { decimalToHexColor } from 'utils/util';

const DynaicmPageView = () => {
  const params = useParams();
const [page, setPage] = useState();
const {loading} = useApp();
const {t} = useTranslation();
const getPage =async(id)=> {
  
    await getPagebyPageId(id).then((page) => {
        setPage(page)})
}

  useEffect(() => {
    loading(true);
    if(params.slug){
        getPage(params.slug);
        loading(false);
    }
  }, [params.slug])


  return (
   <>{page ? <Box p={2}>
            <Box display={'flex'} position={'relative'}>
        <Box  component={'img'} src={page.image ?? NO_IMAGE_FOR_PAGE} sx={{borderRadius:2}} width={1} height={200} alt='page' >
                
        </Box>
        <H2 sx={{position:'absolute',top:'50%', left:'50%',color:decimalToHexColor(page.color)}}>{page.name}</H2>
        </Box>
        <div dangerouslySetInnerHTML={{__html: page.content}} style={{minHeight:400}} />
    </Box>:<PageLoader/> }</>
  )
}

export default DynaicmPageView