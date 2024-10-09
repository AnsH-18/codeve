import React from 'react'
import Image from 'next/image'
import heroImg from "../../public/assets/10594781_4498901.svg"
import DemoImg from "../../public/assets/Codeve_DEMO_1.png"
import { Button } from './ui/button'
import { signIn } from '@/auth'

function Hero() {
  return (
    <div className='min-h-screen flex pt-20 justify-center p-4'>
      <div className='text-center max-w-3xl mx-auto flex flex-col gap-7'>
        <h1 className=' text-4xl sm:text-5xl'>
          <span className='font-medium'>Codeve: </span>Your Code, Organized
        </h1>
        <p className='text-lg sm:text-xl text-gray-700 leading-relaxed'>
          Effortlessly save, manage, and access your code snippets. 
          Boost your productivity with smart categorization and instant search.
        </p>
        <div className='flex justify-center'>
              <form action={async () => {
                  "use server"
                  await signIn("google")
              }}>
                   <Button className='flex gap-2'>
                        Get Started
                    </Button>
              </form>
        </div>
        <div>
            <Image src={DemoImg} width={2000} height={2000} alt='Hero' className='hidden lg:block'/>
            <Image src={heroImg}  width={2000} height={2000} alt='Hero' className='block lg:hidden'/>
        </div>
        <div>
           
        </div>
      </div>
    </div>
  )
}

export default Hero