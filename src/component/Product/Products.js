import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearerrors, getproduct } from "../../actions/productactions.js";
import Loader from "../layout/Loader/loader.js";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
];
const Products = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, products, productcount, error, resultperpage,
        filteredProductsCount } = useSelector(state => state.products)

    const [currentPage, setcurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 2500]);
    const [category, setCategory] = useState("")
    const [rating, setRating] = useState(0);

    const setCurrentPageNo = (e) => {
        setcurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    const { keyword } = useParams()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearerrors())
        }
        dispatch(getproduct(keyword, currentPage, price, category, rating))
    }, [dispatch, error, alert, keyword, currentPage, price, category, rating])

    let count = filteredProductsCount

    return (
        <Fragment>
            {
                loading ? (<Loader />) : (
                    <Fragment>
                        <h2 className="productsHeading">Products</h2>

                        <div className="products">
                            {products &&
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                        </div>

                        {resultperpage < count && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultperpage}
                                    totalItemsCount={productcount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}

                        {
                            keyword ? (<div className="filterBox">
                                <Typography>Price</Typography>
                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={2500}
                                />
                                <Typography>Categories</Typography>
                                <ul className="categoryBox">
                                    {categories.map((category) => (
                                        <li
                                            className="category-link"
                                            key={category}
                                            onClick={() => setCategory(category)}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>

                                <fieldset>
                                    <Typography component="legend">Ratings Above</Typography>
                                    <Slider
                                        value={rating}
                                        onChange={(e, newRating) => {
                                            setRating(newRating);
                                        }}
                                        aria-labelledby="continuous-slider"
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={5}
                                    />
                                </fieldset>

                            </div>) : ("")}

                    </Fragment>
                )
            }
        </Fragment>
    )
}


export default Products
