"use client"
import React, { useEffect, useState } from 'react';
import CodeEditor from '@/components/Editor';
import { ITag } from '@/models/schema';
import { Code, Keyboard, Tags } from 'lucide-react';
import TagSelectionComponent from '@/components/tags/TagsSelection';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SnippetPage from '@/components/snippet/SnippetPage';

function Page() {
    // const [isSubmitting, setIsSubmitting] = useState(false)
    // const [title, setTitle] = useState('');
    // const [code, setCode] = useState('');
    // const [tags, setTags] = useState<ITag[]>([]);
    // const [language, setLanguage] = useState('javascript');
    // const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
    // const [description, setDescription] = useState('');

    // useEffect(() => {
    //     const fetchTags = async () => {
    //         try {
    //             const response = await fetch('/api/tags');
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch tags');
    //             }
    //             const data = await response.json();
    //             setTags(data.tags);
    //         } catch (error) {
    //             console.error('Error fetching tags:', error);
    //         }
    //     };

    //     fetchTags();
    // }, []);

    // const handleTagSelect = (tag: ITag) => {
    //     console.log(tag)
    //     if (tag && !selectedTags.some(t => t._id === tag._id)) {
    //         setSelectedTags([...selectedTags, tag]);
    //     }
    // };

    // const removeTag = (tagToRemove: ITag) => {
    //     setSelectedTags(selectedTags.filter(tag => tag._id !== tagToRemove._id));
    // };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     setIsSubmitting(true)

    //     try {
    //         const snippetInfo = { title, description, code, language, tags: selectedTags };
    //         const toastId = toast.loading("Creating snippet...");
    //         const response = await fetch("/api/snippet", {
    //           method: "POST",
    //           headers:  {"Content-Type": "application/json"},
    //           body: JSON.stringify(snippetInfo)
    //         })
    //         if(response.ok){
    //             toast.success("Snippet created successfully!", {
    //               id: toastId, 
    //           });
    //         }
    //         else{
    //           toast.error("Something went wrong", {
    //             id: toastId,
    //         });
    //         }
    //     } catch (error) {
          
    //     }
    //     finally{
    //       setIsSubmitting(false)
    //     }
        
    // };
    // return (
    //     <div className=''>
    //         <div className="max-w-2xl mx-auto p-6 rounded">
    //         <div className='flex flex-col gap-8'>
    //             <div>
    //                 <h1 className='font-bold text-2xl mb-4 text-black'>Create Snippet</h1>
    //                 <p className="mt-2">Enter the details of your code snippet below.</p>
    //             </div>

    //             <form onSubmit={handleSubmit}>
    //                 <div className='space-y-8'>
    //                     <div className='flex gap-4 items-center'>
    //                         <div className=' font-medium'>
    //                             <p>T</p>
    //                         </div>
    //                         <input 
    //                             name='title'
    //                             placeholder='Enter snippet title' 
    //                             value={title}
    //                             onChange={(e) => setTitle(e.target.value)}
    //                             className="w-full px-4 py-3 text-2xl font-medium bg-inherit  rounded-md
    //                                        transition duration-200 ease-in-out focus:outline-none focus:ring-0 placeholder-gray-400"
    //                         />
    //                     </div>
    //                     <div className='flex gap-4 items-center'>
    //                         <div><Tags height={16} width={16} color='black'/></div>
    //                         <TagSelectionComponent 
    //                             tags={tags} 
    //                             onRemove={removeTag} 
    //                             onSelect={handleTagSelect} 
    //                             selectedtags={selectedTags}
    //                         />
    //                     </div>
    //                     <div className='flex gap-4 items-center'>
    //                         <Keyboard height={16} width={16} color='black'/>
    //                         <textarea 
    //                             name='description' 
    //                             placeholder='Description' 
    //                             value={description}
    //                             onChange={(e) => setDescription(e.target.value)}
    //                             className="w-full bg-inherit px-2 py-2 text-md rounded-md
    //                                        transition duration-200 ease-in-out focus:outline-none focus:ring-0 placeholder-gray-400"
    //                         />
    //                     </div>
    //                     <div className='flex gap-4'>
    //                         <div><Code height={16} width={16} color='black'/></div>
    //                         <CodeEditor 
    //                             value={code} 
    //                             onChange={setCode} 
    //                             language={language} 
    //                             setLanguage={setLanguage}
    //                         />
    //                     </div>
    //                 </div>
    //                 <div className='flex justify-end mt-4'>
    //                     <Button disabled = {isSubmitting? true : false} type='submit' className='bg-[#142d4c] '>Create</Button>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    //     </div>
    // );
    return (
        <SnippetPage/>
    )
}


export default Page;