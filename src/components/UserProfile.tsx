import { signOut } from '@/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Button } from './ui/button'


type userprofiletype = {
    name: string 
    image: string 
}

function UserProfile({name, image}: userprofiletype) {

  return (
    <div>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className='flex justify-center gap-2 bg-gray-50 hover:opacity-2'>
                <Image className='rounded-full' src={image} height={25} width={25} alt='profile'/>
                <p>{name}</p>
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div>
                <form action={async () => {
                "use server"
                await signOut({redirectTo: "/"})
                redirect("/")
              }}>
                <button type='submit'>Log Out</button>
              </form>
              </div>
              
            </DropdownMenuItem>
          </DropdownMenuContent>
    </DropdownMenu>

    </div>
  )
}

export default UserProfile