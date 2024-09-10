import MobileCategoriesPageView from "./page-view";
import {LAYOUT_DATA} from '../../utils/constants' 
// API FUNCTIONS

export default async function MobileCategories() {
  
  return <MobileCategoriesPageView data={LAYOUT_DATA} />;
}