# 🛍️ Product Management App

Live Link: [https://m-360-ict.netlify.app/](https://m-360-ict.netlify.app/)

---

## 🚀 Project Overview

This is a **React + Redux Toolkit Query + Ant Design** based product management web application built with **TypeScript**.  
The app fetches products from a public API, displays them in a paginated table, and allows users to **view**, **edit**, and **manage** product details including reviews and categories dynamically.

---

## 📦 Tech Stack

- **React.js** (with Vite)
- **TypeScript**
- **Redux Toolkit** (RTK Query)
- **Ant Design** (UI Framework)
- **CSS Modules** / **Custom CSS**

---

## 📑 Features

### 🛒 Product List View
- Fetch products using **RTK Query** from `https://dummyjson.com/products`.
- Display the products using **Ant Design's Table** component.
- Implement **pagination** using `limit` and `skip` query parameters.
- Include a **"View Details"** button for each product.
- Apply **custom styling** to enhance the UI.

### 📄 Product Detail View
- Fetch and display the full details of a product by ID using `https://dummyjson.com/products/:id`.
- Beautiful custom-designed detail page using **Ant Design** and **CSS**.

### ✏️ Edit Product
- Pre-fill a form with product details using **Ant Design's Form**.
- Update product fields dynamically.
- Manage the **Reviews** array using `<Form.List>`.
- Category selection via a **Select** component fetching from `https://dummyjson.com/products/categories`.
- Submit the updated data with a `PATCH` request to `https://dummyjson.com/products/:id`.
- Log the final edited data in the console.

---

## 🛠️ Installation and Setup

```bash
# Clone the repository
git clone your-repo-link.git
cd your-project-directory

# Install dependencies
npm install

# Start the development server
npm run dev
