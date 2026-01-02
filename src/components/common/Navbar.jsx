import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand 
          onClick={() => navigate('/products')} 
          style={{ cursor: 'pointer' }}
        >
          📋 Product Manager
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              onClick={() => navigate('/products')}
              active={location.pathname === '/products'}
              style={{ cursor: 'pointer' }}
            >
              📋 All Products
            </Nav.Link>
            <Nav.Link 
              onClick={() => navigate('/products/add')}
              active={location.pathname === '/products/add'}
              style={{ cursor: 'pointer' }}
            >
              ➕ Add Product
            </Nav.Link>
          </Nav>
          
          <Nav className="ms-auto">
            <BootstrapNavbar.Text className="me-3">
              👋 Welcome, {user?.firstName || user?.username || 'User'}!
            </BootstrapNavbar.Text>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              🚪 Logout
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;