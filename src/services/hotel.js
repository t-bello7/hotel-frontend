/* eslint-disable prefer-destructuring */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { saveAuthState } from '../hooks/localstorage';

export const hotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || false;
      if (token) {
        headers.set('authorization', `${token}`);
        saveAuthState(token);
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
      query: ({ userId, credentials }) => ({
        url: `/users/${userId}/hotels`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Hotels']
    }),
    putHotel: builder.mutation({
      query: ({ userId, hotelId, credentials }) => ({
        url: `/users/${userId}/hotels/${hotelId}`,
        method: 'PUT',
        body: credentials
      }),
      invalidatesTags: ['Hotels']
    }),
    deleteHotel: builder.mutation({
      query: (hotelId) => ({
        url: `users/1/hotels/${hotelId}`,
        method: 'DELETE',
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
    putRoom: builder.mutation({
      query: ({
        userId, hotelId, roomId, credentials
      }) => ({
        url: `/users/${userId}/hotels/${hotelId}/rooms/${roomId}`,
        method: 'PUT',
        body: credentials
      }),
      invalidatesTags: ['Rooms']
    }),
    deleteRoom: builder.mutation({
      query: ({
        userId, hotelId, roomId
      }) => ({
        url: `/users/${userId}/hotels/${hotelId}/rooms/${roomId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rooms']
    }),
    postRoom: builder.mutation({
      query: ({ userId, hotelId, credentials }) => ({
        url: `/users/${userId}/hotels/${hotelId}/rooms`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Rooms']
    }),
    getRooms: builder.query({
      query: (hotelId) => ({
        url: `/hotels/${hotelId}/rooms`,
      }),
      providesTags: ['Rooms']
    }),
    getRoom: builder.query({
      query: ({ hotelId, roomId }) => ({
        url: `/hotels/${hotelId}/rooms/${roomId}`,
      })
    }),
    postBooking: builder.mutation({
      query: ({ userId, credentials }) => ({
        url: `/users/${userId}/bookings`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Bookings']
    }),
    getBookings: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/bookings`
      }),
      providesTags: ['Bookings']
    }),
    deleteBooking: builder.mutation({
      query: ({ userId, bookingId }) => ({
        url: `/users/${userId}/bookings/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookings']
    }),
  }),
});
export const {
  useSignupMutation,
  useLoginMutation,
  useGetHotelQuery,
  useGetHotelsQuery,
  usePostHotelMutation,
  usePutHotelMutation,
  useDeleteHotelMutation,
  useGetRoomQuery,
  useGetRoomsQuery,
  usePostRoomMutation,
  usePutRoomMutation,
  useDeleteRoomMutation,
  useGetBookingsQuery,
  usePostBookingMutation,
  useDeleteBookingMutation
} = hotelApi;
