import React from 'react'
import { Button } from './ui/button'

function Footer() {
  return (
    <div className='flex justify-end px-2'>
        <div>
            <Button variant={'link'}>Privacy Policy</Button>
            <Button variant={'link'}>Contact</Button>
        </div>
    </div>
  )
}

export default Footer