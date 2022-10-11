import React, { useEffect, useState } from "react";

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";

import ColorListZustand from "../components/ColorListZustand.jsx";

import useCounterStore, {
  selectCounter,
  selectIncrementCounterAction,
  selectDecrementCounterAction,
  selectResetCounterAction,
  selectIncrementCounterByAmountAction,
  selectDecrementCounterByAmountAction,
} from "../stores/counter.js";

// Import hooks zustand dan selector untuk user di sini
import useUserStore, {
  selectUser,
  selectFetchUserById,
} from "../stores/user.js";

const CounterZustandContainer = () => {
  const [currAmount, setCurrAmount] = useState(0);
  const [userId, setUserId] = useState(0);

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

  // Ambil state dan action lagi ...
  const user = useUserStore(selectUser);
  const fetchUserById = useUserStore(selectFetchUserById);

  const buttonDecrementOnClickHandler = () => {
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

  const buttonFetchUserOnClickHandler = () => {
    // Panggil action sesuai kebutuhan logic (baik di onClick ataupun di useEffect)
    fetchUserById(userId);
  };

  const buttonDecrementByAmountOnClickHandler = () => {
    decrementCounterByAmount(currAmount);
  };

  const buttonIncrementByAmountOnClickHandler = () => {
    incrementCounterByAmount(currAmount);
  };

  useEffect(() => {
    // Panggil action untuk dijalankan dalam effect
    fetchUserById(3);
  }, []);

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

        {/* Panggil state di sini */}
        <Avatar src={user.avatar} alt="avatar" sx={{ width: 64, height: 64 }} />

        <Typography variant="body1" component="div">
          {/* Panggil state di sini */}
          Nama User: {user.first_name}
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
