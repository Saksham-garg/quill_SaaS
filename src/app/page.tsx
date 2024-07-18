import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { LogIn } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image'
import { auth } from "@clerk/nextjs/server";
import FileUpload from "@/components/ui/FileUpload";

export default async function Home() {
  const {userId} = await auth()
  const isAuth = !!userId
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <div className="mx-auto mb-4 max-w-fit flex items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
          Quill is now public!
        </p>
      </div>
      <h1 className="max-w-4xl mb-4 font-bold text-5xl md:text-6xl lg:text-7xl">
        Chat with your <span className="text-blue-600">documents</span> in
        seconds
      </h1>
      <p className="mt-5 max-w-prose sm:text-lg text-zinc-700">
        Quill allows you to have any converstions with your PDF document. Simply
        upload your file and start asking questions right away.
      </p>
      {
        !isAuth && 
          <Link
            className={buttonVariants({
              size: "lg",
              className: "mt-5",
            })}
            href="/sign-in"
          >
            Login to Get Started <LogIn className="ml-2 h-5 w-5" />
          </Link>
      }
      {
        isAuth && (
          <FileUpload />
        )
      }

       {/* value proposition section */}
       <div className="">
        <div className="relative isolate">
          <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
              />
            </div>

            <div>
              <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                <div className='mt-16 flow-root sm:mt-24'>
                  <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                    <Image
                      src='/dashboard-preview.jpg'
                      alt='product preview'
                      width={1364}
                      height={866}
                      quality={100}
                      className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                    />
                  </div>
                </div>
              </div>
          </div>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
       </div>

      {/* Feature Selection  */}
      <div className="mx-auto my-32 max-w-5xl md:mt-52">
              <div className="mb-12 px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl sm:text-center">
                          <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
                            Start chatting in minutes
                          </h2>
                          <p className="mt-4 text-lg text-gray-600">
                            Chatting with your PDF has never been easier than with Quill.
                          </p>
                  </div>
              </div>

              {/* steps */}

              <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
                  <li className="md:flex-1">
                  <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                      <span className='text-sm font-medium text-blue-600'>
                        Step 1
                      </span>
                      <span className='text-xl font-semibold'>
                        Sign up for an account
                      </span>
                      <span className='mt-2 text-zinc-700'>
                        Either starting out with a free plan or
                        choose our{' '}
                        <Link
                          href='/pricing'
                          className='text-blue-700 underline underline-offset-2'>
                          pro plan
                        </Link>
                        .
                      </span>
                    </div>
                  </li>

                  <li className='md:flex-1'>
                    <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                      <span className='text-sm font-medium text-blue-600'>
                        Step 2
                      </span>
                      <span className='text-xl font-semibold'>
                        Upload your PDF file
                      </span>
                      <span className='mt-2 text-zinc-700'>
                        We&apos;ll process your file and make it
                        ready for you to chat with.
                      </span>
                    </div>
                  </li>

                  <li className='md:flex-1'>
                    <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                      <span className='text-sm font-medium text-blue-600'>
                        Step 3
                      </span>
                      <span className='text-xl font-semibold'>
                        Start asking questions
                      </span>
                      <span className='mt-2 text-zinc-700'>
                        It&apos;s that simple. Try out Quill today -
                        it really takes less than a minute.
                      </span>
                    </div>
                  </li>
              </ol>

              <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                <div className='mt-16 flow-root sm:mt-24'>
                  <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                    <Image
                      src='/file-upload-preview.jpg'
                      alt='uploading preview'
                      width={1419}
                      height={732}
                      quality={100}
                      className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                    />
                  </div>
                </div>
              </div>

      </div>

    </MaxWidthWrapper>
  );
}
