import i18next from '../i18n'
function stringToColor(string) {
    let hash = 5;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  export function stringAvatar(name,option ={}) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        ...option
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  export function hexToDecimal(hex) {
    hex = hex.replace(/^#/, '');

    let decimal = parseInt(hex, 16);

    return decimal;
}

export function decimalToHexColor(decimalValue) {
  if (decimalValue < 0 || decimalValue > 16777215) {
      throw new Error("Decimal value must be between 0 and 16777215.");
  }

  let hex = decimalValue.toString(16).toUpperCase();

  hex = hex.padStart(6, '0');

  return `#${hex}`;
}



export function getAllCategoriesByOption(array, parentId = null) {
  let allArr = buildTree(array, parentId);
  // Filter items that have the given parentId
 return [parentId,...optionsFromArray(allArr)]
}

export function optionsFromArray(array) {
  // Filter items that have the given parentId
  let arr = [];
   array
      .filter(item =>item.enabled)
      .forEach(item => {
          arr.push(item.id);
          if(item.child.length>0){
            arr = [...arr, ...optionsFromArray(item.child)]
          }  // Recursive call to build children
      });
      return arr;
}

export function buildTree(array, parentId = null,enable=false) {
  // Filter items that have the given parentId
  return array
      .filter(item => item.parentId === parentId && (enable || item.enabled))
      .map(item => ({
          ...item,
          child: buildTree(array, item.id)  // Recursive call to build children
      }));
}

export function buildBulkTree(array, parentId = null) {
  // Filter items that have the given parentId
  array.forEach(element => {
       
  });
  return array
      .filter(item => item.parentId === `/${parentId}`)
      .map(item => ({
          ...item,
          child: buildTree(array, item.name)  // Recursive call to build children
      }));
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getRandomItem(array, alt = "") {
  if (!array || array.length === 0 ) {
    return alt
  }

  // Generate a random index between 0 and array.length - 1
  const randomIndex = Math.floor(Math.random() * array.length);

  // Return the item at the random index
  return array[randomIndex];
}

export function calculateDiscountPercentage(originalPrice, discountedPrice) {
  if (originalPrice <= 0 || !discountedPrice || discountedPrice <=0 ) {
    return 0;
  }

  // Calculate the discount amount
  const discountAmount = originalPrice - discountedPrice;

  // Calculate the discount percentage
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return Math.round(discountPercentage);
}

export function t(key) {
  return i18next.t(key, { key });
}

export function generateOTP(length = 6) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function buildTreebyId(items, filterIds) {
  const itemMap = {};
  const tree = [];

  items.forEach(item => {
    if (filterIds.includes(item.id) && item.enabled) {
      itemMap[item.id] = { ...item, child: [] };
    }
  });

  for (const item of Object.values(itemMap)) {
    if (item.parentId && itemMap[item.parentId]) {
      itemMap[item.parentId].child.push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;

}

export const getMinMaxPrice = (products) => {
  if (products.length === 0) return { min: 0, max: 0 };

  const prices = products.map(product => product.salePrice || product.price);
  
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  return { min: minPrice, max: maxPrice };
};

export const formatCount = (count) => {
  if (count < 1000) return count.toString();
  if (count < 1_000_000) return (count / 1000).toFixed(0) + 'k';
  return (count / 1_000_000).toFixed(0) + 'm';
};