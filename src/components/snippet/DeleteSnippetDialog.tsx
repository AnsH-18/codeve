import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
  
interface DeleteSnippetDialogProps {
    snippetId: string; 
    onDelete: (id: string) => void; 
}

function DeleteSnippetDialog({ snippetId, onDelete }: DeleteSnippetDialogProps) {

    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/snippet/${snippetId}/trashed`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                onDelete(snippetId);
                setOpen(false)
                toast.success("Snipped Moved to Trash")
                console.log('Snippet moved to trash successfully');
            } else {
                toast.error("Cannot move snippet to trash")
                console.error('Error moving snippet to trash:', await response.json());
            }
        } catch (error) {
            console.error('Failed to delete snippet:', error);
        }
    };
    
  return (
    <Dialog open= {open} onOpenChange={setOpen}>
        <DialogTrigger>
            <Trash  onClick={() => setOpen(true)} width={16} height={16}/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action will move the snippet to the trash folder.
            </DialogDescription>
            </DialogHeader>
            <div className='flex justify-end gap-5'>
                <Button onClick={() => setOpen(false)} variant={"outline"}>Cancel</Button>
                <Button onClick={handleDelete}>Confirm</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteSnippetDialog