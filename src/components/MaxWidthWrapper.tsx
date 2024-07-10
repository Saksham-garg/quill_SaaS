import React, { ReactNode }  from 'react'

interface MaxWidthWrapperProps {
    className?:String,
    children:ReactNode
}

const MaxWidthWrapper:React.FC<MaxWidthWrapperProps> = ({className, children}) => {
    return <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        { children }
    </div>
}

export default MaxWidthWrapper;
