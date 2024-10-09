"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TagUpdateProps {
  tagId: string;
  newTagName: string;
}

interface SidebarContextType {
  contentSet: string;
  changeContent: (name: string) => void;
  updatedTag?: TagUpdateProps; 
  deleteTag?: string;
  handleTagUpdate: (tagId: string, newTagName: string) => void; 
  handleTagDelete: (tagId: string) => void;
  currentSnippetId: string;
  updateCurrentSnippetId: (snippetId: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
}

interface SidebarProviderProps {
  children: ReactNode; 
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [contentSet, setContentSet] = useState<string>("all"); 
  const [updatedTag, setUpdatedTag] = useState<TagUpdateProps | undefined>(undefined); 
  const [deleteTag, setDeleteTag] = useState<string | undefined>(undefined);
  const [currentSnippetId, setCurrentSnippetId] = useState<string>("");

  const changeContent = (name: string) => {
    setContentSet(name);
  };

  const handleTagUpdate = (tagId: string, newTagName: string) => {
    setUpdatedTag({ tagId, newTagName });
  };

  const handleTagDelete = (tagId: string) => {
    setDeleteTag(tagId);
  };

  const updateCurrentSnippetId = (snippetId: string) => {
    setCurrentSnippetId(snippetId);
  };

  return (
    <SidebarContext.Provider
      value={{
        contentSet,
        changeContent,
        handleTagUpdate,
        updatedTag,
        deleteTag,
        handleTagDelete,
        currentSnippetId,
        updateCurrentSnippetId,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
