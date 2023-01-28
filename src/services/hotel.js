/* eslint-disable prefer-destructuring */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || false;
      if (token) {
        headers.set('authorization', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Hotels', 'Rooms', 'Bookings'],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'users',
        method: 'POST',
        body: credentials
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      }),
    }),
    postHotel: builder.mutation({
      query: (credentials) => ({
        url: 'hotels',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Hotels']
    }),
    getHotels: builder.query({
      query: () => 'hotels',
      providesTags: ['Hotels']
    }),
    getHotel: builder.query({
      query: (hotelId) => ({
        url: `hotels/${hotelId}`,
      })
    }),
    postRoom: builder.mutation({
      query: (credentials) => ({
        url: 'rooms',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Rooms']
    }),
    getRooms: builder.query({
      query: () => ({
        url: 'rooms',
      }),
      providesTags: ['Rooms']
    }),
    postBooking: builder.mutation({
      query: (credentials) => ({
        url: 'bookings',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Bookings']
    }),
    getBookings: builder.query({
      query: () => ({
        url: 'bookings'
      }),
      providesTags: ['Bookings']
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignupMutation,
  useLoginMutation,
  usePostHotelMutation,
  useGetHotelQuery,
  useGetHotelsQuery,
  usePostRoomMutation,
  useGetRoomsQuery,
  usePostBookingMutation,
  useGetBookingsQuery,
} = hotelApi;
