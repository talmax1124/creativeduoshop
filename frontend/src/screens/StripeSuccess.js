import React, { useEffect } from "react";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";

// import { payOrder } from "../actions/orderActions";

const StripeSuccess = ({ match, history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  // const orderId = match.params.id;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  useEffect(() => {
    placeOrderHandler();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  // const successPaymentHandler = (paymentResult) => {
  //   console.log(paymentResult);
  //   dispatch(payOrder(orderId, paymentResult));
  // };

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return <div>StripeSuccess</div>;
};

export default StripeSuccess;
