
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsResponse, UpdateProductRequest } from '../../types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => 'products?limit=0',
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
    }),
    updateProduct: builder.mutation<Product, { id: number; data: UpdateProductRequest }>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} = productApi;
