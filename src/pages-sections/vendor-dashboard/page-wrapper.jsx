
// GLOBAL CUSTOM COMPONENTS
import { Apps, ViewList } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H3, Paragraph } from "components/Typography"; 
// ==============================================================


// ==============================================================
export default function PageWrapper({
  children,
  title,
  toggleView,
  isView = false,
  type
}) {
  return <div className="pt-2 pb-2">
    <Box  display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <H3 mb={2}>{title}</H3>
    {isView &&  <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={() =>toggleView("grid")}>
                <Apps
                  fontSize="small"
                  color={type === "grid" ? "primary" : "inherit"}
                />
              </IconButton>

              <IconButton onClick={() =>toggleView("list")}>
                <ViewList
                  fontSize="small"
                  color={type === "list" ? "primary" : "inherit"}
                />
              </IconButton></FlexBox>}

    </Box>

      {children}
    </div>;
}