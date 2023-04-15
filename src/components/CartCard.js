import React from "react"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../redux/slices/cart"

const CartCard = ({ pizza }) => {
  const dispatch = useDispatch()
  const {
    img_url,
    id,
    name,
    price,
    quantity,
    selectedSize,
    selectedToppings,
    size,
    toppings
  } = pizza
  return (
    <div className="cart-card-div">
      <img
        src={img_url}
        alt="pizza"
        width="120"
        height="120"
        className="cart-card-img"
      />
      <div className="cart-card-content">
        <div className="cart-card-txt">
          <h5>{name}</h5>
          <p>
            <b>Quantity:</b> {quantity} <br />
            <b>Size:</b> {size[0].items[selectedSize].size} <br />
            <b>Toppings:</b>{" "}
            {selectedToppings.map((i) => " " + toppings[0].items[i].name + ",")}
          </p>
        </div>
        <div className="cart-card-price">
          <h4>₹{price}</h4>
          <div>
            <button
              className="btnt btn-circle"
              onClick={() => dispatch(removeFromCart(id))}
            >
              -
            </button>
            {quantity}
            <button
              className="btnt btn-circle"
              onClick={() => dispatch(addToCart(pizza))}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartCard