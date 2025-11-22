import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartitems, setcartitems] = useState({});
    const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [food_list, setfoodlist] = useState([])

    const addTocart = async (itemId) => {
        if (!cartitems[itemId]) {
            setcartitems((prev) => ({ ...prev, [itemId]: 1 }))

        } else {
            setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removefromcart = async (itemId) => {
        setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const gettotalcartamount = () => {
        let totalamount = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item);
                totalamount += iteminfo.price * cartitems[item];
            }
        }
        return totalamount;
    }


    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        console.log(response.data);

        setfoodlist(response.data.data)
    }
    const loadCartData = async (token) => {

        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setcartitems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
            await fetchFoodList()
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartitems,
        setcartitems,
        addTocart,
        removefromcart,
        gettotalcartamount,
        url,
        setToken,
        token
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;