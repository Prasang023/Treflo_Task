import React from "react"
import Layout from "../components/Layout"
import CartCard from "../components/CartCard"
import { useDispatch, useSelector } from "react-redux"

const Cart = () => {
  const { cartItems, totalAmt } = useSelector((state) => state.cart)
  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-list">
          <h4>Cart Items</h4>
          {cartItems.length == 0 ? (
            <h6>No Items added to Cart</h6>
          ) : (
            cartItems.map((item) => <CartCard pizza={item} />)
          )}
        </div>
        <div className="cart-summary">
          <h4>Cart Summary</h4>
          {cartItems.length == 0 ? (
            <div>No Items added to cart</div>
          ) : (
            <>
              <div>
                {cartItems.map((item) => (
                  <div className="cart-summary-txt">
                    <p>{item.name}:</p> <b>{item.price * item.quantity}</b>
                  </div>
                ))}
                <div className="cart-summary-txt">
                  <p>Total Bill:</p> <b>{totalAmt}</b>
                </div>
              </div>
              <button className="btnt">Proceed</button>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Cart
