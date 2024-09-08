"use client";

// GLOBAL CUSTOM COMPONENTS
import Setting from "components/settings";
import { Footer2 } from "components/footer";
import Scrollbar from "components/scrollbar";
import Newsletter from "components/newsletter";
import StickyWrapper from "components/sticky-wrapper";
import GrocerySideNav from "components/page-sidenav/grocery-side-nav";
import { MobileNavigationBar2 } from "components/mobile-navigation"; 
// LOCAL CUSTOM COMPONENTS

import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import ProductCarousel from "../product-carousel"; 
// API FUNCTIONS

import api from "utils/__api__/grocery-2";
import { useEffect, useState } from "react";
import useApp from "hooks/useApp";
import { getAllCategoriesByOption, shuffleArray } from "utils/util";
import { getRandomProducts } from "actions/products";
import { SERVICE_LIST } from "utils/constants";
import _ from "lodash";
export default  function GroceryTwoPageView() {
  // const services =  api.getServices();
  // // const categories = await api.getCategories();
  // const testimonials =  api.getTestimonials();
  // const dairyProducts =  api.getDairyProducts();
  // const navigationList =  api.getNavigationList();
  // const mainCarouselData =  api.getMainCarousel();
  // const featuredProducts =  api.getFeaturedProducts();
  // const bestHomeProducts =  api.getBestHomeProducts();
  // const bestSellProducts =  api.getBestSellProducts();
  // const discountBanners =  api.getDiscountBannerList(); 

  const [featureProducts, setfeatureProducts] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const [additionalProducts, setadditionalProducts] = useState([]);
  const [bestName, setbestName] = useState("S3 Supermarche");
  const [addName, setaddName] = useState("Best Products");
  const [load, setloading] = useState(true)
  const [shopList, setshopList] = useState([]);

  const {content,loading }= useApp();
   const {categories}= content || {categories:[]};

  useEffect(() => {
    if(categories && categories.length > 0 && load){
      getData();
         }
         loading(load);
    
  }, [categories,load])
  
const getData =async() => {
  const onlyShopList = categories.filter(x => x.shopList === true && x.enabled);
  if(onlyShopList.length>=6){
    setshopList(onlyShopList.slice(0,6));
  }else{
    let shuffleCategory = shuffleArray(categories.filter(x=> x.enabled));
    setshopList([...onlyShopList, ...shuffleCategory.slice(0,6-onlyShopList.length)]);
  }
  const featured = categories.find(x => x.featured === true && x.enabled);
  const featuredCategories = getAllCategoriesByOption(categories, featured ? featured.id : null);
  await getRandomProducts(_.compact(featuredCategories)).then((featuredProds) => setfeatureProducts(featuredProds));
  const best = categories.find(x => x.best === true && x.enabled);
  setbestName( best ? best.name : "S3 Supermarche");
  const bestCategories = getAllCategoriesByOption(categories, best ? best.id : null);
  await getRandomProducts(_.compact(bestCategories)).then((bestProds) => setbestProducts(bestProds));
  const additional = categories.find(x => x.additional === true && x.enabled);
  setbestName( best ? best.name : "S3 Supermarche");
  let additionalCategories = getAllCategoriesByOption(categories, additional ? additional.id : null);
  additionalCategories = _.compact(additionalCategories);
  setaddName(additionalCategories.length > 1 ? additionalCategories.slice(0,2).map(x => categories.find(y => y.id === x).name).join(', ') : categories.find(x => x.id === additionalCategories[0]).name);
  await getRandomProducts(additionalCategories).then((addProds) => setadditionalProducts(addProds));
  setloading(false)
}


// SIDE NAVBAR COMPONENT

  const SideNav = <GrocerySideNav navigation={[]} />;
  return <div className="mt-1">
      <StickyWrapper SideNav={SideNav}>
        {
        /* TOP HERO AREA */
      }
        <Section1  />

        {
        /* SERVICE LIST AREA */
      }
        <Section2 services={SERVICE_LIST} />

        {
        /* SHOP BY CATEGORY LIST AREA */
      }
        <Section3 categories={shopList} />

        {
        /* FEATURED ITEMS AREA */
      }
        <ProductCarousel title="Featured Items" products={featureProducts} />

        {
        /* BEST SELLER IN YOUR AREA */
      }
        {/* <ProductCarousel title="Best Seller in Your Area" products={bestSellProducts} /> */}

        {
        /* DISCOUNT BANNER AREA */
      }
        <Section4  />

        {
        /* BEST OF HOME ESSENTIALS PRODUCTS AREA  */
      }
        <ProductCarousel title={`Best of ${bestName}`} products={bestProducts} />

        {
        /* SNACKS-DRINKS-DAIRY PRODUCTS AREA */
      }
        <ProductCarousel title={`${addName} & More`} products={additionalProducts} />

        {
        /* CLIENT TESTIMONIALS AREA */
      }
        {/* <Section5 testimonials={testimonials} /> */}

        {
        /* FOOTER AREA */
      }
        <Footer2 />
      </StickyWrapper>

      {
      /* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */
    }
      {/* <Setting /> */}

      {
      /* POPUP NEWSLETTER FORM */
    }
      <Newsletter image="/assets/images/newsletter/bg-2.png" />

      {
      /* SMALL DEVICE BOTTOM NAVIGATION */
    }
      <MobileNavigationBar2>
        <Scrollbar>{SideNav}</Scrollbar>
      </MobileNavigationBar2>
    </div>;
}