import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { baseStyles } from './styles/GlobalStyles';
import remarkGfm from 'remark-gfm';

const StyledBreakout = styled('div')`
  display: flex;
  flex-direction: column;
`

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


const ReadmeDoc = ({ repo, readmeContent }) => {
  return (
  <StyledBreakout>
    <StyledMarkdown 
      rehypePlugins={[rehypeRaw]} 
      components={{
        a: props => {
          return props.href.startsWith('./') ? (
              <a href={`https://github.com/input-output-hk/${repo}/tree/master${props.href.substring(1)}`}>{props.children}</a>
          ) : (
              <a href={props.href}>{props.children}</a>
          )
          },
        code: props => {
          const match = /language-(\w+)/.exec(props.className || '');

          return match ? (
            <SyntaxHighlighter
              style={coy}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(props.children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : !props.inline  ? (
            <SyntaxHighlighter
              style={coy}
              language={"bash"}
              PreTag="p"
              {...props}
            >
              {String(props.children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={props.className} {...props}>
              {props.children}
            </code>
          );
        }}} 
      skipHtml={true} 
      remarkPlugins={[remarkGfm]}
    >
      {readmeContent}
    </StyledMarkdown>
  </StyledBreakout>
)}

export default ReadmeDoc