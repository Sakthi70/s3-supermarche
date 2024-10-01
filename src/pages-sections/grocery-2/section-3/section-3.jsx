"use client"; 

import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid"; 
// GLOBAL CUSTOM COMPONENTS

import { H3, H5, Tiny } from "components/Typography"; 
// CUSTOM DATA MODEL


// STYLED COMPONENT
import { StyledCard } from "./styles"; 
import useApp from "hooks/useApp";
import { Box } from "@mui/material";
// ===========================================================


// ===========================================================
export default function Section3({categories}) {
  return <div className="mb-3">
      <H3 fontSize={25} mb={3}>
        Shop By Category
      </H3>

      <Grid container spacing={3}>
        {categories.map(({
        id,
        name,
        image,
        tag,
        slug
      }) => <Grid item lg={3} md={4} xs={6} key={id}>
            <Link href={`/categories/search/${id}`}>
              <StyledCard>
                {image ? <Image width={46} height={46} alt={name} src={image} />: <Box width={46} height={46}></Box>}

                <div>
                  <Tiny color="primary.main" display="block" mb={0.5} sx={{fontWeight:'bold', fontSize:12}}>
                    {tag}
                  </Tiny>
                  <H5>{name}</H5>
                </div>
              </StyledCard>
            </Link>
          </Grid>)}
      </Grid>
    </div>;
}