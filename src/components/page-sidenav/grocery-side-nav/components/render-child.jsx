import { Fragment } from "react";
import LinkItem from "./link-item"; 
import { iteratee } from "lodash";
import { Box } from "@mui/material";
// ==============================================================


// ==============================================================
export const renderChild = (childList, type = "parent") => {
  
// NESTED LIST
  if (type === "parent") {
    return childList.map(({
      slug,
      name,
      id,
      child,
      image
    }) => <Fragment key={name}>
      <Box ml={2}>
        <LinkItem id={id} title={name} icon={image}  ml={4} />
        {child.length >0 ? renderChild(child, "child")  : null}
        </Box> </Fragment>);
  }

  return childList.map((item, ind) => <LinkItem key={ind} id={item.id} title={item.name} icon={item.image} ml={6} />);
};