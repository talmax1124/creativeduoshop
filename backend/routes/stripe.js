import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.get("/getstripesession/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return res.send({ session });
});

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      email: req.body.email,
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    allow_promotion_codes: true,
    consent_collection: {
      promotions: "auto",
    },
    // automatic_tax: {
    //   enabled: true,
    // },
    success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  // res.redirect(303, session.url);
  // res.send({url: `${process.env.CLIENT_URL}/success`});
  res.send({ url: session.url });
});

export default router;
