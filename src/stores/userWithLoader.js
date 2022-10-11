import axios from "axios";
import produce from "immer";
import create from "zustand";

const sliceUserWithLoader = (set) => ({
  // di sini kita akan menggunakan 3 state:
  // - user <--- data kita
  // - loading <--- boolean apakah sedang menunggu data
  // - error <--- message ketika ada error
  user: {},
  loading: false,
  error: null,

  // action
  fetchUserById: async (id) => {
    try {
      // awal bikin loading terlebih dahulu
      set(
        produce((state) => {
          state.loading = true;
          console.log("Mari menunggu data...");
        })
      );

      // fetch datanya
      const { data } = await axios.get(`https://reqres.in/api/users/${id}`);

      // bila sudah selesai set loading false dan dapat datanya
      set(
        // immer
        produce((state) => {
          state.loading = false;
          state.user = data.data;
        })
      );
    } catch (err) {
      // bila terjadi error
      set(
        produce((state) => {
          state.loading = false;
          state.error = err;
        })
      );
    }
  },
});

// hooks
const useUserWithLoaderStore = create(sliceUserWithLoader);

// selector
export const selectUser = (state) => state.user;
export const selectLoading = (state) => state.loading;
export const selectError = (state) => state.error;
export const selectFetchUserByIdAction = (state) => state.fetchUserById;

export default useUserWithLoaderStore;
