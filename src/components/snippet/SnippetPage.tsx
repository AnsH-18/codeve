"use client"

import CodeEditor from '@/components/Editor';
import TagSelectionComponent from '@/components/tags/TagsSelection';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ITag } from '@/models/schema';
import { Code, Keyboard, Tags } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface SnippetPageProps {
  snippetId?: string;
}

function SnippetPage({ snippetId }: SnippetPageProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [language, setLanguage] = useState('javascript');
    const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('/api/tags');
                if (!response.ok) {
                    throw new Error('Failed to fetch tags');
                }
                const data = await response.json();
                setTags(data.tags);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();

        if (snippetId) {
            fetchSnippet(snippetId);
        }
    }, [snippetId]);

    const fetchSnippet = async (id: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/snippet/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch snippet');
            }
            const data = await response.json();
            const snippet = data.snippet;
            setTitle(snippet.title);
            setCode(snippet.code);
            setLanguage(snippet.language);
            setSelectedTags(snippet.tags);
            setDescription(snippet.description);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleTagSelect = (tag: ITag) => {
        if (tag && !selectedTags.some(t => t._id === tag._id)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const removeTag = (tagToRemove: ITag) => {
        setSelectedTags(selectedTags.filter(tag => tag._id !== tagToRemove._id));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const snippetInfo = { title, description, code, language, tags: selectedTags };
            const method = snippetId ? 'PUT' : 'POST';
            const url = snippetId ? `/api/snippet/${snippetId}` : '/api/snippet';
            
            const toastId = toast.loading(snippetId ? "Updating snippet..." : "Creating snippet...");
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(snippetInfo)
            });
            
            if (response.ok) {
                toast.success(snippetId ? "Snippet updated successfully!" : "Snippet created successfully!", {
                    id: toastId,
                });
                setIsEditing(false);
            } else {
                toast.error("Something went wrong", {
                    id: toastId,
                });
            }
        } catch (error) {
            console.error('Error submitting snippet:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditConfirm = () => {
        setIsEditing(true);
        setIsDialogOpen(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='max-w-2xl mx-auto p-6 rounded'>
            <div className='flex flex-col gap-8'>
                <div>
                    <h1 className='font-bold text-2xl mb-4 text-black'>
                        {snippetId ? 'View Snippet' : 'Create Snippet'}
                    </h1>
                    <p className="mt-2">
                        {snippetId
                            ? 'View or edit the details of your code snippet below.'
                            : 'Enter the details of your code snippet below.'}
                    </p>
                </div>

                {snippetId && !isEditing && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">Edit Snippet</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Snippet</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to edit this snippet? This action will allow you to make changes to the existing content.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleEditConfirm}>Confirm Edit</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='space-y-8'>
                        <div className='flex gap-4 items-center'>
                            <div className='font-medium'>
                                <p>T</p>
                            </div>
                            <input 
                                name='title'
                                placeholder='Enter snippet title' 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 text-2xl font-medium bg-inherit rounded-md
                                           transition duration-200 ease-in-out focus:outline-none focus:ring-0 placeholder-gray-400"
                                disabled={!isEditing && snippetId ? true : false}
                            />
                        </div>
                        <div className='flex gap-4 items-center'>
                            <div><Tags height={16} width={16} color='black'/></div>
                            <TagSelectionComponent 
                                tags={tags} 
                                onRemove={removeTag} 
                                onSelect={handleTagSelect} 
                                selectedtags={selectedTags}
                                disabled={!isEditing && snippetId ? true : false}
                            />
                        </div>
                        <div className='flex gap-4 items-center'>
                            <Keyboard height={16} width={16} color='black'/>
                            <textarea 
                                name='description' 
                                placeholder='Description' 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-inherit px-2 py-2 text-md rounded-md
                                           transition duration-200 ease-in-out focus:outline-none focus:ring-0 placeholder-gray-400"
                                disabled={!isEditing && snippetId ? true : false}
                            />
                        </div>
                        <div className='flex gap-4'>
                            <div className='hidden lg:block'><Code height={16} width={16} color='black'/></div>
                            <CodeEditor 
                                value={code} 
                                onChange={setCode} 
                                language={language} 
                                setLanguage={setLanguage}
                                readonly={!isEditing && snippetId ? true : false}
                            />
                        </div>
                    </div>
                    <div className='flex justify-end mt-4'>
                        {(isEditing || !snippetId) && (
                            <Button disabled={isSubmitting} type='submit' className='bg-[#142d4c]'>
                                {snippetId ? 'Update' : 'Create'}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SnippetPage;