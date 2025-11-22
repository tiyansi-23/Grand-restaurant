// import React, { useContext, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../context/StoreContext'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const PlaceOrder = () => {
//   const { gettotalcartamount, food_list, cartitems } = useContext(StoreContext)

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     phone: ""
//   })

//   const onChangeHandler = (event) => {
//     const name = event.target.name
//     const value = event.target.value
//     setData((data) => ({ ...data, [name]: value }))
//   }

//   const placeOrder = (event) => {
//     event.preventDefault()

//     // Build fake order data
//     let orderItems = []
//     food_list.forEach((item) => {
//       if (cartitems[item._id]) {
//         orderItems.push({ ...item, quantity: cartitems[item._id] })
//       }
//     })

//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: gettotalcartamount() + 20,
//     }

//     console.log("Order Placed:", orderData)

//     // Just show success message instead of API/payment
//     toast.success("🎉 Payment Successful! Your order is confirmed.")
//   }

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <ToastContainer />

//       <div className="place-order-left">
//         <div className="title">Delivery Information</div>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="pincode"
//             onChange={onChangeHandler}
//             value={data.pincode}
//             type="text"
//             placeholder="Pincode"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>₹{gettotalcartamount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery charge</p>
//               <p>₹{gettotalcartamount() === 0 ? 0 : 20}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Total</p>
//               <p>₹{gettotalcartamount() === 0 ? 0 : gettotalcartamount() + 20}</p>
//             </div>
//           </div>
//           <button type="submit" className="pyt">
//             PROCEED TO PAYMENT
//           </button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default PlaceOrder



// import React, { useContext, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../context/StoreContext'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'

// const PlaceOrder = () => {
//   const { gettotalcartamount, food_list, cartitems, token } =
//     useContext(StoreContext)

//   const [data, setData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     pincode: '',
//     country: '',
//     phone: ''
//   })

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target
//     setData((prev) => ({ ...prev, [name]: value }))
//   }

//   const placeOrder = async (event) => {
//     event.preventDefault()

//     // Build order items from cart
//     let orderItems = []
//     food_list.forEach((item) => {
//       if (cartitems[item._id]) {
//         orderItems.push({ ...item, quantity: cartitems[item._id] })
//       }
//     })

//     if (orderItems.length === 0) {
//       toast.error('🛒 Your cart is empty!')
//       return
//     }

//     // Order payload (no userId, middleware adds it)
//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: gettotalcartamount() + 20
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:4000/api/orders/place',
//         orderData,
//         {
//           headers: {
//             token: token // 👈 backend expects { token }
//           }
//         }
//       )

//       if (response.data.success) {
//         toast.success('🎉 Payment Successful! Your order is confirmed.')
//         console.log('Order Saved:', response.data)
//       } else {
//         toast.error('⚠️ Order failed!')
//       }
//     } catch (err) {
//       console.error('Error placing order:', err)
//       toast.error('⚠️ Something went wrong while placing your order.')
//     }
//   }

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <ToastContainer />

//       <div className="place-order-left">
//         <div className="title">Delivery Information</div>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="pincode"
//             onChange={onChangeHandler}
//             value={data.pincode}
//             type="text"
//             placeholder="Pincode"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>₹{gettotalcartamount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery charge</p>
//               <p>₹{gettotalcartamount() === 0 ? 0 : 20}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Total</p>
//               <p>
//                 ₹
//                 {gettotalcartamount() === 0
//                   ? 0
//                   : gettotalcartamount() + 20}
//               </p>
//             </div>
//           </div>
//           <button type="submit" className="pyt">
//             PROCEED TO PAYMENT
//           </button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default PlaceOrder


import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const PlaceOrder = () => {
  const { gettotalcartamount, food_list, cartitems, token } =
    useContext(StoreContext)

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  })

  // handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  // handle order placement
  const placeOrder = async (event) => {
    event.preventDefault()

    // collect cart items
    let orderItems = []
    food_list.forEach((item) => {
      if (cartitems[item._id]) {
        orderItems.push({ ...item, quantity: cartitems[item._id] })
      }
    })

    if (orderItems.length === 0) {
      toast.error('🛒 Your cart is empty!')
      return
    }

    // order payload
    let orderData = {
      address: data,
      items: orderItems,
      amount: gettotalcartamount() + 20
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/orders/place',
        orderData,
        {
          headers: {
            token: token // auth middleware will extract userId
          }
        }
      )

      if (response.data.success) {
        toast.success('🎉 Order placed successfully!')
        console.log('✅ Order Saved:', response.data)
      } else {
        toast.error('⚠️ Failed to place order!')
      }
    } catch (err) {
      console.error('❌ Error placing order:', err)
      toast.error('⚠️ Something went wrong while placing your order.')
    }
  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      <ToastContainer />

      <div className="place-order-left">
        <div className="title">Delivery Information</div>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="pincode"
            onChange={onChangeHandler}
            value={data.pincode}
            type="text"
            placeholder="Pincode"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{gettotalcartamount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery charge</p>
              <p>₹{gettotalcartamount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ₹
                {gettotalcartamount() === 0
                  ? 0
                  : gettotalcartamount() + 20}
              </p>
            </div>
          </div>
          <button type="submit" className="pyt">
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
