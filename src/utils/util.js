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