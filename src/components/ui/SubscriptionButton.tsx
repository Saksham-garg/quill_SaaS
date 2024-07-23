"use client"
import React, { useState } from 'react'
import { Button } from './button'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

type Props = {
    isPro : boolean
}

const SubscriptionButton = ({isPro}: Props) => {

    const [ isLoading,setIsLoading] = useState(false)
    const handleSubscriptions = async() => {
        try {
            setIsLoading(true)
            const response = await axios.post('/api/stripe')
            window.location.href = response.data.url
            return            
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <Button onClick={handleSubscriptions} disabled={isLoading}>
        { isPro ? 'Manage Subscriptions':'Get Pro'}
        {isLoading && <Loader2 className='ml-2 w-4 h-4 animate-spin'/>}
    </Button>
  )
}

export default SubscriptionButton