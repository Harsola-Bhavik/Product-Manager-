import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Alert, Spinner, Badge, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct, clearError } from '../../store/slices/productsSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, total, isLoading, error } = useSelector(state => state.products);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch products from API when component mounts (Step 4 requirement)
  useEffect(() => {
    console.log('ProductList mounted, fetching products...');
    dispatch(fetchProducts());
  }, [dispatch]);

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  const handleEditProduct = (product) => {
    console.log('Editing product:', product);
    navigate(`/products/edit/${product.id}`, { state: { product } });
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      setDeleteLoading(true);
      try {
        await dispatch(deleteProduct(productToDelete.id)).unwrap();
        setShowDeleteModal(false);
        setProductToDelete(null);
        showSuccessToast(`Product "${productToDelete.title}" deleted successfully!`);
      } catch (error) {
        console.error('Delete failed:', error);
        // Error will be shown in the error alert
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleRefresh = () => {
    dispatch(fetchProducts());
  };

  if (isLoading && products.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading products from DummyJSON API...</p>
      </Container>
    );
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📦 Product Management</h2>
          <p className="text-muted mb-1">Products fetched from DummyJSON API via Redux</p>
          <Badge bg="info" className="fs-6">Total Records: {total}</Badge>
        </div>
        <div className="d-flex gap-2">
          <Button 
            variant="outline-secondary" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            🔄 Refresh
          </Button>
          <Button 
            variant="success" 
            size="lg"
            onClick={handleAddProduct}
            disabled={isLoading}
          >
            ➕ Add New Product
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
          <strong>API Error:</strong> {error}
        </Alert>
      )}

      {products.length === 0 && !isLoading ? (
        <div className="text-center mt-5 py-5">
          <div className="mb-4">
            <h3 className="text-muted">📦 No Products Available</h3>
            <p className="text-muted">Failed to load products from API or no products exist.</p>
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="primary" onClick={handleRefresh}>
              🔄 Retry Loading Products
            </Button>
            <Button variant="success" onClick={handleAddProduct}>
              ➕ Add First Product
            </Button>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.id}
                    {product.isLocal && <Badge bg="success" className="ms-1">New</Badge>}
                    {product.isUpdated && <Badge bg="warning" className="ms-1">Updated</Badge>}
                  </td>
                  <td>
                    {product.thumbnail ? (
                      <img 
                        src={product.thumbnail} 
                        alt={product.title}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        className="rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="bg-light d-flex align-items-center justify-content-center rounded"
                      style={{ 
                        width: '50px', 
                        height: '50px',
                        display: product.thumbnail ? 'none' : 'flex'
                      }}
                    >
                      📦
                    </div>
                  </td>
                  <td>
                    <strong>{product.title}</strong>
                    {product.description && (
                      <div className="text-muted small">
                        {product.description.length > 60 
                          ? `${product.description.substring(0, 60)}...` 
                          : product.description}
                      </div>
                    )}
                  </td>
                  <td>{product.brand || 'N/A'}</td>
                  <td>
                    <Badge bg="secondary">{product.category || 'N/A'}</Badge>
                  </td>
                  <td>
                    <strong className="text-success">${product.price}</strong>
                  </td>
                  <td>
                    <Badge bg={product.stock > 50 ? 'success' : product.stock > 10 ? 'warning' : 'danger'}>
                      {product.stock}
                    </Badge>
                  </td>
                  <td>
                    {product.rating ? (
                      <span>⭐ {product.rating}</span>
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        disabled={isLoading}
                        title="Edit Product"
                      >
                        ✏️ Edit
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDeleteClick(product)}
                        disabled={isLoading}
                        title="Delete Product"
                      >
                        🗑️ Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this product?</p>
          {productToDelete && (
            <div className="bg-light p-3 rounded">
              <strong>{productToDelete.title}</strong>
              <br />
              <small className="text-muted">ID: {productToDelete.id}</small>
            </div>
          )}
          <p className="text-danger mt-2 mb-0">
            <small>This action cannot be undone.</small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Deleting...
              </>
            ) : (
              'Delete Product'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default ProductList;