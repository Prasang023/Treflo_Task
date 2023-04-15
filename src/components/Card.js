import React from "react"
import Badge from "./Badge"
import { BsStar } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../redux/slices/cart"

const Card = ({
  id,
  name,
  description,
  isVeg,
  rating,
  price,
  img_url,
  size,
  toppings,
  openModal
}) => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  var n = 0
  const getNumber = () => {
    n = 0
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === id) n=n+cartItems[i].quantity
    }
    
  }
  getNumber()
  return (
    <>
      <div className="card">
        <div className="card-badge">
          <Badge isVeg={isVeg} />
        </div>
        <img
          src={img_url}
          alt="pizza"
          width="100"
          height="100"
          className="card-img"
        />
        <div className="card-content">
          <h6 className="card-content-title">{name}</h6>
          <small className="card-content-desc">{description}</small>
          <div className="card-content-rating">
            <BsStar color="#FEC532" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
        <div className="card-buy-div">
          <h4>₹{price}</h4>
          {(n)>0 ? (
            <>
              <button className="btnt btn-circle" onClick={() => dispatch(removeFromCart(id))}>-</button>
              {n}
              <button className="btnt btn-circle" onClick={() => openModal(id)}>+</button>
            </>
          ) : (
            <button className="btnt" onClick={() => openModal(id)}>
              Add to cart
            </button>
          )}
          
        </div>
      </div>
    </>
  )
}

export default Card

// 1
// name(pin):"Margherita"
// description(pin):"A classic delight with 100% Real mozzarella cheese"
// isVeg(pin):true
// rating(pin):3.5
// price(pin):239
// img_url(pin):"https://upload.wikimedia.org/wikipedia/commons/6/6f/Pizza_on_stone.jpg"
// isRadio(pin):true
// title(pin):"choose size
