import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

import { Container } from "react-bootstrap";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <div className="Hero bg-blue-600 rounded-sm flex">
        <div className="Hero-body justify-center items-center text-center">
          <h1 className="mb-[.5em] text-white font-bold text-[3.2em]">
            Creative Duo LLC
          </h1>
          <p className="text-slate-100 font-semibold uppercase">
            Quality Products at affordable prices
          </p>
        </div>
      </div>
      <main className="py-3">
        <Container>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to="/"  className="btn bg-black w-full text-white hover:bg-gray-700">
              Go Back
            </Link>
          )}
          <h1 className="text-[1.5em] font-bold mt-1 mb-1">Latest Products</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {products.map((product) => (
                <Row key={product._id} className="items-center justify-center">
                  <Product product={product} className="self-stretch mb-3" />
                </Row>
              ))}
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </>
          )}
        </Container>
      </main>
    </>
  );
};

export default HomeScreen;
