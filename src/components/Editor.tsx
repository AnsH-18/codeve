import React from 'react';
import CodeMirror, { EditorSelection } from '@uiw/react-codemirror';
import { Copy } from 'lucide-react';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { useState } from 'react';
import LangSelect from './LangSelect';
type EdiTorProps = {
    value: string,
    onChange: (value:string) => void,
    language?: string,
    setLanguage: (value: string) => void,
    readonly: boolean
}

const CodeEditor = ({ value, onChange, language = 'javascript', setLanguage, readonly }:EdiTorProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const handleChange = React.useCallback((value:string) => {
        onChange(value);
    }, [onChange]);

    const handleCopy = () => {
        navigator.clipboard.writeText(value).then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
        });
      };

  return (
    <div className='overflow-hidden bg-white flex flex-col '>
      <div className='px-2 py-1 flex justify-between items-center'>
        <div>
          <LangSelect setLanguage={setLanguage}/>
        </div>
        <div>
          <Copy height={14} width={14} color='gray'className='hover:cursor-pointer' onClick={handleCopy}/>
        </div>
      </div>
       <CodeMirror
        value={value}
        height="500px"
        width='600px'
        theme={githubLight}
        extensions={[javascript({ jsx: true })]}
        onChange={handleChange}
        className="overflow-hidden"
        editable= {!readonly}
      />
    </div>
  );
};

export default CodeEditor;



