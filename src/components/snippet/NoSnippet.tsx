import React from 'react'
import { FileCode } from 'lucide-react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

function NoSnippet() {
  return (
    <div className='flex pt-20 flex-col gap-4  items-center'>
        <FileCode height={70} width={70} color='gray'/>
        <p className='font-bold text-gray-500'>No Snippets found</p>
        <Link href= {"dashboard/create"}>
        <Button className='bg-[#142d4c]'>
          <div className='flex justify-center items-center gap-2'>
            <Plus height={14} width={14}/>
            <p>Create</p>
          </div>
        </Button>
        </Link>
    </div>
  )
}

export default NoSnippet