import Link from "next/link";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery"; 
// GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import SearchInput from "components/SearchInput"; 
import { Box } from "@mui/material";
// ===============================================================


// ===============================================================
export default function SearchArea({
  searchPlaceholder = "Search Product...",
  buttonText = "Add Product",
  url = "/",
  handleSearch =() => {},
  isAdditional=false,
  isSearch=false,
  isCreate = true,
  comps,
}) {
  const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"));
  return <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
     {isSearch && <SearchInput placeholder={searchPlaceholder} onChange={handleSearch}/>}
      <Box display={'flex'} justifyContent={'end'} gap={2}>
      {isAdditional && comps()}
      {isCreate && <Button href={url} color="info" fullWidth={downSM} variant="contained" startIcon={<Add />} LinkComponent={Link} sx={{
      minHeight: 44
    }}>
        {buttonText}
      </Button>}
      </Box>
    </FlexBox>;
}