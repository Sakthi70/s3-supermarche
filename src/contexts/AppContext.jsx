"use client";

import { getCategories,createCategory as cCategroy } from "actions/categories";
import useSettings from "hooks/useSettings";
import { createContext, useEffect, useState } from "react"; 
// ============================================================


// ============================================================

// SET "rtl" OR "ltr" HERE

// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCAL STORAGE
const initialValues
 = {
  categories: [],
  products: []
};
export const AppContext = createContext({
  content: initialValues,
  loading : arg => {},
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

  const {settings, updateSettings} = useSettings();


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

  const loading =(value)=> {
     updateSettings({ loading: value})
  }

  useEffect(() => {
    loading(true);
    getAllCategories();
    loading(false);
  }, []);
  return <AppContext.Provider value={{
    content,
    loading,
    categories: {
      createCategory,
      updateCategory,
      deleteCategory
    }
  }}>
      {children}
    </AppContext.Provider>;
}