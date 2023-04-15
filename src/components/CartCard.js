import React from "react"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../redux/slices/cart"

const CartCard = ({ pizza }) => {
  const dispatch = useDispatch()
  const {
    img_url,
    id,
    name,
    description,
    isVeg,
    rating,
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

{
  /* id(pin):3
name(pin):"Pepper Barbecue & Onion"
description(pin):"A classic favorite with pepper barbeque chicken & onion"
isVeg(pin):false
rating(pin):4.5
price(pin):435
img_url(pin):"https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg"
 */
}
