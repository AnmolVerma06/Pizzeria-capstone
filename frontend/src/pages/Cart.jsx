import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Collapse,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from '../store/cartSlice';
import { orderAPI } from '../api/api';
import OrderPlacedModal from '../components/OrderPlacedModal';
import CustomIngredientsList from '../components/CustomIngredientsList';

const VegIndicator = ({ isVeg }) => (
  <span
    className={`veg-indicator ${isVeg ? 'veg' : 'non-veg'}`}
    title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
  />
);

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, pizzaTotal, ingredientsTotal, grandTotal, loading } = useSelector(
    (state) => state.cart
  );
  const [showIngredients, setShowIngredients] = useState(true);
  const [payError, setPayError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    dispatch(updateCartQuantity({ id, quantity: newQty }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
    setPayError(null);
    reset();
  };

  const onPay = async (formData) => {
    setPayError(null);

    if (items.length === 0) {
      setPayError('Your cart is empty. Add items before checkout.');
      return;
    }

    setSubmitting(true);
    try {
      const orderItems = items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        isVeg: item.isVeg,
        isCustom: item.isCustom,
        customIngredients: item.customIngredients || [],
      }));

      const response = await orderAPI.create({
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        items: orderItems,
        pizzaTotal,
        ingredientsTotal,
        grandTotal,
      });

      const savedOrder = response.data.data;

      setOrderDetails({
        orderNumber: savedOrder.orderNumber,
        fullName: formData.fullName,
        address: formData.address,
        grandTotal: savedOrder.grandTotal,
        items: (savedOrder.items || orderItems).map((item) => {
          const ingCost =
            item.customIngredients?.reduce((sum, ing) => sum + ing.price, 0) || 0;
          return {
            name: item.name,
            quantity: item.quantity,
            lineTotal: (item.price + ingCost) * item.quantity,
            isCustom: item.isCustom,
            customIngredients: item.customIngredients || [],
          };
        }),
      });
      setShowSuccessModal(true);
      reset();
      dispatch(clearCart());
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        'Failed to place order. Please try again.';
      setPayError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const allCustomIngredients = items.flatMap((item) =>
    item.customIngredients?.map((ing) => ({
      ...ing,
      quantity: item.quantity,
    })) || []
  );

  return (
    <Container className="cart-page-wrap py-4">
      <div className="cart-content-card">
        <h2 className="cart-title mb-4">My Cart</h2>

        {payError && <Alert variant="danger">{payError}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : items.length === 0 && !showSuccessModal ? (
          <Alert variant="info" className="text-center">
            Your cart is empty. <Link to="/order-pizza">Order some pizza!</Link>
          </Alert>
        ) : items.length > 0 ? (
          <>
            <Card className="cart-card mb-4">
              <Card.Body>
                {items.map((item) => {
                  const ingCost =
                    item.customIngredients?.reduce((sum, ing) => sum + ing.price, 0) || 0;
                  const lineTotal = (item.price + ingCost) * item.quantity;

                  return (
                    <div key={item._id} className="cart-item border-bottom pb-3 mb-3">
                      <Row className="align-items-center">
                        <Col xs={3} md={2}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-img rounded-circle"
                          />
                        </Col>
                        <Col xs={9} md={4}>
                          <VegIndicator isVeg={item.isVeg} />
                          <h6 className="cart-item-name mb-1 mt-1">{item.name}</h6>
                          {item.isCustom ? (
                            <>
                              <CustomIngredientsList ingredients={item.customIngredients} />
                              
                            </>
                          ) : (
                            <small className="text-muted">₹{item.price.toFixed(0)}</small>
                          )}
                        </Col>
                        <Col xs={6} md={3} className="mt-2 mt-md-0">
                          <div className="quantity-controls d-flex align-items-center">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              -
                            </Button>
                            <span className="mx-3 fw-bold">{item.quantity}</span>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </Button>
                          </div>
                        </Col>
                        <Col xs={4} md={2} className="text-end mt-2 mt-md-0">
                          <strong>₹{lineTotal.toFixed(2)}</strong>
                        </Col>
                        <Col xs={2} md={1} className="text-end mt-2 mt-md-0">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemove(item._id)}
                            aria-label="Remove item"
                          >
                            <i className="bi bi-trash" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
                <div className="text-end">
                  <strong>Sub Total : ₹{grandTotal.toFixed(2)}</strong>
                </div>
              </Card.Body>
            </Card>

            <Row className="g-4">
              <Col lg={8}>
                <Card className="billing-form-card">
                  <Card.Body>
                    <h5 className="billing-form-title mb-3">Billing Details</h5>
                    <Form onSubmit={handleSubmit(onPay)}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          className="billing-input"
                          {...register('fullName', { required: 'Full name is required' })}
                          isInvalid={!!errors.fullName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.fullName?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Enter phone number"
                          className="billing-input"
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: 'Enter a valid 10-digit phone number',
                            },
                          })}
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-0">
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter delivery address"
                          className="billing-input"
                          {...register('address', { required: 'Delivery address is required' })}
                          isInvalid={!!errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="billing-card">
                  <Card.Body>
                    <h5 className="mb-3">The total amount of</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Pizza</span>
                      <span>₹{pizzaTotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span
                        className="ingredients-toggle"
                        onClick={() => setShowIngredients(!showIngredients)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && setShowIngredients(!showIngredients)
                        }
                      >
                        Ingredients{' '}
                        <i className={`bi bi-chevron-${showIngredients ? 'up' : 'down'}`} />
                      </span>
                      <span>₹{ingredientsTotal.toFixed(2)}</span>
                    </div>
                    <Collapse in={showIngredients}>
                      <div className="ingredient-breakdown mb-2">
                        {allCustomIngredients.length > 0 ? (
                          allCustomIngredients.map((ing, idx) => (
                            <div
                              key={idx}
                              className="d-flex justify-content-between small text-muted"
                            >
                              <span>{ing.name}</span>
                              <span>₹{(ing.price * ing.quantity).toFixed(2)}</span>
                            </div>
                          ))
                        ) : (
                          <small className="text-muted">No custom ingredients</small>
                        )}
                      </div>
                    </Collapse>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                      <span>Total :</span>
                      <span>₹{grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="d-grid gap-2">
                      <Button
                        variant="warning"
                        className="pay-btn"
                        size="lg"
                        onClick={handleSubmit(onPay)}
                        disabled={submitting}
                      >
                        {submitting ? 'Processing...' : 'Pay'}
                      </Button>
                      <Button variant="dark" className="clear-btn" onClick={handleClear}>
                        Clear
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : null}
      </div>

      <OrderPlacedModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        orderDetails={orderDetails}
      />
    </Container>
  );
};

export default CartPage;
