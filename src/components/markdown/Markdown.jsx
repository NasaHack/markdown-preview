import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeFormat from "rehype-format";
import remarkGfm from "remark-gfm";
import { Prism } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");

    return !inline && match ? (
      <Prism
        style={a11yDark} // Remove inline styles
        language={match[1]}
        PreTag="div"
        className={`outline outline-1 outline-[rgba(128,128,128,0.233)] max-w-full rounded-md relative [text-shadow:_1px_2px_5px_rgba(var(--color-secondary),1)] font-semibold !bg-[rgba(var(--color-third),0.5)] border border-[rgba(var(--color-border))]`}
        codeTagProps={{
          style: {
            fontStyle: "italic",
          },
        }}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </Prism>
    ) : (
      <code
        className={`font-bold outline outline-1 outline-[rgba(128,128,128,0.233)] p-1  rounded-md`}
        {...props}
      >
        {children}
      </code>
    );
  },
  summary({ node, children, ...props }) {
    return (
      <summary className="" {...props}>
        {children}
      </summary>
    );
  },
  details({ node, children, ...props }) {
    return (
      <details className="" {...props}>
        {children}
      </details>
    );
  },
  ul({ node, children, ...props }) {
    return (
      <ul className="list-disc" {...props}>
        {children}
      </ul>
    );
  },
  ol({ node, children, ...props }) {
    return (
      <ul className="list-decimal pl-[15px]  !ml-[10px] !py-0 !m-0 " {...props}>
        {children}
      </ul>
    );
  },
  h1({ node, children, ...props }) {
    return (
      <h1
        className="text-[2em] pb-[0.08em]  font-bold border-b border-[rgba(var(--color-border))] mb-2"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2({ node, children, ...props }) {
    return (
      <h2
        className="text-[1.5em] pb-[0.08em]  font-bold border-b border-[rgba(var(--color-border))] mb-2"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3({ node, children, ...props }) {
    return (
      <h3 className="text-[1.3em] pb-[0.08em]  font-bold mb-2" {...props}>
        {children}
      </h3>
    );
  },
  h4({ node, children, ...props }) {
    return (
      <h4 className="text-[1.1em] pb-[0.08em]  font-bold mb-2" {...props}>
        {children}
      </h4>
    );
  },
  h5({ node, children, ...props }) {
    return (
      <h5 className="text-[1em] pb-[0.08em]  font-bold mb-2" {...props}>
        {children}
      </h5>
    );
  },
  h6({ node, children, ...props }) {
    return (
      <h6 className="text-[1em] pb-[0.08em]  mb-2" {...props}>
        {children}
      </h6>
    );
  },
  p({ node, children, ...props }) {
    return (
      <p className="my-2" {...props}>
        {children}
      </p>
    );
  },
  blockquote({ node, children, ...props }) {
    return (
      <blockquote
        className="border-l-[5px] border-[rgba(var(--color-border))] ml-[2px] pl-[2px]"
        {...props}
      >
        {children}
      </blockquote>
    );
  },
  table({ node, children, ...props }) {
    return (
      <table className="block w-full max-w-full overflow-auto my-4" {...props}>
        {children}
      </table>
    );
  },
  th({ node, children, ...props }) {
    return (
      <th
        className="border border-[rgba(var(--color-border))] [&>td]:font-bold px-6 py-1"
        {...props}
      >
        {children}
      </th>
    );
  },
  tr({ node, children, ...props }) {
    return (
      <tr
        className="border border-[rgba(var(--color-border))] even:bg-[rgba(var(--color-third),0.4)] [&>td]:border [&>td]:border-[rgb(var(--color-border))]"
        {...props}
      >
        {children}
      </tr>
    );
  },
  td({ node, children, ...props }) {
    return (
      <td className="px-6 py-1" {...props}>
        {children}
      </td>
    );
  },
  a({ node, children, ...props }) {
    return (
      <a className="text-[rgba(var(--color-accent))] underline" {...props}>
        {children}
      </a>
    );
  },
  img({ node, children, ...props }) {
    return (
      <img className="" {...props}>
        {children}
      </img>
    );
  },
  hr({ node, children, ...props }) {
    return (
      <hr className="border-b border-[rgba(var(--color-border))] my-2">
        {children}
      </hr>
    );
  },
};

const Markdown = ({ children, className, ...rest }) => {
  return (
    <div className={`${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeFormat]}
        remarkPlugins={[remarkGfm]}
        components={{ ...components }}
        {...rest}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
