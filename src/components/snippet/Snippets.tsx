import React from 'react'
import { LSnippet } from '@/app/api/snippet/route'
import SnippetNote from './SnippetNote'
import NoSnippet from './NoSnippet'
interface snipppetProps {
  snippets : LSnippet[] | null
  onSnippetDelete: (snippetId: string) => void
  onSnippetRestore: (snippetId: string) => void
}
const Snippets: React.FC<snipppetProps> = ({snippets, onSnippetDelete, onSnippetRestore}) => {  
  return (
    <div className={`${snippets ? 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1' : 'flex justify-center items-center'} p-5 gap-3`}>
       {snippets ? snippets?.map(snippet => (
           <SnippetNote key = {snippet._id as string} snippet={snippet} onSnippetDelete = {onSnippetDelete} onSnippetRestore={onSnippetRestore}/>
       )) : <NoSnippet/>}
    </div>
  )
}

export default Snippets