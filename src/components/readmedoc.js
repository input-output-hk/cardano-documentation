import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { Octokit } from "@octokit/core";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { baseStyles } from './styles/GlobalStyles';

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

const StyledMarkdown = styled(ReactMarkdown)`
  ${baseStyles}

  h1, h2, h3, h4, h5, h6 {
    padding: 0.5rem 0;
  }

  li {
    margin: 0.5rem 0;
  }

  img {
    margin: 1.5rem 0;
  }

  hr {
    margin: 0.5rem 0;
  }

  a > img {
    margin:  0;
  }
  
`;


const ReadmeDoc = ({ repo }) => { 
  const [readmeContent, setReadmeContent] = useState(null);


  const octokit = new Octokit();

  const getReadmeRetrievalResponse = async () => {
    const response = await octokit.request("GET /repos/{owner}/{repo}/readme", {
      owner: 'input-output-hk',
      repo: repo
    });

    setReadmeContent(Buffer.from(response.data.content, 'base64').toString('utf8'));
  }

  useEffect(() => {
    getReadmeRetrievalResponse();
  }, [])

  return (
  <StyledBreakout>
    <StyledMarkdown rehypePlugins={[rehypeRaw]} components={CodeBlock} skipHtml={true}>
      {readmeContent}
    </StyledMarkdown>
  </StyledBreakout>
)}

export default ReadmeDoc