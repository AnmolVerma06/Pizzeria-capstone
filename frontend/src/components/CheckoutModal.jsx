import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CheckoutModal = ({ show, onHide, onConfirm, grandTotal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    onConfirm(data);
    reset();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <p className="mb-3">
            Total amount: <strong>₹{grandTotal.toFixed(2)}</strong>
          </p>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
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
          <Form.Group className="mb-3">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter delivery address"
              {...register('address', { required: 'Address is required' })}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {grandTotal <= 0 && (
            <Alert variant="warning">Cart is empty. Cannot proceed with checkout.</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="warning" type="submit" disabled={grandTotal <= 0}>
            Confirm Payment
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CheckoutModal;
