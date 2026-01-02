# React Redux Todo Application

A modern React application with Redux state management, featuring user authentication and product CRUD operations.

## Features

- **User Authentication**: Login and Registration with JWT token management
- **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Redux State Management**: Centralized state with Redux Toolkit
- **Responsive UI**: Bootstrap-based responsive design
- **Protected Routes**: Route protection based on authentication status
- **Local Storage**: Persistent authentication and user data

## Tech Stack

- **Frontend**: React 18 with Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **UI Framework**: React Bootstrap
- **HTTP Client**: Axios
- **API**: DummyJSON API for products and authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Authentication

1. **Login**: Use existing DummyJSON credentials:
   - Username: `kminchelle`
   - Password: `0lelplR`

2. **Register**: Create a new account with:
   - First Name, Last Name
   - Username (must be unique)
   - Email (must be unique)
   - Password (minimum 6 characters)

### Product Management

- **View Products**: Browse all products in a table format
- **Add Product**: Create new products with title, brand, category, price, stock, and description
- **Edit Product**: Update existing product information
- **Delete Product**: Remove products with confirmation
- **Total Records**: View total count of products

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   └── Navbar.jsx
│   ├── auth/
│   └── products/
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── products/
│       ├── ProductList.jsx
│       └── ProductForm.jsx
├── store/
│   ├── index.js
│   └── slices/
│       ├── authSlice.js
│       └── productsSlice.js
├── utils/
│   └── userStorage.js
└── App.jsx
```

## API Integration

- **Authentication**: `https://dummyjson.com/auth/login`
- **Products**: `https://dummyjson.com/products`
- **Local Storage**: Custom user registration system

## Implementation Highlights

1. **Redux Toolkit**: Modern Redux with createSlice and createAsyncThunk
2. **Protected Routes**: Authentication-based route protection
3. **Error Handling**: Comprehensive error handling with user feedback
4. **Form Validation**: Client-side validation for forms
5. **Responsive Design**: Mobile-friendly Bootstrap components
6. **Local User Management**: Custom system for registered users

## Challenges Faced & Solutions

1. **API Limitations**: DummyJSON doesn't support real user registration
   - **Solution**: Implemented local storage system for new users

2. **Authentication Persistence**: Maintaining login state across sessions
   - **Solution**: JWT token storage in localStorage with Redux state sync

3. **CRUD Operations**: Managing optimistic updates and error states
   - **Solution**: Redux Toolkit's built-in loading and error states

## Future Improvements

- Add user profile management
- Implement product search and filtering
- Add pagination for large product lists
- Include product images upload
- Add unit and integration tests
- Implement real backend API

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

This project is created for interview assessment purposes.