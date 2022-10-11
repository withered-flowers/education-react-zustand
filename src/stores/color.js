import axios from "axios";
// Sekarang kita akan menggunakan immer secara manual
// Berbeda dengan RTK yang sudah include di dalamnya
import produce from "immer";
import create from "zustand";

const sliceColors = (set) => ({
  // state awal seperti biasa
  colors: [],

  // fetch data colors (async)
  fetchColors: async () => {
    const { data } = await axios.get("https://reqres.in/api/colors");

    // di sini kita akan set state dengan set yang di dalamnya akan memanggil produce
    set(
      // panggil fungsi produce dari immer
      produce(
        // parameter dalam produce juga merupakan sebuah fungsi
        (state) => {
          // di sini kita akan set state colors dengan data yang ada
          // state ini sekarang dari immer
          // jadi "seolah-olah" mutable
          // kita tinggal sama dengankan saja
          state.colors = data.data;
        }
      )
    );
  },
});

// hooks
const useColorStore = create(sliceColors);

// selectors
export const selectColors = (state) => state.colors;
export const selectFetchColorsAction = (state) => state.fetchColors;

export default useColorStore;
