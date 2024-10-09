import React from 'react';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ITag } from '@/models/schema';

interface TagSelectionComponentProps {
  tags: ITag[];
  onSelect: (tag: ITag) => void;
  onRemove: (tag: ITag) => void;
  selectedtags: ITag[];
  disabled: boolean
}

const TagSelectionComponent: React.FC<TagSelectionComponentProps> = ({ tags, onRemove, onSelect, selectedtags, disabled }) => {
  
  const handleTagSelect = (tagName: string) => {
    const selectedTag = tags.find((tag) => tag.name === tagName);
    if (selectedTag) {
      onSelect(selectedTag);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4 ">
      <div className="flex flex-wrap items-center gap-2">
        <Select onValueChange={handleTagSelect} disabled = {disabled}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            {tags.map((tag) => (
              <SelectItem key={tag._id as string} value={tag.name}>
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2">
          {selectedtags.map((tag) => (
            <Badge key={tag._id as string} variant="secondary" className="bg-[#142d4c] hover:text-black text-white text-sm flex items-center">
            {tag.name}
              <button
                onClick={() => onRemove(tag)}
                className="ml-1 hover:text-destructive focus:outline-none"
              >
                {!disabled && <X size={14} />}
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagSelectionComponent;
