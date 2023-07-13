import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import ProductCard from "./ProductCard.js"
import Metadata from '../layout/Metadata'
import "./Home.css"
import { getproduct } from '../../actions/productactions.js'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from "react-alert";
import Loader from '../layout/Loader/loader.js'


const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, products, productcount, error } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getproduct())
    }, [dispatch, error, alert])


    return (
        <Fragment>
            {
                loading ? (<Loader />) : (
                    <Fragment>
                        <Metadata title="HOME PAGE" />
                        <div className="banner">
                            <p>Welcome to Ecommerce</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>

                            <a href="#container">
                                <button>
                                    Scroll <CgMouse />
                                </button>
                            </a>
                        </div>

                        <h2 className="homeHeading">Featured Products</h2>

                        <div className="container" id="container">
                            {products && products.map((product) => (
                                <ProductCard product={product} />
                            ))}
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}


export default Home