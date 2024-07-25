import {Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const VBar = () => {
  const mode = useSelector((state) => state.auth.mode)
  return (
        <Container maxWidth="xl" className={`v-nav ${mode === "dark" ? 'bg-lightfg' : 'bg-darkbg'} drop-shadow-md flex items-center  justify-between py-4`}>
            <Box>
              <Typography  className='text-3xl text-emerald-400'>Vendorverse</Typography>
            </Box>


        </Container>
  )
}

export default VBar
