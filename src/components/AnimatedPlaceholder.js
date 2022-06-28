import { Stack, Box } from "@mui/material";
import React from "react";
import Typed from "typed.js";
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg";

export default function AnimatedPlaceholder() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  React.useEffect(() => {
    const options = {
      strings: [
        "Some <i>strings</i> are slanted",
        "Some <strong>strings</strong> are bold",
        "HTML characters &times; &copy;",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    };
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100%", paddingLeft: "20px" }}
    >
      <Box sx={{ width: "250px" }}>
        <p
          style={{ whiteSpace: "pre", color: "gray", fontSize: "1.1rem" }}
          ref={el}
        />
      </Box>
      <SearchIcon className="icon" />
    </Stack>
  );
}
