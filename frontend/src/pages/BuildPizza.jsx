import { useEffect, useState } from 'react';
import { Container, Table, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ingredientAPI } from '../api/api';
import { addToCart } from '../store/cartSlice';

const BuildPizza = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await ingredientAPI.getAll();
        setIngredients(response.data.data);
      } catch {
        setError('Failed to load ingredients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  const toggleIngredient = (ingredient) => {
    setSelected((prev) => {
      const updated = { ...prev };
      if (updated[ingredient._id]) {
        delete updated[ingredient._id];
      } else {
        updated[ingredient._id] = ingredient;
      }
      return updated;
    });
  };

  const selectedList = Object.values(selected);
  const totalCost = selectedList.reduce((sum, ing) => sum + ing.price, 0);

  const handleBuildPizza = async () => {
    if (selectedList.length === 0) {
      return;
    }

    const customIngredients = selectedList.map((ing) => ({
      name: ing.name,
      price: ing.price,
      image: ing.image,
    }));

    try {
      await dispatch(
        addToCart({
          name: 'Custom Pizza',
          quantity: 1,
          price: 0,
          image:
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
          isVeg: true,
          isCustom: true,
          customIngredients,
        })
      ).unwrap();
      navigate('/cart');
    } catch {
      setError('Failed to add custom pizza to cart. Please try again.');
    }
  };

  return (
    <Container className="build-page-wrap py-3">
      
      <div className="classic-panel">
        <p className="instruction-text text-center mb-3">
          Pizzeria now gives you options to build your own pizza. Customize your pizza by choosing
          ingredients from the list given below
        </p>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <div className="table-responsive d-flex justify-content-center">
            <Table bordered className="ingredient-table align-middle">
              <tbody>
                {ingredients.map((ingredient) => (
                  <tr key={ingredient._id}>
                    <td>
                      <img
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="ingredient-img"
                      />
                    </td>
                    <td className="fw-semibold">{ingredient.name}</td>
                    <td className="fw-semibold">₹{ingredient.price.toFixed(2)}</td>
                    <td>
                      <Form.Check
                        type="checkbox"
                        id={`ing-${ingredient._id}`}
                        label={<span className="add-label">Add</span>}
                        checked={!!selected[ingredient._id]}
                        onChange={() => toggleIngredient(ingredient)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <p className="total-cost fw-bold">
            Total Cost : <span className="text-primary">{totalCost.toFixed(0)}</span>
          </p>

          <div className="text-center mt-4">
            <Button
              variant="dark"
              size="lg"
              className="build-btn px-4"
              onClick={handleBuildPizza}
              disabled={selectedList.length === 0}
            >
              Build Ur Pizza
            </Button>
          </div>
        </>
      )}
      </div>
    </Container>
  );
};

export default BuildPizza;
