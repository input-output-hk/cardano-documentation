import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { Octokit } from "@octokit/core";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const StyledBreakout = styled('div')`
  display: flex;
  flex-direction: column;
`

const CodeBlock = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');

    return match ? (
      <SyntaxHighlighter
        style={coy}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : !inline ? (
      <SyntaxHighlighter
        style={coy}
        language={"bash"}
        PreTag="p"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};


const ReadmeDoc = ({ repo }) => { 
  const [readmeContent, setReadmeContent] = useState(null);


  const octokit = new Octokit();

  const getResponse = async () => {
    const response = await octokit.request("GET /repos/{owner}/{repo}/readme", {
      owner: 'input-output-hk',
      repo: repo
    });

    setReadmeContent(Buffer.from(response.data.content, 'base64').toString('utf8'));
  }

  useEffect(() => {
    getResponse();
  }, [])

  return (
  <StyledBreakout>
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={CodeBlock} skipHtml={true}>
      {readmeContent}
    </ReactMarkdown>
  </StyledBreakout>
)}

export default ReadmeDoc