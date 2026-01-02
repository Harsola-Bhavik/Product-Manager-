import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching products from API (Step 4 requirement)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Async thunk for adding products via API
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      console.log('Adding product:', productData);
      const response = await axios.post('https://dummyjson.com/products/add', productData);
      console.log('API response:', response.data);
      
      // DummyJSON returns id: 101 for all new products, so we'll use timestamp for uniqueness
      const newProduct = {
        ...response.data,
        id: Date.now(), // Use timestamp for unique ID
        isLocal: true,
        thumbnail: '', // Add default thumbnail
        images: [] // Add default images array
      };
      
      console.log('Processed product:', newProduct);
      return newProduct;
    } catch (error) {
      console.error('Add product error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);

// Async thunk for updating products via API
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, ...productData }, { rejectWithValue }) => {
    try {
      console.log('Updating product:', id, productData);
      const response = await axios.put(`https://dummyjson.com/products/${id}`, productData);
      console.log('Update API response:', response.data);
      
      const updatedProduct = {
        ...response.data,
        id: parseInt(id), // Ensure ID is preserved as number
        isUpdated: true
      };
      
      console.log('Processed updated product:', updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error('Update product error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

// Async thunk for deleting products via API
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      console.log('Deleting product:', id);
      await axios.delete(`https://dummyjson.com/products/${id}`);
      console.log('Delete successful for ID:', id);
      return parseInt(id);
    } catch (error) {
      console.error('Delete product error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products from API
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        console.log('Products fetched:', action.payload.products.length);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error('Fetch products failed:', action.payload);
      })
      // Add product
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload); // Add to beginning of array
        state.total = state.products.length;
        console.log('Product added successfully:', action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error('Add product failed:', action.payload);
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          // Merge the updated data with existing product data
          state.products[index] = { 
            ...state.products[index], 
            ...action.payload 
          };
          console.log('Product updated successfully:', action.payload);
        } else {
          console.warn('Product not found for update:', action.payload.id);
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error('Update product failed:', action.payload);
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const initialLength = state.products.length;
        state.products = state.products.filter(p => p.id !== action.payload);
        state.total = state.products.length;
        console.log(`Product deleted. Count: ${initialLength} -> ${state.products.length}`);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error('Delete product failed:', action.payload);
      });
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;