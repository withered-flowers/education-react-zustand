// Import create dari zustand
import create from "zustand";

// membuat "slice" yang akan digunakan dalam Zustand

// "slice" di dalam zustand adalah sebuah fungsi yang menerima sebuah parameter
// berupa "set" yang digunakan untuk mengganti state yang ada di dalam slice
// fungsi ini akan mengembalikan object yang berisi "state" dan "action" yang ada
const sliceCounter = (set) => ({
  // state (bersifat IMMUTABLE)
  counter: 100,
  // action

  // Bila ingin mengubah state, panggil set
  // set adalah sebuah parameter berupa sebuah fungsi
  // fungsi ini menerima sebuah paramater "state"
  // dan akan mengembalikan sebuah object baru
  // yang akan memodifikasi property state yang sudah didefinisikan sebelumnya
  // ingat: sama dengan aturan reducer, state di dalam Zustand HARUS IMMUTABLE juga
  incrementCounter: () =>
    set((state) => ({ ...state, counter: state.counter + 1 })),

  // Namun ternyata di dalam Zustand, fungsi set ini bersifat unik, sehingga untuk 1 level setara
  // kita tidak perlu melakukan spread state, karena sudah akan dispreadkan secara internal
  decrementCounter: () => set((state) => ({ counter: state.counter - 1 })),

  // apabila kita hanya perlu secara langsung set state yang baru TANPA melihat state yang lama
  // tidak perlu menggunakan (state) => ({ namaState: state.namaState })
  // tapi langsung set({ namaState: newVal })
  resetCounter: () => set({ counter: 0 }),

  // bila kita ingin menggunakan val dinamis, gunakan parameter yang ada
  incrementCounterByAmount: (amount) =>
    set((state) => ({ counter: state.counter + amount })),

  decrementCounterByAmount: (amount) =>
    set((state) => ({ counter: state.counter - amount })),
});

// membuat "hooks" yang akan digunakan oleh si Component

// "hooks" ini penamaannya bebas, tapi karena ini berhubungan dengan store
// maka penamaannya menjadi use + "Blablabla" + "Store"
const useCounterStore = create(sliceCounter);

// membuat "selector" yang digunakan untuk memilih "state" dan "action"
// penamaannya bebas (ingat: Zustand is unopinionated !)

// Untuk pembelajaran ini kita akan menggunakan postfix "Action" bila berupa action
// jangan lupa export karena akan digunakan di tempat lain
export const selectCounter = (state) => state.counter;

export const selectIncrementCounterAction = (state) => state.incrementCounter;
export const selectDecrementCounterAction = (state) => state.decrementCounter;
export const selectResetCounterAction = (state) => state.resetCounter;
export const selectIncrementCounterByAmountAction = (state) =>
  state.incrementCounterByAmount;
export const selectDecrementCounterByAmountAction = (state) =>
  state.decrementCounterByAmount;

// export
export default useCounterStore;
