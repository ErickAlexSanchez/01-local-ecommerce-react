import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { useState, useEffect, useEffectEvent } from "react"
import { db } from "./data/db";

function App() {


  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const minimumProductQuantity = 1;



  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) =>{
    const itemExist = cart.findIndex(n => n.id == item.id)
    if (itemExist >= 0) {
      const updatedCar = [...cart];
      updatedCar[itemExist].quantity++;
      setCart(updatedCar);
    } else {
      item.quantity = 1;
    setCart([...cart, item]);
    }
  }

  const removeFromCart = (id)=> {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

    const increaseQuantity = (id) => {
      const updatedCar = cart.map( item => {
        if(item.id === id) {
          return{
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
      setCart(updatedCar);
    }


    const decreaseQuantity = (id) =>{
      const updatedCart = cart.map( item => {
        if(item.id === id && item.quantity > minimumProductQuantity ) {
          return{
            ...item,
            quantity: item.quantity - 1
          }
        }
        return item;
      })
      setCart(updatedCart)
    }


    const cleanCart = () => {
      setCart([]);
    }


  return(
    <>
  <Header
  cart = {cart}
  removeFromCart = {removeFromCart}
  increaseQuantity = {increaseQuantity}
  decreaseQuantity = {decreaseQuantity}
  cleanCart = {cleanCart}
   />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
        {data.map((guitar) => (
                <Guitar
                  key={guitar.id}
                  guitar = {guitar}
                  setCart = {setCart}
                  addToCart = {addToCart}
                />
        ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )

}

export default App
