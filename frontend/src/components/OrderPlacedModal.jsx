import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomIngredientsList from './CustomIngredientsList';

const OrderPlacedModal = ({ show, onHide, orderDetails }) => {
  const navigate = useNavigate();

  if (!orderDetails) return null;

  const handleGoHome = () => {
    onHide();
    navigate('/');
  };

  return (
    <Modal show={show} onHide={onHide} centered className="order-placed-modal">
      <Modal.Body className="order-placed-body">
        <div className="text-center">
          <div className="order-success-icon">
            <i className="bi bi-check-lg" />
          </div>
          <h4 className="order-placed-title">Order Placed!</h4>
          <p className="order-number-badge">
            Order Number: <strong>{orderDetails.orderNumber}</strong>
          </p>
        </div>

        <p className="order-placed-message text-center">
          Thank you, <strong>{orderDetails.fullName}</strong>! Your order totaling{' '}
          <strong>₹{orderDetails.grandTotal.toFixed(2)}</strong> has been successfully placed.
          Our chefs are preparing your pizzas, and they will be delivered to{' '}
          <em>{orderDetails.address}</em> within <strong>45 minutes</strong>.
        </p>

        <div className="order-items-summary">
          <h6 className="order-items-title">Order Details</h6>
          {orderDetails.items?.map((item, idx) => (
            <div key={idx} className="order-item-row">
              <div className="flex-grow-1">
                <span className="order-item-name">{item.name}</span>
                <span className="order-item-qty"> x {item.quantity}</span>
                {item.isCustom && item.customIngredients?.length > 0 && (
                  <CustomIngredientsList
                    ingredients={item.customIngredients}
                    className="mt-1"
                  />
                )}
              </div>
              <strong className="ms-2">₹{item.lineTotal.toFixed(2)}</strong>
            </div>
          ))}
          <div className="order-item-row order-total-row">
            <span>Grand Total</span>
            <strong>₹{orderDetails.grandTotal.toFixed(2)}</strong>
          </div>
        </div>

        <div className="text-center mt-3">
          <Button variant="warning" className="go-home-btn" onClick={handleGoHome}>
            Go to Home Page
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderPlacedModal;
