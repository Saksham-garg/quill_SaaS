import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='w-screen h-screen'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
            <Loader2 className='animate-spin w-6 h-6'/> 
        </div>
    </div>
  )
}

export default Loader