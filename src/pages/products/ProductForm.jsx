import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { addProduct, updateProduct, clearError } from '../../store/slices/productsSlice';

const ProductForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, error, isLoading } = useSelector(state => state.products);

  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    dispatch(clearError());
    setSubmitError(null);
    
    if (isEdit) {
      // Try to get product from location state first
      const productFromState = location.state?.product;
      
      if (productFromState && productFromState.id === parseInt(id)) {
        setFormData({
          title: productFromState.title || '',
          brand: productFromState.brand || '',
          category: productFromState.category || '',
          price: productFromState.price?.toString() || '',
          stock: productFromState.stock?.toString() || '',
          description: productFromState.description || ''
        });
      } else {
        // Fallback to finding in products array
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
          setFormData({
            title: product.title || '',
            brand: product.brand || '',
            category: product.category || '',
            price: product.price?.toString() || '',
            stock: product.stock?.toString() || '',
            description: product.description || ''
          });
        }
      }
    }
  }, [dispatch, isEdit, id, products, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    if (submitError) setSubmitError(null);
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setSubmitError('Title is required');
      return;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setSubmitError('Price must be greater than 0');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const productData = {
      title: formData.title.trim(),
      brand: formData.brand.trim() || 'Generic',
      category: formData.category.trim() || 'General',
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      description: formData.description.trim()
    };

    const action = isEdit 
      ? updateProduct({ id: parseInt(id), ...productData })
      : addProduct(productData);

    dispatch(action)
      .then((result) => {
        if (result.type.endsWith('/fulfilled')) {
          navigate('/products');
        } else {
          setSubmitError(result.payload || 'Operation failed');
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        setSubmitError('Operation failed');
        setIsSubmitting(false);
      });
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">
                {isEdit ? '✏️ Edit Product' : '➕ Add New Product'}
              </h3>
            </Card.Header>
            <Card.Body>
              {(error || submitError) && (
                <Alert variant="danger" dismissible onClose={() => {
                  dispatch(clearError());
                  setSubmitError(null);
                }}>
                  <strong>Error:</strong> {submitError || error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Product Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter product title"
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Enter brand name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Price ($) <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="0"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description (optional)"
                  />
                </Form.Group>

                <div className="d-flex gap-2 justify-content-end">
                  <Button 
                    variant="secondary" 
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        {isEdit ? 'Updating...' : 'Adding...'}
                      </>
                    ) : (
                      isEdit ? 'Update Product' : 'Add Product'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForm;