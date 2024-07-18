"use client"
import { Inbox, Loader2 } from 'lucide-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import uploadS3 from '@/lib/db/s3'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const FileUpload = () => {

    const [uploading,setUplaoding] = React.useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: async({fileKey,fileName}:{fileKey:string,fileName:string}) => {
            try {
                const response = await axios.post('/api/create-chat',{
                    fileKey,
                    fileName
                })
                if(!response.data.fileKey && !response.data.fileName){
                    toast.error("Cannot create chat")
                }
                return response.data
            } catch (error:any) {
                toast.error(error.response)
            }
        },
        
    })

    const { getRootProps,getInputProps } = useDropzone({
        accept:{ "application/pdf":['.pdf']},
        maxFiles:1,
        onDrop: async(acceptedFiles) => {
            console.log(acceptedFiles)
            const file = acceptedFiles[0]
            if(file.size > 10*1024*1024){
                toast.error("File too large");
                return
            }
            try {
                setUplaoding(true)
                const data = await uploadS3(file)
                console.log(data)
                if(!data.fileKey && !data.fileName){
                    toast.error("Cannot create chat")
                    return
                }
                mutate(data,{
                    onError:(err) => {
                        toast.error(err.message)
                    },
                    onSuccess:(data) => {
                        toast.success(data.message)
                    }
                })
            } catch (error) {
                console.log(error)
            }finally{
                setUplaoding(false)
            }
        }
    })

  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps({className:"border-dashed border-2 cursor-pointer py-8 bg-gray-200 rounded-xl flex flex-col items-center justify-center"})}>
            <input {...getInputProps()} />
           {isPending}
            {
                (uploading || isPending) ? (
                    <>
                        <Loader2 className='h-10 w-10 text-blue-500 animate-spin' />
                        <p className='mt-2 text-sm text-slate-400'>Spilling Tea to GPT...</p>
                    </>
                ) : (
                    <>
                        <Inbox className='w-10 h-10 text-blue-500'/>
                        <p className='mt-2 text-sm text-slate-400'>Drop your PDF here.</p>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default FileUpload