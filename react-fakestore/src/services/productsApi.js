import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['Products'], 
  refetchOnFocus: true, 
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
      providesTags: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: data,
      }),

      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
            const product = draft.find((p) => p.id === id);
            if (product) {
              Object.assign(product, data); 
            }
          })
        );
        try {
          await queryFulfilled; 
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
            return draft.filter((p) => p.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useUpdateProductMutation, 
  useDeleteProductMutation 
} = productsApi;