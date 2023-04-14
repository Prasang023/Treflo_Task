import React, { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
// import { Button, Space, Modal, Input } from "antd"
import { useDispatch, useSelector } from "react-redux"
import Error from "../components/Error"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { getMenu } from "../redux/slices/menu"
import Card from "../components/Card"
import Loader from "../components/Loader"

const Home = () => {
  const dispatch = useDispatch()
  const { menuItems } = useSelector((state) => state.menu)

  useEffect(() => {
    dispatch(getMenu())
  }, [dispatch])

  console.log(menuItems)
  return <Layout>
    {menuItems.length? <Card />: <Loader />}
    <Error />
  </Layout>
}

export default Home
