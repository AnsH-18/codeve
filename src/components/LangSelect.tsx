import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  
import React from 'react'

interface LangSelectProps {
  setLanguage: (lang:string) => void;
}

const LangSelect: React.FC<LangSelectProps> = ({ setLanguage }) => {
  return (
    <Select defaultValue="javascript" onValueChange={(value) => setLanguage(value)}>
        <SelectTrigger className="w-36 bg-slate-100 font-medium text-gray-400">
            <SelectValue placeholder="Javascript" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">Javascript</SelectItem>
            <SelectItem value="c++">C++</SelectItem>
            <SelectItem value="java">Java</SelectItem>
        </SelectContent>
    </Select>

  )
}

export default LangSelect