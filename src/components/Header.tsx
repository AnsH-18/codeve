import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { auth } from '@/auth'
import UserProfile from './UserProfile'
import { signIn } from '@/auth'
import img from "../../public/assets/bracket_17856274.png"

async function Header() {
  const session = await auth()
  
  return (
    <div className={`pl-5  pr-5 fixed right-0 left-0 z-40 ${session?.user ? 'bg-[#f2f9f1] ' : ''}`}>
      <nav className='flex justify-between items-center h-16'>
        {!session?.user && (
          <div className='flex gap-2 items-center'>
            <Image 
              src={img} 
              height={40} 
              width={40} 
              alt='logo' 
            />
            <h1 className='text-2xl font-semibold'>Codeve</h1>
          </div>
        )}
        <div className={session?.user ? 'ml-auto' : ''}>
          {session?.user && typeof session.user.image === "string" && typeof session.user.name === "string" ? (
            <UserProfile name={session.user.name} image={session.user.image} />
          ) : (
            <form action={async () => {
              "use server"
              await signIn("google")
            }}>
              <Button className='flex gap-2'>
                Dashboard
                <ArrowRight width={18} height={18}/>
              </Button>
            </form>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Header