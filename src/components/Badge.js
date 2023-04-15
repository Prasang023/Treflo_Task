import React from 'react'

const Badge = ({isVeg}) => {
  return (
    <span className={isVeg? "badge-veg": "badge-nonveg"}>{isVeg?"Veg":"Non-veg"}</span>
  )
}

export default Badge