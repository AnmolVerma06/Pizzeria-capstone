import { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { pizzaAPI } from '../api/api';
import PizzaCard from '../components/PizzaCard';

const OrderPizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPizzas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await pizzaAPI.getAll();
      setPizzas(response.data.data);
    } catch {
      setError('Failed to load pizzas. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  return (
    <Container className="order-page-wrap py-3">
      
      <div className="classic-panel">
        <h2 className="sr-only">Order Pizza</h2>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && pizzas.length === 0 && (
        <Alert variant="info" className="text-center">
          No pizzas found matching your criteria.
        </Alert>
      )}

        <Row className="g-0">
          {pizzas.map((pizza) => (
            <Col key={pizza._id} lg={6}>
              <PizzaCard pizza={pizza} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default OrderPizza;
