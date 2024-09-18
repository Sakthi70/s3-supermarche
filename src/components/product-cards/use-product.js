import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";
import useCart from "hooks/useCart";
export default function useProduct(id) {
  const {
    state,
    dispatch
  } = useCart();
  const {
    enqueueSnackbar
  } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const cartItem = state.cart.find(item => item.id === id);
  const toggleFavorite = useCallback(() => setIsFavorite(fav => !fav), []);
  const toggleDialog = useCallback(() => setOpenModal(open => !open), []);

  const handleCartAmountChange = (product, type) => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: product
    }); 
// SHOW ALERT PRODUCT ADDED OR REMOVE

    if (type === "remove") enqueueSnackbar("Remove from Cart", {
      variant: "error"
    });else enqueueSnackbar("Added to Cart", {
      variant: "success"
    });
  };

  return {
    cartItem,
    openModal,
    isFavorite,
    toggleDialog,
    toggleFavorite,
    handleCartAmountChange
  };
}