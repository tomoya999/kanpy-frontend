import React from 'react';
import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <code className={`bg-pink-100 py-1 px-2 text-grey-100 ${className}`}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';
  return (
    <SyntaxHighlighter
      style={ base16AteliersulphurpoolLight }
      language={ lang }
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
