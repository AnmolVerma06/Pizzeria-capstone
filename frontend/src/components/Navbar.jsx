import { Link, NavLink } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { items } = useSelector((state) => state.cart);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClass = ({ isActive }) =>
    `nav-link px-3 nav-text ${isActive ? 'active-link' : ''}`;

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="pizzeria-navbar">
      <Container className="nav-inner-wrap">
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 brand-wrap">
          <span className="brand-text">Pizzeria</span>
          <img src="/logo.png" alt="Pizzeria Logo" height="40" className="brand-logo" />
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="navbar-nav" />
        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/order-pizza" className={navLinkClass}>
              Order Pizza
            </Nav.Link>
            <Nav.Link as={NavLink} to="/build-pizza" className={navLinkClass}>
              Build Ur Pizza
            </Nav.Link>
          </Nav>
          <Nav>
            <Link to="/cart" className="btn btn-warning cart-btn d-flex align-items-center gap-2">
              <i className="bi bi-cart3" />
              Shopping cart
              {cartCount > 0 && (
                <Badge bg="dark" pill className="cart-badge">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
