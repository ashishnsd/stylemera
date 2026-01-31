export default function flyToCartFromElement(el) {
  try {
    if (!el || typeof document === 'undefined') return;
    const cartBtn = document.getElementById('cart-button');
    if (!cartBtn) return;

    // Find nearest image by walking up ancestors and searching for <img>
    let ancestor = el;
    let imgEl = null;
    while (ancestor && ancestor !== document.body) {
      imgEl = ancestor.querySelector && ancestor.querySelector('img');
      if (imgEl) break;
      ancestor = ancestor.parentElement;
    }
    if (!imgEl) return;

    const imgRect = imgEl.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();

    const flying = imgEl.cloneNode(true);
    flying.style.position = 'fixed';
    flying.style.left = `${imgRect.left}px`;
    flying.style.top = `${imgRect.top}px`;
    flying.style.width = `${imgRect.width}px`;
    flying.style.height = `${imgRect.height}px`;
    flying.style.transition = 'transform 1100ms cubic-bezier(0.2,0.8,0.2,1), opacity 1100ms ease';
    flying.style.zIndex = 9999;
    flying.style.borderRadius = '8px';
    flying.style.pointerEvents = 'none';
    document.body.appendChild(flying);

    // Force reflow then animate
    void flying.offsetWidth;

    const targetX = cartRect.left + cartRect.width / 2 - imgRect.width / 2;
    const targetY = cartRect.top + cartRect.height / 2 - imgRect.height / 2;
    flying.style.transform = `translate3d(${targetX - imgRect.left}px, ${targetY - imgRect.top}px, 0) scale(0.15)`;
    flying.style.opacity = '0.6';

    // Cart pulse
    cartBtn.classList.add('cart-hit');
    setTimeout(() => cartBtn.classList.remove('cart-hit'), 1050);

    setTimeout(() => {
      try { document.body.removeChild(flying); } catch (e) {}
    }, 1150);
  } catch (e) {
    // noop
  }
}
