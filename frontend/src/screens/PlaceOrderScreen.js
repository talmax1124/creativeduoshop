import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import PayButton from "../components/pay";

// import { loadStripe } from "@stripe/stripe-js";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  // const { userInfo } = useSelector((state) => state.userLogin);

  // let stripePromise;
  // const getStripe = () => {
  //   if (!stripePromise) {
  //     stripePromise = loadStripe(
  //       "pk_test_51GnfhfImEZowwqFqYp0LcwDOsO5vnfbUiTbkLLnCDzgi4ySL1iphmPRsjvBzkx7ggXs9HAVNIOLfEdlomJha1ADr002cZbEiHO"
  //     );
  //   }

  //   return stripePromise;
  // };
  // function consolel() {
  //   console.log("Your Key: " + process.env.REACT_APP_STRIPE_KEY);
  // }

  // consolel();

  const cart = useSelector((state) => state.cart);

  // const [stripeError, setStripeError] = useState(null);
  // const item = cart.cartItems;

  // const line_items = cart.cartItems.map((item) => {
  //   return {
  //     price_data: {
  //       currency: "usd",
  //       product_data: {
  //         name: item.name,
  //         images: [item.image],
  //       },
  //       unit_amount: item.price * 100,
  //     },
  //     quantity: item.qty,
  //   };
  // });

  // const checkoutOptions = {
  //   lineItems: line_items,
  //   mode: "payment",
  //   successUrl: `${window.location.origin}/success`,
  //   cancelUrl: `${window.location.origin}/placeorder`,
  //   customerEmail: userInfo.email,
  // };

  const cartItemsConsole = () => {
    console.log(cart.cartItems);
  };

  // const redirectToCheckout = async () => {
  //   console.log("redirectToCheckout");

  //   const stripe = await getStripe();
  //   const { error } = await stripe.redirectToCheckout(checkoutOptions);
  //   console.log("Stripe checkout error", error);

  //   if (error) setStripeError(error.message);
  // };

  // if (stripeError) alert(stripeError);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.taxPrice = addDecimals(Number((0.075 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(
    2
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

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

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="bg-black hover:bg-slate-800 w-full"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {/* <Button
                  // onClick={redirectToCheckout}
                  onClick={() => handleCheckout()}
                  className="bg-black hover:bg-slate-800 w-full mt-2"
                >
                  Place
                </Button> */}
                <PayButton cartItems={cart.cartItems} />
                <Button onClick={cartItemsConsole}>See Cart Items</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
