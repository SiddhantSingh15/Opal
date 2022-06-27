import React from 'react'
import { Box, Stack, Checkbox, Typography } from '@mui/material'

export default function RememberMe() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" sx={{ height: "20px" }}>
          <Checkbox />
          <Typography
            sx={{ lineHeight: "20px", color: "white" }}
            variant="body1"
          >
            Remember me
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Forgot credentials?
        </Typography>
      </Box>
  )
}
