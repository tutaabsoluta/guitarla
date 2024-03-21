/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {

  // Check Local Storage
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  // Add to cart
  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  // Clear cart
  function clearCart() {
    setCart([]);
  }

  // Remove from cart
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter( guitar => guitar.id !== id ))
  }

  // Increase quantity
  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
           quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
           quantity: item.quantity - 1
        }
      }
      return item
    } )
    setCart(updatedCart)
  }

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);


  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              guitar={guitar} 
              key={guitar.id} 
              addToCart={addToCart}
            />
            
          ))}
        </div>

      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}



export default App;

// updatedCart[itemExists]++: itemExists es el indice

// setCart(prevCart => prevCart.filter( guitar => guitar.id !== id )):
// Filtra las guitarras cuyo id es diferente al que se pasa por parametro

// El segundo return de increaseQuantity es para que el resto de elementos a los que no le di click para incrementar la cantidad se mantengan

// El State en React es asincrono. La funcion saveLocalStorage se manda a llamar aun cuando el state no ha sido modificado. El State no se actualiza inmediatamente. POrque: si fuera sincrono no podria presionar en la pantalla hasta que no escriba ese State, lo dejaria sin respuesta

// Lo anterior se soluciona con useEffect.

