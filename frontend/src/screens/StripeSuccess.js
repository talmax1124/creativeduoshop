import React, { useEffect } from "react";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { updateStock } from "../actions/productActions";

const StripeSuccess = ({ match, history }) => {
  const dispatch = useDispatch();
  const { session_id } = useParams();
  const cart = useSelector((state) => state.cart);
  // const orderId = match.params.id;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  // const adjustStock = () => {
  //   let adjustedStock = [];
  //   let adjustedState = [];

  //   cart.cartItems.map((item) => {
  //     const item_id = item.product;
  //     const updatedQty = item.countInStock - item.qty;
  //     adjustedStock.push({ item_id, updatedQty });
  //     return adjustedStock;
  //   });

  //   adjustedStock.forEach((item) => {
  //     products.map((product) => {
  //       if (item.item_id === product._id) {
  //         product.countInStock = item.updatedQty;
  //         adjustedState.push({
  //           _id: product._id,
  //           countInStock: product.countInStock,
  //         });
  //       }
  //     });
  //     return adjustedState;
  //   });

  //   adjustedState.forEach((item) => {
  //     dispatch(updateStock({ _id: item._id, countInStock: item.countInStock }));
  //   });
  // };

  useEffect(() => {
    // call the api to fetch session information and session_id with session_id
    fetchSessionInfo();
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
      placeOrderHandler(
        data.session.amount_total,
        data.session.customer_details.address
      );
    }
  };

  const placeOrderHandler = (totalAmount, Address) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: totalAmount / 100,
        shippingAddress: Address,
        // ordernotes: cart.ordernotes,
      })
    );
  };

  return (
    <>
      <h1 className="font-bold text-3xl">Your Purchase Has Been Completed.</h1>
      <h1 className="font-medium text-2xl">
        Please wait while we redirect you.
      </h1>
    </>
  );
};

export default StripeSuccess;
