"use client"

import { Delete, Edit } from '@mui/icons-material'
import { Box, Card, CardActionArea, CardMedia, Grid2, IconButton } from '@mui/material'
import { deletePage, getPages } from 'actions/pages'
import { H2 } from 'components/Typography'
import Warning from 'components/warning/warning'
import { useRouter } from 'next/navigation'
import PageWrapper from 'pages-sections/vendor-dashboard/page-wrapper'
import SearchArea from 'pages-sections/vendor-dashboard/search-box'
import React, { useEffect, useState } from 'react'
import { NO_IMAGE_FOR_PAGE } from 'utils/constants'
import { decimalToHexColor, t } from 'utils/util'

const PagesView = () => {
  const [pages, setpages] = useState([]);
  const [selectedId, setselectedId] = useState();

  const router = useRouter();

  useEffect(() => {
    getPageList();
  }, [])

  const getPageList =async()=>{
      await getPages().then(({pages}) => setpages(pages))
  }
  const onDelete =async()=>{
    await deletePage(selectedId).then(async() => await getPageList()).finally(()=>{
      setselectedId(null)
    })
  }

  return (
    <PageWrapper title={t("Pages")}>
      <Warning content={'Are you sure to delete?'} open={selectedId} ok='Cancel' handleClose={()=> setselectedId(null)} title={'Delete Page'} isSubmit={true}  onSubmit={onDelete} submit='Delete'/>
 <SearchArea
 isSearch={false}
        buttonText={t("Add Page")}
        url="/admin/pages/create"
      />
      <Grid2 container spacing={2}>
        {pages.map(page => <Grid2 size={{xs:12, sm:6}}>
                <Card>
                <Box sx={{display:'flex', position:'relative'}}>
        <CardMedia
          component="img"
          sx={{opacity:0.7}}
          height="200"
          image={page.image ?? NO_IMAGE_FOR_PAGE}
          alt={page.name}
        />
        <Box display={'flex'} justifyContent={'end'} gap={1} sx={{position:'absolute',top: 5, right:5}}>
            <IconButton onClick={() => router.push(`/admin/pages/${page.id}`)}><Edit/></IconButton>
            <IconButton onClick={()=> setselectedId(page.id)}><Delete/></IconButton>
        </Box>
         <H2  sx={{position:'absolute',top:'50%', left:'50%',color: decimalToHexColor(page.color ?? '#FFFFFF')}}>{page.name}</H2>
        </Box>

                </Card>
        </Grid2>)}
      </Grid2>
    </PageWrapper>
  )
}

export default PagesView