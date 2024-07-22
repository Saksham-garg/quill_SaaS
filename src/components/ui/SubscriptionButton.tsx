"use client"
import React, { useState } from 'react'
import { Button } from './button'
import axios from 'axios'

type Props = {
    isPro : boolean
}

const SubscriptionButton = ({isPro}: Props) => {

    const [ isLoading,setIsLoading] = useState(false)
    const handleSubscriptions = async() => {
        try {
            setIsLoading(false)
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
    </Button>
  )
}

export default SubscriptionButton