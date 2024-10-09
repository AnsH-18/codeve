"use client"
import React, { useEffect, useState } from 'react';
import { useSidebarContext } from '@/providers/SidebarContextProvider';// Adjust this import based on the actual file location
import { ISnippet } from '@/models/schema';
import SnippetPage from '@/components/snippet/SnippetPage';

function Page() {
  const { currentSnippetId } = useSidebarContext();
//   const [snippet, setSnippet] = useState<ISnippet | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!currentSnippetId) return; // Don't make the API call if there's no current snippet ID

//     const fetchSnippet = async () => {
//       setLoading(true); // Start loading
//       try {
//         const response = await fetch(`/api/snippet/${currentSnippetId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch snippet');
//         }
//         const data = await response.json();
//         setSnippet(data.snippet); // Set the fetched snippet data
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchSnippet();
//   }, [currentSnippetId]); // Re-run the effect when currentSnippetId changes

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!snippet) return <div>No snippet selected</div>;

//   return (
//     <div>
//       <h1>{snippet.title}</h1>
//       <p>{snippet.code}</p>
//     </div>
//   );
    return (
        <SnippetPage snippetId= {currentSnippetId}/>
    )
}

export default Page;
