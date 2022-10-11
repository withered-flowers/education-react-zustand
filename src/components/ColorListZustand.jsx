import React, { useEffect } from "react";

import ColorItem from "./ColorItem";

import { Box, Typography } from "@mui/material";

// import store dan selector di sini
import useColorStore, {
  selectColors,
  selectFetchColorsAction,
} from "../stores/color";

const ColorList = () => {
  const colors = useColorStore(selectColors);
  const fetchColors = useColorStore(selectFetchColorsAction);

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <Box>
      <Typography variant="h5">Color List</Typography>
      {/* Gunakan ColorItem di sini */}
      {colors.map((color) => (
        <ColorItem key={color.id} colorItem={color} />
      ))}
    </Box>
  );
};

export default ColorList;
