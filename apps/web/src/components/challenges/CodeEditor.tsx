import { useState, useEffect } from 'react';

interface CodeEditorProps {
  initialCode?: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}

export function CodeEditor({ initialCode = '', onChange, disabled = false }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange(newCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      onChange(newCode);

      // Move cursor after tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="relative rounded-lg overflow-hidden border border-slate-600 bg-slate-900">
      <div className="flex">
        {/* Numeros das linhas */}
        <div className="flex-shrink-0 py-3 px-2 bg-slate-800 text-slate-500 text-sm font-mono select-none border-r border-slate-700">
          {Array.from({ length: Math.max(lineCount, 10) }, (_, i) => (
            <div key={i + 1} className="leading-6 text-right pr-2">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Area de codigo */}
        <textarea
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          spellCheck={false}
          className={`
            flex-1 p-3 bg-transparent text-slate-100 font-mono text-sm
            leading-6 resize-none outline-none
            placeholder:text-slate-500
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          style={{
            minHeight: '240px',
            tabSize: 2,
          }}
          placeholder="// Escreva seu codigo aqui..."
        />
      </div>
    </div>
  );
}
