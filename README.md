React Product Management Dashboard

This project is a React application built as part of an interview task to demonstrate practical knowledge of React, Redux Toolkit, authentication flow, and CRUD operations.
The focus of this project is clean structure, proper state management, and working with real APIs.

Features

User login and registration using DummyJSON authentication

JWT token handling using localStorage

Protected routes based on authentication state

Product listing fetched from API using Redux

Add, edit, and delete products

Display total product records

Responsive UI using Bootstrap components

Tech Stack

React 18 (Vite)

Redux Toolkit

React Router DOM

React Bootstrap

Axios

DummyJSON API

Getting Started
Prerequisites

Node.js (v14 or above)

npm

Installation & Run

Clone the repository:

git clone <repository-url>
cd react-product-management


Install dependencies:

npm install


Start the development server:

npm run dev


Open the app in your browser:

http://localhost:5173

Authentication Details
Login

DummyJSON provides test credentials:

Username: kminchelle

Password: 0lelplR

Registration

DummyJSON does not support real user registration.
To handle this, a local user registration system is implemented using localStorage.

Product Management

Products are fetched from https://dummyjson.com/products

Data flow: API → Redux → UI

CRUD operations are handled using Redux state

Forms are used to add and edit product details

Delete action includes confirmation

Total product count is displayed at the top

Folder Structure
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

Key Implementation Points

Redux Toolkit is used for centralized state management

Async API calls are handled using createAsyncThunk

Authentication state is persisted using localStorage

Routes are protected based on login status

Error and loading states are handled properly

Challenges Faced

DummyJSON does not support real user signup
→ Solved by implementing localStorage-based registration

Managing authentication state on page refresh
→ Solved by syncing Redux state with stored token

Keeping CRUD logic clean and predictable
→ Solved using Redux Toolkit patterns

Possible Improvements

Product search and filters

Pagination for product list

User profile page

Unit and integration testing

Backend integration with real database

Scripts

npm run dev – Start development server

npm run build – Build for production

npm run preview – Preview production build
