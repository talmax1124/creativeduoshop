import axios from "axios";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleCheckout = () => {
    axios
      .post("http://localhost:3000/api/stripe/create-checkout-session", {
        cartItems,
        userId: userInfo._id,
        email: userInfo.email,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}  className="btn bg-black w-full text-white hover:bg-gray-700">
        Check out
      </button>
    </>
  );
};

export default PayButton;
