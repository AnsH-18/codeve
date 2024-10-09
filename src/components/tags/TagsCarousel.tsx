"use client"

import { LTag } from '@/app/api/tags/route'
import { useEffect, useRef, useState } from 'react'
import AddTagDialog from '../snippet/AddTagDialog'
import { Button } from '../ui/button'

interface SimpleTagCarouselProps {
  tags: LTag[]
  onTagSelect?: (tag: LTag | null) => void
  onCreateNewTag?: () => void
}

export default function SimpleTagCarousel({ tags, onTagSelect }: SimpleTagCarouselProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>("all")
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleTagClick = (tag: LTag | null) => {
    setSelectedTag(tag ? tag._id as string : "all")
    if (onTagSelect) onTagSelect(tag)
  }


  useEffect(() => {
    handleTagClick(null)
  }, [])

  return (
    <div className="items-center grid grid-cols-10 p-2 rounded-lg text-gray-500">
      <div className="overflow-x-auto flex-grow scrollbar-hide lg:col-span-9 col-span-8 mr-2" ref={scrollRef}>
        <div className="flex space-x-2 px-4">
          <Button
            variant="outline"
            onClick={() => handleTagClick(null)}
            className={`
              text-sm text-gray-500 transition-colors duration-200 ease-in-out
              ${selectedTag === "all" ? 'bg-[#142d4c] text-white' : 'hover:bg-gray-200'}
            `}
          >
            All
          </Button>
          {tags.map((tag) => (
            <Button
              variant="outline"
              key={tag._id as string}
              onClick={() => handleTagClick(tag)}
              className={`
                text-sm text-gray-500 transition-colors duration-200 ease-in-out
                ${selectedTag === tag._id ? 'bg-[#142d4c] text-white' : 'hover:bg-gray-200'}
              `}
            >
              {tag.name}
            </Button>
          ))}
        </div>
      </div>
      <AddTagDialog />
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}