import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/slices/productsSlice';

const TestAdd = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    try {
      const result = await dispatch(addProduct({
        title: title || 'Test Product',
        price: parseFloat(price) || 99.99,
        category: 'test',
        brand: 'test'
      })).unwrap();
      console.log('Added:', result);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Test Add Product</h3>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
      />
      <button onClick={handleAdd}>Add Test Product</button>
    </div>
  );
};

export default TestAdd;