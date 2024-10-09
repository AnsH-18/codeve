import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { ArchiveRestore } from 'lucide-react';
import { useState } from 'react';

interface RestoreSnippetDialogProps {
    snippetId: string; 
    onRestore: (id: string) => void; 
}

function RestoreSnippetDialog({snippetId, onRestore} : RestoreSnippetDialogProps) {
    const [open, setOpen] = useState(false)

    const handleRestore = async () => {
        try {
            const response = await fetch(`/api/snippet/${snippetId}/trashed`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                onRestore(snippetId);
                setOpen(false)
                toast.success("Snipped Removed from Trash")
                console.log('Snippet removed from trash successfully');
            } else {
                toast.error("Cannot remove snippet from trash")
                console.error('Error removing snippet from trash:', await response.json());
            }
        } catch (error) {
            console.error('Failed to delete snippet:', error);
        }
    }

  return (
        <Dialog open= {open} onOpenChange={setOpen}>
        <DialogTrigger>
            <ArchiveRestore  onClick={() => setOpen(true)} width={16} height={16}/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action will remove the snippet from the trash folder.
            </DialogDescription>
            </DialogHeader>
            <div className='flex justify-end gap-5'>
                <Button onClick={() => setOpen(false)} variant={"outline"}>Cancel</Button>
                <Button onClick={handleRestore}>Confirm</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default RestoreSnippetDialog