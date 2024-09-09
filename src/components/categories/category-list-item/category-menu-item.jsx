import Link from "next/link";
import ChevronRight from "@mui/icons-material/ChevronRight"; 
// STYLED COMPONENT

import { Wrapper } from "./styles"; 
import Image from "next/image";
// =============================================================


// =============================================================
export default function CategoryListItem(props) {
  const {
    href,
    title,
    render,
    caret = true,
    icon
  } = props;
  return <Wrapper>
      <Link href={href}>
        <div className="category-dropdown-link">
          {icon ? <Image style={{borderRadius:'50%'}} src={icon} width={30}  height={30} alt={title}/> : null}
          <span className="title">{title}</span>
          {caret ? <ChevronRight fontSize="small" className="caret-icon" /> : null}
        </div>
      </Link>

      {render ? <div className="mega-menu">{render}</div> : null}
    </Wrapper>;
}