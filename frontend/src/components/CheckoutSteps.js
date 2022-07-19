import React from "react";
// import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";

// {/* <style>
// .clip {
//   clip-path: polygon(0 0, 0% 100%, 100% 50%);
// }
// </style> */}

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <>
      <div>
        <h2 className="sr-only">Steps</h2>

        <div>
          <ol className="grid grid-cols-1 overflow-hidden text-sm text-gray-500 border border-gray-100 divide-x divide-gray-100 rounded-lg sm:grid-cols-3">
            {step1 ? (
              <Link to="/shipping">
                <li className="flex items-center justify-center p-4 bg-white">
                  <svg
                    className="flex-shrink-0 mr-2 w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <p className="leading-none">
                    <strong className="block font-medium"> Shipping </strong>
                    <small className="mt-1"> Where your package is going. </small>
                  </p>
                </li>
              </Link>
            ) : (
              <li className="flex items-center justify-center p-4 bg-slate-300 text-black">
                <svg
                  className="flex-shrink-0 mr-2 w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>

                <p className="leading-none">
                  <strong className="block font-medium"> Details </strong>
                  <small className="mt-1"> Some info about you. </small>
                </p>
              </li>
            )}

            {step2 ? (
              <Link to="/payment">
                <li className="relative flex items-center justify-center p-4 bg-white">
                  <span className="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 bg-white border border-b-0 border-l-0 border-gray-100 sm:block -left-2 top-1/2"></span>

                  <span className="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 border border-b-0 border-l-0 border-gray-100 sm:block bg-gray-50 -right-2 top-1/2"></span>

                  <svg
                    className="flex-shrink-0 mr-2 w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>

                  <p className="leading-none">
                    <strong className="block font-medium"> Payment Method </strong>
                    <small className="mt-1"> How would you like to pay? </small>
                  </p>
                </li>
              </Link>
            ) : (
              <Link to="/placeorder">
                <li className="relative flex items-center justify-center p-4 bg-slate-300 text-black">
                  <span className="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 bg-white border border-b-0 border-l-0 border-gray-100 sm:block -left-2 top-1/2"></span>

                  <span className="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 border border-b-0 border-l-0 border-gray-100 sm:block bg-gray-50 -right-2 top-1/2"></span>

                  <svg
                    className="flex-shrink-0 mr-2 w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <p className="leading-none">
                    <strong className="block font-medium"> Address </strong>
                    <small className="mt-1"> Where we sending it? </small>
                  </p>
                </li>
              </Link>
            )}

            {step3 ? (
              <li className="flex items-center justify-center p-4 bg-white">
                <svg
                  className="flex-shrink-0 mr-2 w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="leading-none">
                  <strong className="block font-medium"> Place Order </strong>
                  <small className="mt-1">
                    {" "}
                    Confirm that your order is correct{" "}
                  </small>
                </p>
              </li>
            ) : (
              <li className="flex items-center justify-center p-4 bg-slate-300 text-black">
                <svg
                  className="flex-shrink-0 mr-2 w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="leading-none">
                  <strong className="block font-medium"> Place Order </strong>
                  <small className="mt-1">
                    {" "}
                    Confirm that your order is correct{" "}
                  </small>
                </p>
              </li>
            )}
          </ol>
        </div>
      </div>

      {/* // <Nav className='justify-content-center mb-4'>
    //   <Nav.Item>
    //     {step1 ? (
    //       <LinkContainer to='/login'>
    //         <Nav.Link>Sign In</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Sign In</Nav.Link>
    //     )}
    //   </Nav.Item>

    //   <Nav.Item>
    //     {step2 ? (
    //       <LinkContainer to='/shipping'>
    //         <Nav.Link>Shipping</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Shipping</Nav.Link>
    //     )}
    //   </Nav.Item>

    //   <Nav.Item>
    //     {step3 ? (
    //       <LinkContainer to='/payment'>
    //         <Nav.Link>Payment</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Payment</Nav.Link>
    //     )}
    //   </Nav.Item>

    //   <Nav.Item>
    //     {step4 ? (
    //       <LinkContainer to='/placeorder'>
    //         <Nav.Link>Place Order</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Place Order</Nav.Link>
    //     )}
    //   </Nav.Item>
    // </Nav> */}
    </>
  );
};

export default CheckoutSteps;
