import create from "zustand";
import axios from "axios";

const sliceUser = (set) => ({
  // kali ini statenya berbentuk sebuah object, dan disupport oleh zustand yah !
  // (non primitive value)
  user: {},

  // action berupa async? tanpa middleware !
  // cukup declare action sebagai async, dan bisa berjalan ^_^
  fetchUserById: async (id) => {
    const { data } = await axios.get(`https://reqres.in/api/users/${id}`);

    // Karena langsung mengganti, tanpa butuh untuk melihat data lama
    // langsung set state secara direct
    set({ user: data.data });
  },
});

// Hooks
const useUserStore = create(sliceUser);

// Selectors
export const selectUser = (state) => state.user;
export const selectFetchUserById = (state) => state.fetchUserById;

// export hooks
export default useUserStore;
