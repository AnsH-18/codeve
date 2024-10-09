import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tags, Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { LTag } from '@/app/api/tags/route';

interface EditTagProps {
    onUpdate: (tagId: string, newTagName: string) => void;
    onDelete: (tagId: string) => void; // Assuming you want to handle deletions too
}

function EditTagsDialog({ onUpdate, onDelete }: EditTagProps) {
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState<LTag[]>([]);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [currentTag, setCurrentTag] = useState<LTag | null>(null);
    const [newTagName, setNewTagName] = useState('');
    const [isLoading, setIsLoading] = useState(false)

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
    }, []);

    const handleEdit = (tag: LTag) => {
        setCurrentTag(tag);
        setNewTagName(tag.name); 
        setEditOpen(true);
    };

    const handleDelete = (tag: LTag) => {
        setCurrentTag(tag);
        setDeleteOpen(true);
    };

    const confirmEdit = async () => {
        if (currentTag) {
            setIsLoading(true)
            try {
                const response = await fetch('/api/tags', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tagId: currentTag._id, 
                        newTagName: newTagName, 
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update tag');
                }
    
                toast.success('Tag updated successfully!');
                onUpdate(currentTag._id as string, newTagName); 
            } catch (error) {
                console.error('Error updating tag:', error);
                toast.error('Error updating tag');
            }
            finally{
                setIsLoading(false)
            }
        }
        setEditOpen(false);
        setOpen(false);
    };
    

    const confirmDelete = async () => {
    if (currentTag) {
        setIsLoading(true)
        try {
            const response = await fetch('/api/tags', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tagId: currentTag._id as string, 
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete tag');
            }

            onDelete(currentTag._id as string); 
            toast.success('Tag deleted successfully!');
        } catch (error) {
            console.error('Error deleting tag:', error);
            toast.error('Error deleting tag');
        }
        finally{
            setIsLoading(false)
        }
    }
    setDeleteOpen(false);
    setOpen(false);
};


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Tags onClick={() => setOpen(true)} width={16} height={16} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tags</DialogTitle>
                    <DialogDescription>
                        View, update, and delete your tags.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {tags ? tags.map(tag => (
                        <>
                            <div key={tag._id as string} className='flex justify-between px-2 py-1 items-center hover:bg-gray-50'>
                            <div className='flex gap-2 items-center'> 
                                <p>{tag.name}</p>
                                <Button variant={"outline"} className='h-4 px-2 text-[12px]'>{tag.snippets} Snippets</Button>
                            </div>
                            <div className='flex px-1 py-2 items-center gap-4'>
                                <Pencil
                                    width={14}
                                    height={14}
                                    onClick={() => handleEdit(tag)}
                                    cursor={"pointer"}
                                    className='hover:fill-black' // Open edit dialog
                                />
                                <Trash
                                    width={14}
                                    height={14}
                                    onClick={() => handleDelete(tag)}
                                    cursor={"pointer"}
                                    className='hover:fill-black' // Open delete confirmation
                                />
                            </div>
                        </div>
                        <div className="border-t my-1 mx-2"></div>
                        </>
                    ))  :
                    <p className='bg-black'>No Tags</p>}
                </div>
                <div className='flex justify-end gap-5'>
                    <Button onClick={() => setOpen(false)} variant={"default"}>Cancel</Button>
                </div>
            </DialogContent>

            {/* Edit Tag Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Tag</DialogTitle>
                    </DialogHeader>
                    <input
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        className="input-field p-2 font-medium"
                    />
                    <div className='flex justify-end gap-5 mt-4'>
                        <Button onClick={() => setEditOpen(false)} variant={"outline"}>Cancel</Button>
                        <Button disabled = {isLoading} onClick={confirmEdit}>Confirm</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this tag?
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex justify-end gap-5 mt-4'>
                        <Button onClick={() => setDeleteOpen(false)} variant={"outline"}>Cancel</Button>
                        <Button disabled = {isLoading} onClick={confirmDelete}>Confirm</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Dialog>
    );
}

export default EditTagsDialog;
