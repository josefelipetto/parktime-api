import React from 'react'
import { CircularProgress } from '@material-ui/core'

import './full-loader.css'

export default function FullLoader () {

  return (
    <div className='FullLoader'>
      <CircularProgress/>
    </div>
  )
}