import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Error from "../components/Error"
import Layout from "../components/Layout"
import { getMenu, sortByPrice, sortByRatings } from "../redux/slices/menu"
import { setError } from "../redux/slices/error"
import { addToCart } from "../redux/slices/cart"
import Card from "../components/Card"
import Success from "../components/Success"
import Loader from "../components/Loader"
import { AiOutlineCloseCircle } from "react-icons/ai"

const Home = () => {
  const dispatch = useDispatch()
  const [pizza, setPizza] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const [category, setCategory] = useState("all")
  const { menuItems } = useSelector((state) => state.menu)

  useEffect(() => {
    dispatch(getMenu())
  }, [dispatch])

  const openModal = (id) => {
    const item = menuItems[id - 1]
    setPizza({ ...item, selectedToppings: [], selectedSize: null })
    setIsModal(true)
  }

  const editToppings = (tkey, isRadio) => {
    if (isRadio) {
      var tarr = pizza.selectedToppings
      console.log(tarr)
      if (pizza.selectedToppings.length === 1) tarr[0] = tkey
      else tarr.push(tkey)
      setPizza({
        ...pizza,
        selectedToppings: tarr
      })
      return
    }
    var tmpItem = pizza
    console.log("ran func")
    var sz = tmpItem.selectedToppings.length
    tmpItem.selectedToppings = tmpItem.selectedToppings.filter((i) => i !== tkey)
    if (tmpItem.selectedToppings.length === sz) {
      tmpItem.selectedToppings.push(tkey)
      tmpItem.selectedToppings.sort()
      setPizza(tmpItem)
    } else {
      tmpItem.selectedToppings.sort()
      setPizza(tmpItem)
    }
  }

  const sortList = (val) => {
    if (val === "price") {
      dispatch(sortByPrice())
    } else if (val === "ratings") {
      dispatch(sortByRatings())
    } else {
      dispatch(getMenu())
    }
  }

  const updateCart = () => {
    if (pizza.selectedSize == null) {
      dispatch(setError("Please select a size for the pizza"))
      return
    }
    dispatch(addToCart(pizza))
    setIsModal(false)
  }

  console.log(isModal)
  console.log(pizza)
  console.log("category: ", category)
  return (
    <Layout>
      <Success />
      {isModal ? (
        <div className="modal-container">
          <div className="pizza-modal">
            {pizza?.size[0].isRadio ? (
              <>
                <div className="modal-head">
                  <h4>Addons</h4>
                  <AiOutlineCloseCircle
                    color="#FEC532"
                    size={25}
                    onClick={() => setIsModal(false)}
                  />
                </div>
                <h5>{pizza?.size[0].title}</h5>
                <div className="modal-select">
                  {(pizza?.size[0].items).map((item, key) => (
                    <div
                      onClick={() => setPizza({ ...pizza, selectedSize: key })}
                    >
                      <input
                        type="radio"
                        id={`${item.size}`}
                        name="sizes"
                        value={key}
                      ></input>
                      <label htmlFor={`${item.size}`}>{item.size}</label>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
            {pizza?.toppings[0].isRadio ? (
              <>
                <h5>{pizza?.toppings[0].title}</h5>
                <div className="modal-select">
                  {(pizza?.toppings[0].items).map((item, key) => (
                    <div onClick={() => editToppings(key, 0)}>
                      <input
                        type="checkbox"
                        id={`${item.name}`}
                        name="toppings"
                        value={key}
                      ></input>
                      <label htmlFor={`${item.name}`}>{item.name}</label>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h5>{pizza?.toppings[0].title}</h5>
                <div className="modal-select">
                  {(pizza?.toppings[0].items).map((item, key) => (
                    <div onClick={() => editToppings(key, 1)}>
                      <input
                        type="radio"
                        id={`${item.name}`}
                        name="toppings"
                        value={key}
                      ></input>
                      <label htmlFor={`${item.name}`}>{item.name}</label>
                    </div>
                  ))}
                </div>
              </>
            )}
            <Error />
            <button className="btnt" onClick={updateCart}>
              Add to cart
            </button>
          </div>
        </div>
      ) : null}
      <div className="card-container">
        <div className="dropdown-div">
          <select
            name="sortBy"
            id="sortBy"
            onChange={(e) => sortList(e.target.value)}
            className="dropdown-element"
          >
            <option value="none" className="dropdown-option">
              Sort By
            </option>
            <option value="price" className="dropdown-option">
              Price
            </option>
            <option value="ratings" className="dropdown-option">
              Ratings
            </option>
          </select>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="dropdown-element"
          >
            <option value="all" className="dropdown-option">
              Filter
            </option>
            <option value="veg" className="dropdown-option">
              Veg
            </option>
            <option value="nonveg" className="dropdown-option">
              Non-Veg
            </option>
          </select>
        </div>
        {/* <div className="card-list"> */}
        {menuItems.length ? (
          menuItems.map((item) => {
            if (category === "veg" && item.isVeg)
              return <Card {...item} key={item.id} openModal={openModal} />
            else if (category === "nonveg" && item.isVeg === false)
              return <Card {...item} key={item.id} openModal={openModal} />
            else if (category === "all")
              return <Card {...item} key={item.id} openModal={openModal} />
              return null
          })
        ) : (
          <Loader />
        )}
      </div>
    </Layout>
  )
}

export default Home
