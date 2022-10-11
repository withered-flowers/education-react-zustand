import React, { useEffect, useState } from "react";

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";

import ColorListZustand from "../components/ColorListZustand.jsx";

// Import hooks zustand dan selectornya di sini
import useCounterStore, {
  selectCounter,
  selectIncrementCounterAction,
  selectDecrementCounterAction,
  selectResetCounterAction,
  selectIncrementCounterByAmountAction,
  selectDecrementCounterByAmountAction,
} from "../stores/counter.js";

const CounterZustandContainer = () => {
  const [currAmount, setCurrAmount] = useState(0);
  const [userId, setUserId] = useState(0);

  // Ambil state dan action berdasarkan hooks Zustand yang sudah dibuat
  const counter = useCounterStore(selectCounter);
  const incrementCounter = useCounterStore(selectIncrementCounterAction);
  const decrementCounter = useCounterStore(selectDecrementCounterAction);
  const resetCounter = useCounterStore(selectResetCounterAction);
  const incrementCounterByAmount = useCounterStore(
    selectIncrementCounterByAmountAction
  );
  const decrementCounterByAmount = useCounterStore(
    selectDecrementCounterByAmountAction
  );

  const buttonDecrementOnClickHandler = () => {
    // Gunakan di dalam sini (panggil action seperti memanggil fungsi biasa)
    // (Tidak ada dispatch dispatch lagi)
    decrementCounter();
  };

  const buttonResetOnClickHandler = () => {
    resetCounter();
  };

  const buttonIncrementOnClickHandler = () => {
    incrementCounter();
  };

  const textFieldAmountOnChangeHandler = (e) => {
    const amountFromField = isNaN(parseInt(e.target.value))
      ? 0
      : parseInt(e.target.value);

    setCurrAmount(amountFromField);
  };

  const textFieldUserIdOnChangeHandler = (e) => {
    const valueUserId = isNaN(parseInt(e.target.value))
      ? 0
      : parseInt(e.target.value);

    setUserId(valueUserId);
  };

  const buttonFetchUserOnClickHandler = () => {};

  const buttonDecrementByAmountOnClickHandler = () => {
    // Sama dengan yang action sebelumnya
    // bila ingin menerima params, tinggal kirimkan seperti memanggil fungsi dengan
    // parameter seperti biasanya
    decrementCounterByAmount(currAmount);
  };

  const buttonIncrementByAmountOnClickHandler = () => {
    // sama dengan di atas
    incrementCounterByAmount(currAmount);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Box
        sx={{
          border: "1px dashed grey",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="body1" component="div">
          React Redux
        </Typography>

        <Avatar src={""} alt="avatar" sx={{ width: 64, height: 64 }} />

        <Typography variant="body1" component="div">
          Nama User: {""}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <TextField
            label="Input User Id"
            value={userId}
            size="small"
            type="number"
            onChange={textFieldUserIdOnChangeHandler}
          />
          <Button
            variant="outlined"
            color="success"
            onClick={buttonFetchUserOnClickHandler}
          >
            Fetch user
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            disabled
            label="Current Counter"
            // defaultValue="0"
            // Panggil state seperti memanggil variabel biasa
            value={counter}
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="success"
            onClick={buttonDecrementOnClickHandler}
          >
            -1
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={buttonResetOnClickHandler}
          >
            0
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={buttonIncrementOnClickHandler}
          >
            +1
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="amount"
            size="small"
            value={currAmount}
            onChange={textFieldAmountOnChangeHandler}
          />
          <Button
            variant="outlined"
            color="success"
            onClick={buttonDecrementByAmountOnClickHandler}
          >
            - Amount
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={buttonIncrementByAmountOnClickHandler}
          >
            + Amount
          </Button>
        </Box>

        <ColorListZustand />
      </Box>
    </>
  );
};

export default CounterZustandContainer;
