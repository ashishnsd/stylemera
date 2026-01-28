import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <main className="container">
      <h2 className="title">Your Cart</h2>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} width="80" />
          <div>
            <h4>{item.title}</h4>
            <p>Qty: {item.quantity}</p>
            <p>₹{item.price}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </main>
  );
}
