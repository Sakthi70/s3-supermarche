
// MUI ICON COMPONENTS
import ChevronRight from "@mui/icons-material/ChevronRight"; 
// STYLED COMPONENT

import { RootContainer } from "./styles"; 
// =================================================================


// =================================================================
export default function AccordionHeader(props) {
  const {
    open,
    children,
    showIcon = true,
    onClick,
    ...others
  } = props;
  return <RootContainer open={open} {...others}>
      {children}
      {showIcon ? <ChevronRight className="caret" fontSize="small" onClick={onClick} /> : null}
    </RootContainer>;
}