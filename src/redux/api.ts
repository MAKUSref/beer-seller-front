import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "https://beer-seller-back-production.up.railway.app/api";
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

type Product = {
  id: string;
  name: string;
  url?: string;
  quantity: number;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["wallet", "product"],
  endpoints: (builder) => ({
    getWallet: builder.query<{ income: number; wholeValue: number }, void>({
      query: () => `/wallet`,
      providesTags: ["wallet"],
    }),

    getProducts: builder.query<Product[], void>({
      query: () => `/product`,
      providesTags: ["product"],
    }),

    createProduct: builder.mutation<void, { name: string; url?: string }>({
      query: (data) => ({
        method: "POST",
        url: "/product",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    addProduct: builder.mutation<void, { productId: string; quantity: number; pricePerOne: number }>({
      query: ({ pricePerOne, productId, quantity }) => ({
        method: "POST",
        url: `/product/${productId}/add`,
        body: { quantity, pricePerOne },
      }),
      invalidatesTags: ["product", "wallet"],
    }),

    sellProduct: builder.mutation<void, { productId: string; quantity: number; sellPrice: number }>({
      query: ({ sellPrice, productId, quantity }) => ({
        method: "PATCH",
        url: `/product/${productId}/sell`,
        body: { quantity, sellPrice },
      }),
      invalidatesTags: ["product", "wallet"],
    }),
  }),
});

export const {
  useGetWalletQuery,
  useCreateProductMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useSellProductMutation,
} = baseApi;
