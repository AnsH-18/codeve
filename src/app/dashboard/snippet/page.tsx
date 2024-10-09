"use client"
import SnippetPage from '@/components/snippet/SnippetPage';
import { useSidebarContext } from '@/providers/SidebarContextProvider'; // Adjust this import based on the actual file location

function Page() {
  const { currentSnippetId } = useSidebarContext();
    return (
        <SnippetPage snippetId= {currentSnippetId}/>
    )
}

export default Page;
