const CustomIngredientsList = ({ ingredients, showPrices = true, className = '' }) => {
  if (!ingredients?.length) return null;

  return (
    <div className={`custom-ingredients-list ${className}`}>
      <small className="ingredients-label">Ingredients:</small>
      {ingredients.map((ing, i) => (
        <small key={i} className="ingredient-line d-block">
          {ing.name}
          {showPrices && ` — ₹${Number(ing.price).toFixed(2)}`}
        </small>
      ))}
    </div>
  );
};

export default CustomIngredientsList;
