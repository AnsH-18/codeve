"use client"
import Snippets from '@/components/snippet/Snippets'
import SimpleTagCarousel from '@/components/tags/TagsCarousel'
import { useEffect,useState } from 'react'
import { ITag } from '@/models/schema'
import { LSnippet } from '../api/snippet/route'
import { toast } from 'sonner'
import { useSidebarContext } from '@/providers/SidebarContextProvider'
import { LTag } from '../api/tags/route'


function Page () {
  const [tags, setTags] = useState<LTag[]>([])
  const [currentTag, setCurrentTag] = useState<LTag | null>()
  const [snippets, setSnippets] = useState<LSnippet[] | null>([])
  const {contentSet} = useSidebarContext()
  const {updatedTag} = useSidebarContext()
  const {deleteTag} = useSidebarContext() 
  console.log(contentSet)
  useEffect(() => {
    const fetchTags = async () => {
        try {
            const response = await fetch('/api/tags');
            if (!response.ok) {
                throw new Error('Failed to fetch tags');
            }
            const data = await response.json();
            const structuredTags = data.tags.map((tag: LTag) => ({
              _id: tag._id,
              name: tag.name,
              userId: tag.userId,
              snippets: snippets, 
          }));
  
            setTags(structuredTags);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    fetchTags();
}, []);

useEffect(() => {
  const fetchSnippets = async () => {
    try {
      let url = '/api/snippet?';
      const params = new URLSearchParams();

      if (currentTag && currentTag._id !== "all") {
        params.append('tagId', currentTag._id as string);
      }

      if (contentSet !== 'all') {
        params.append('contentSet', contentSet);
      }

      url += params.toString();

      const response = await fetch(url, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        setSnippets(data.snippets);
      } else {
        setSnippets(null);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching snippets");
    }
  };

  fetchSnippets();
}, [currentTag, contentSet]);

  const handleSnippetDelete = (deletedSnippetId: string) => {
    setSnippets((prevSnippets) => prevSnippets && prevSnippets.filter(snippet => snippet._id !== deletedSnippetId));
  };
  const handleSnippetRestore = (restoreSnipeptId: string) => {
    setSnippets((prevSnippets) => prevSnippets && prevSnippets.filter(snippet => snippet._id !== restoreSnipeptId));
  }
  const handleTagUpdate = (tagId: string, newTagName: string) => {
    console.log("Before update:", tags); // Log before updating
    setTags((prevTags):LTag[] => {
        const updatedTags = prevTags.map((tag) => 
            tag._id === tagId ? { ...tag, name: newTagName } : tag
        );
        console.log("After update:", updatedTags)
        return updatedTags as LTag[];
    });
};

const handleTagDelete = (deletedTagId: string) => {
  setTags((prevTags) => prevTags && prevTags.filter(tag => tag._id !== deletedTagId))
}

useEffect(() => {
  if (updatedTag?.tagId && updatedTag.newTagName) {
    handleTagUpdate(updatedTag.tagId, updatedTag.newTagName);
  }
}, [updatedTag]);

useEffect(() => {
  if(deleteTag) {
    handleTagDelete(deleteTag)
  }
})

  return (
    <div className='flex flex-col gap-5'> 
      <SimpleTagCarousel tags={tags} onTagSelect={(tag: LTag | null) => setCurrentTag(tag)}/>
      <Snippets snippets = {snippets} onSnippetDelete = {handleSnippetDelete} onSnippetRestore = {handleSnippetRestore}/>
    </div>
  )
}

export default Page