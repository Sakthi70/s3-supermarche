"use client";

import { getCategories,createCategory as cCategroy } from "actions/categories";
import { getFooterLinks, getSettings } from "actions/settings";
import useSettings from "hooks/useSettings";
import { createContext, useEffect, useState } from "react"; 
// ============================================================


// ============================================================

// SET "rtl" OR "ltr" HERE

// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCAL STORAGE
const initialValues
 = {
  categories: [],
  products: [],
  settings:{},
  footerLinks:[]
};
export const AppContext = createContext({
  content: initialValues,
  loading : arg => {},
  getAllSettings: ()=>{},
  categories: {
  updateCategory: arg => {},
  createCategory: arg => {},
  deleteCategory: arg => {}
  }
});
export default function AppProvider({
  children
}) {
  const [content, setContent] = useState(initialValues);

  const { updateSettings} = useSettings();


  const createCategory = async(category) => {
        // setContent(prevContent =>  {return {...prevContent, categories: [...prevContent.categories, category]}});
        await getAllCategories();
  };

  const updateCategory = async(category) => {
    // setContent(prevContent =>  {return {...prevContent, categories: prevContent.categories.map(x =>  x.id !=category.id ? x : category)}});
    await getAllCategories();
  };

  const deleteCategory = async(categoryId) => {
    // setContent(prevContent =>  {return {...prevContent, categories: prevContent.categories.filter(x => x.id !=categoryId)}});
    await getAllCategories();
    // window.localStorage.setItem("settings", JSON.stringify(updatedSetting));
  };

  const getAllCategories = async() => {
    const {categories} =  await getCategories();
    setContent((val) => { return {...val, categories}})
    
  }

  const getAllSettings = async() => {
  await getSettings().then((setting) => setContent((val) => { return {...val, settings:setting}}))
  await getFooterLinks().then((footerLinks) => setContent((val) => { return {...val, footerLinks}}))
  }

  const loading =(value)=> {
     updateSettings({ loading: value})
  }

  const loadAllData =async()=>{
     loading(true);
    await getAllCategories();
    await getAllSettings();
     loading(false);
  }

  useEffect(() => {
    loadAllData();
  }, []);
  return <AppContext.Provider value={{
    content,
    loading,
    getAllSettings,
    categories: {
      createCategory,
      updateCategory,
      deleteCategory
    }
  }}>
      {children}
    </AppContext.Provider>;
}