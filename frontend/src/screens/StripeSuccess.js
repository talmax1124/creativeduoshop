import React, { useEffect } from "react";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

// import { payOrder } from "../actions/orderActions";

const StripeSuccess = ({ match, history }) => {
  const dispatch = useDispatch();
  const { session_id } = useParams();
  const cart = useSelector((state) => state.cart);
  // const orderId = match.params.id;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  useEffect(() => {
    // call the api to fetch session information and session_id with session_id
    fetchSessionInfo();
    // update the totalprice
    // call placeOrderHandler

    // placeOrderHandler();
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

  const fetchSessionInfo = async () => {
    const { data } = await axios.get(
      `/api/stripe/getstripesession/${session_id}`
    );
    if (data.session) {
      placeOrderHandler(data.session.amount_total)
    }

  };

  // const successPaymentHandler = (paymentResult) => {
  //   console.log(paymentResult);
  //   dispatch(payOrder(orderId, paymentResult));
  // };

  const placeOrderHandler = (totalAmount) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: totalAmount / 100,
      })
    );
  };

  return <div>StripeSuccess</div>;
};

export default StripeSuccess;
