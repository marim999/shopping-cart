import { createContext, useEffect , useContext } from "react";
import { useState } from "react";

const CartContext =createContext()
export const useCart = () => useContext(CartContext)
export const CartProvider = ({children}) =>{

const [cart ,setCart] = useState(()=>{
  let items =  localStorage.getItem("cart")
  return items ? JSON.parse(items) : []
})

//Update Cart (Local storage) ==> Update in state
useEffect(()=>{
 localStorage.setItem("cart" , JSON.stringify(cart))
},[cart])

const addToCart =(product) =>{
  setCart(initCart =>{
    const existingProduct = initCart.find(item => item.id == product.id)
    if(existingProduct){
      return initCart.map(item => {
        return item.id == product.id ? {...product, qty: item.qty +1}: item
      })
    }
    return [...initCart, {...product , qty: 1 }]
  })
}
// clear all products from cart 
const clearCart =()=>{
  setCart([])
}
// remove one item
const removeFromCart =(id) =>{
  setCart(initCart => 
    initCart.filter((item) => item.id !== id)
  )
}
// Decrment item
const decrementItem = (id) =>{
 setCart ((prev) =>
prev.map((item) => item.id == id ? {...item , qty: item.qty-1} : item)
  .filter((item)=> item.qty > 0)
 )
}

const incrementItem =(id) =>{
  setCart ((prev) =>
  prev.map((item) => item.id === id ? {...item , qty: item.qty+1}: item)
  )
}

// Total Cart Items
const totalItems = (cart ?? []).reduce((total , product) =>{
return total + product.qty
},0)

//Total price 
const totalPrice = (cart ?? []).reduce((total , product) =>{
  return total +( product.price *product.qty)
},0)

return(

<>
<CartContext.Provider value={{ cart ,totalPrice, totalItems,addToCart , clearCart , removeFromCart ,decrementItem ,incrementItem}}>
    {children}
</CartContext.Provider>
</>
)


}
