import { useState } from 'react';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const VegIndicator = ({ isVeg }) => (
  <span
    className={`veg-indicator ${isVeg ? 'veg' : 'non-veg'}`}
    title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    aria-label={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
  />
);

const PizzaCard = ({ pizza }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const actionLoading = useSelector((state) => state.cart.actionLoading);
  const [addedMsg, setAddedMsg] = useState(null);
  const [addError, setAddError] = useState(null);

  const cartItem = cartItems.find(
    (item) => !item.isCustom && String(item.pizzaId) === String(pizza._id)
  );
  const inCartQty = cartItem?.quantity || 0;

  const handleAddToCart = async () => {
    setAddedMsg(null);
    setAddError(null);
    try {
      await dispatch(
        addToCart({
          pizzaId: pizza._id,
          name: pizza.name,
          quantity: 1,
          price: pizza.price,
          image: pizza.image,
          isVeg: pizza.isVeg,
          isCustom: false,
          customIngredients: [],
        })
      ).unwrap();
      setAddedMsg('Added to cart!');
      setTimeout(() => setAddedMsg(null), 2000);
    } catch {
      setAddError('Could not add to cart. Please try again.');
    }
  };

  return (
    <Card className="pizza-card h-100">
      <Card.Body>
        <Row className="g-2">
          <Col xs={4} md={3}>
            <Card.Title className="pizza-name">{pizza.name}</Card.Title>
            <VegIndicator isVeg={pizza.isVeg} />
            <p className="price-text mt-3 mb-0">₹{pizza.price.toFixed(2)}</p>
            {inCartQty > 0 && (
              <small className="text-success fw-semibold d-block mt-1">
                In cart: {inCartQty}
              </small>
            )}
          </Col>
          <Col xs={8} md={5}>
            <Card.Text className="pizza-description">{pizza.description}</Card.Text>
            <p className="pizza-meta mb-1">
              <strong>Ingredients :</strong> {pizza.ingredients?.join(',')}
            </p>
            <p className="pizza-meta mb-0">
              <strong>Toppings :</strong> {pizza.toppings?.join(',')}
            </p>
          </Col>
          <Col md={4} className="text-center d-flex flex-column align-items-center justify-content-center">
            <img src={pizza.image} alt={pizza.name} className="pizza-img mb-3" />
            {addError && (
              <Alert variant="danger" className="py-1 px-2 small mb-2">
                {addError}
              </Alert>
            )}
            {addedMsg && (
              <Alert variant="success" className="py-1 px-2 small mb-2">
                {addedMsg}
              </Alert>
            )}
            <Button
              variant="warning"
              className="add-cart-btn classic-btn"
              onClick={handleAddToCart}
              disabled={actionLoading}
            >
              {actionLoading ? 'Adding...' : 'Add to Cart'}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PizzaCard;
