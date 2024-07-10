import React, { ReactNode }  from 'react'
import { cn } from '@/lib/utils'

interface MaxWidthWrapperProps {
    className?:String,
    children:ReactNode
}

const MaxWidthWrapper:React.FC<MaxWidthWrapperProps> = ({className, children}) => {
    return <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20",className)}>
        { children }
    </div>
}

export default MaxWidthWrapper;
