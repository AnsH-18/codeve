import React, { useState, useEffect } from 'react';
import { LSnippet } from '@/app/api/snippet/route';
import { Heart, ArchiveRestore } from 'lucide-react';
import { Button } from '../ui/button';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import DeleteSnippetDialog from './DeleteSnippetDialog';
import RestoreSnippetDialog from './RestoreSnippetDialog';
import Link from 'next/link';
import { useSidebarContext } from '@/providers/SidebarContextProvider';

interface SnippetProps {
  snippet: LSnippet;
  onSnippetDelete: (id: string) => void;
  onSnippetRestore: (id: string) => void
}

const SnippetNote: React.FC<SnippetProps> = ({ snippet, onSnippetDelete, onSnippetRestore }) => {
  const {updateCurrentSnippetId} = useSidebarContext()
  const formattedDate = formatDate(snippet.createdAt);
  const [isFavorite, setIsFavorite] = useState(snippet.isFavorite);
  console.log(snippet.isFavorite)
  useEffect(() => {
    setIsFavorite(snippet.isFavorite);
  }, [snippet.isFavorite]);

  const toggleFavorite = async (snippetId: string) => {
    try {
      const response = await fetch(`/api/snippet/${snippetId}/favorite`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setIsFavorite(prevState => !prevState);
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
      <div className='bg-white rounded-md p-5 shadow-sm transition-transform transform hover:scale-[1.01] hover:shadow-lg duration-300 ease-in-out'>
      {/* header */}
      <div className='flex justify-between items-center mb-4'>
        <div>
        <Link href={"/dashboard/snippet"} onClick={() => updateCurrentSnippetId(snippet._id as string)}>
          <h1 className='font-bold text-2xl mr-1'>{snippet.title}</h1>
        </Link>
        </div>
        {!snippet.trashed && 
        <div className='flex justify-center items-center'>
          <button
            onClick={() => toggleFavorite(snippet._id as string)}
            className="focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              height={20}
              width={20}
              fill={isFavorite ? "#142d4c" : "none"}
              color="black"
              className="transition-colors duration-300"
            />
          </button>
        </div>
        }
      </div>
      {/* header end */}

      <div className='mb-4'>
        <p className='text-sm font-medium text-gray-400'>{formattedDate}</p>
      </div>

      <div className='flex gap-2 flex-wrap mb-5'>
        {snippet.tagDocs.map((tag, index) => (
          <Button key={index} variant={'outline'} className='bg-[#142d4c] text-white text-sm h-6 flex items-center px-2 justify-center'>{tag.name}</Button>
        ))}
      </div>

      <div className='h-16 overflow-hidden'>
        <p className='text-md text-gray-500 font-semibold line-clamp-2'>{snippet.description}</p>
      </div>

      <div>
        <CodeMirror
          value={snippet.code}
          height="300px"
          width='600px'
          theme={githubLight}
          extensions={[javascript({ jsx: true })]}
          editable={false}
          className="overflow-hidden code-editor-scrollbar"
        />
      </div>

      <div className='mt-2 flex items-center px-2 justify-between'>
        <div className='flex items-center gap-2'>
          <Image src={snippet.languageDoc.icon} height={14} width={14} alt='lang logo' />
          <p className='text-sm font-medium text-gray-600'>{snippet.language}</p>
        </div>
        <button>
          {snippet.trashed ? 
          <RestoreSnippetDialog snippetId= {snippet._id as string} onRestore={onSnippetRestore}/> :
          <DeleteSnippetDialog snippetId={snippet._id as string} onDelete={onSnippetDelete} />
          }
        </button>
      </div>
    </div>
  );
};

export default SnippetNote;