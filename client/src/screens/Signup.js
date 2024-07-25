import React from 'react'
import { Container, Typography } from '@mui/material';

const Signup = () => {
  return (
    <Container maxWidth={false} className='bg-darkbg' style={{  padding: '0 60px'}}>
    <Container maxWidth="xl" className='bg-red-500'>
    <Typography variant="h4" component="h1">
      Full Width Container
    </Typography>
    <Typography>
      This container spans the full width of the viewport.
    </Typography>
    </Container>
  </Container>
  )
}

export default Signup
