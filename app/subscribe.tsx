import React from 'react'
import { Card, Typography } from '@mui/material'
import Checkout from './checkout'

export default function Subscribe (): React.JSX.Element {
  return (
<div>
<Typography variant="h2" component="h2" className='mx-auto text-center'>
  Subscribe to planmi
</Typography>
<Typography id="modal-modal-description" variant="h6" className='mx-auto text-center my-8' sx={{ mt: 2 }}>
  <ul>
  <li className='my-4'> Save lessons </li>
  <li className='my-4'> Generate worksheets </li>
  <li className='my-4'> Get support </li>
  <li className='my-4'> Access new features </li>
  </ul>
</Typography>

<div className='flex-box flex justify-between'>

<Card className='w-1/4 my-4' variant="outlined">
<div className='mx-auto p-10'>

<div className='mb-16'>
<Typography variant="h3" component="h3" className='mx-auto text-center'>
  $10
</Typography>
<Typography id="modal-modal-description" variant="caption" className='mx-auto text-center mb-10'>
  Per month, billed yearly
</Typography>
</div>

<Checkout />
</div>
</Card>

<Card className='w-1/4 my-4' variant="outlined">
<div className='mx-auto p-10'>

<div className='mb-16'>
<Typography variant="h3" component="h3" className='mx-auto text-center'>
  $12
</Typography>
<Typography id="modal-modal-description" variant="caption" className='mx-auto text-center mb-10'>
  Per month, billed for 6 months
</Typography>
</div>

<Checkout />
</div>
</Card>

<Card className='w-1/4 my-4' variant="outlined">
<div className='mx-auto p-10'>

<div className='mb-16'>
<Typography variant="h3" component="h3" className='mx-auto text-center'>
  $15
</Typography>
<Typography id="modal-modal-description" variant="caption" className='mx-auto text-center mb-10'>
  Per month, billed monthly
</Typography>
</div>

<Checkout />
</div>
</Card>

</div>
</div>)
}
