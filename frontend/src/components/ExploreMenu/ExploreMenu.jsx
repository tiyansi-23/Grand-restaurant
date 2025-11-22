import React from 'react'
import './ExploreMenu.css'

import {menu_list} from '../../assets/assets'
function ExploreMenu({category,setcategory}) {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>🍴 Our menu is filled with fresh, delicious, and lovingly prepared dishes. Each recipe is crafted with care and the finest ingredients to bring you an authentic taste in every bite. Whether you’re craving a light snack, a hearty meal, or a sweet dessert – we have something special for every taste</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category==item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu