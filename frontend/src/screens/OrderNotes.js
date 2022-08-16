import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PayButton from "../components/pay";
import { saveordernotes } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import JoditEditor from "jodit-react";

const OrderNotes = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [ordernotes, setordernotes] = useState("");
  const dispatch = useDispatch();

  const editor = useRef(null);
  const config = {
    readonly: false,
    placeholder: "Write Order Notes",
    askBeforePasteHTML: false,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveordernotes(ordernotes));
  };

  return (
    <>
      {cartItems & console.log("There is things in the cart")}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="orderNotes">
          <Form.Label>Requests? Notes For The Order?</Form.Label>
          <JoditEditor
            id="description"
            ref={editor}
            value={ordernotes}
            config={config}
            tabIndex={1}
            onBlur={(e) => setordernotes(e)}
          />
          {/* <Form.Control
            type="text"
            as="textarea"
            placeholder="Enter your Request or Note."
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
          ></Form.Control> */}
        </Form.Group>

        <Link to="/cart">
          <Button variant="info" style={{ marginRight: "5px" }}>
            Go Back
          </Button>
        </Link>
        <PayButton cartItems={cart.cartItems} />

        <Button type="submit" variant="primary" className="bg-gray-">
          Save Order Notes
        </Button>
      </Form>
    </>
  );
};

export default OrderNotes;
