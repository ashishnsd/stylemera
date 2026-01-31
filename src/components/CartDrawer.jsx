import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UIContext } from "../context/UIContext";

export default function CartDrawer() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { isCartOpen, setCartOpen } = useContext(UIContext);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ pointerEvents: isCartOpen ? 'auto' : 'none' }}>
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.38)',
          opacity: isCartOpen ? 1 : 0,
          transition: 'opacity 0.4s ease',
          zIndex: 1001
        }}
      />

      <div className={`sidebar ${isCartOpen ? "active" : ""}`} style={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: '350px',
        maxWidth: '92vw',
        background: 'white',
        boxShadow: '-2px 0 18px rgba(0,0,0,0.18)',
        zIndex: 1002,
        overflowY: 'auto',
        transform: isCartOpen ? 'translateX(0)' : 'translateX(104%)',
        transition: 'transform 0.6s cubic-bezier(0.12, 0.72, 0.24, 1)',
        willChange: 'transform',
        backdropFilter: 'blur(0px)'
      }}>
        <div style={{
          padding: '20px',
          transform: isCartOpen ? 'translateX(0)' : 'translateX(14px)',
          opacity: isCartOpen ? 1 : 0,
          transition: 'transform 0.44s ease-out, opacity 0.36s ease-out',
          transitionDelay: isCartOpen ? '60ms' : '0ms'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>Shopping Cart</h3>
          <button 
            onClick={() => setCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '15px',
                padding: '15px',
                borderBottom: '1px solid #eee',
                marginBottom: '10px'
              }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{item.title}</h4>
                  <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Qty: {item.quantity}</p>
                  <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#f0c14b' }}>₹{item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: '#8b9a8b',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    height: 'fit-content'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <strong>Total:</strong>
                <strong style={{ color: '#f0c14b', fontSize: '18px' }}>₹{total.toFixed(2)}</strong>
              </div>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(90deg, #8b9a8b, #6d7d6d)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
}
