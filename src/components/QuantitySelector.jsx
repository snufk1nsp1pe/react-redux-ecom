import "./QuantitySelector.css";

/**
 * Small reusable +/- stepper used on the product details page and in the cart.
 * The parent owns the actual quantity state/dispatch - this component is purely presentational.
 */
function QuantitySelector({ quantity, onDecrease, onIncrease, min = 1 }) {
  return (
    <div className="quantity-selector">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={onIncrease} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
