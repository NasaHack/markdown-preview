import { useEffect, useReducer, useRef } from "react";
import { markdownToHtml } from "mth-htm";
import Markdown from "../markdown";
import HilightSyntax from "../markdown/HilightSyntax";
import defaultMarkdownString from "../../constants/defaultMarkdownString";

const initialState = {
  markdown: "",
  html: "",
  showHTML: false,
};

const ACTION_TYPE = {
  GET_INPUT_MARKDOWN: "GET_INPUT_MARKDOWN",
  SET_INITIAL_MARKDWON: "SET_INITIAL_MARKDWON",
  SET_HTML: "SET_HTML",
  SHOW_HTML: "SHOW_HTML",
};

const ACTION = {
  GET_INPUT_MARKDOWN: (markdown) => ({
    type: ACTION_TYPE.GET_INPUT_MARKDOWN,
    markdown,
  }),
  SET_INITIAL_MARKDWON: (initialMarkDown) => ({
    type: ACTION_TYPE.SET_INITIAL_MARKDWON,
    markdown: initialMarkDown,
  }),
  SET_HTML: (html) => ({
    type: ACTION_TYPE.SET_HTML,
    html,
  }),
  SET_SHOW_HTML: () => ({
    type: ACTION_TYPE.SET_SHOW_HTML,
  }),
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_INPUT_MARKDOWN: {
      return {
        ...state,
        markdown: action.markdown,
      };
    }
    case ACTION_TYPE.SET_INITIAL_MARKDWON: {
      return {
        ...state,
        markdown: action.markdown,
      };
    }
    case ACTION_TYPE.SET_SHOW_HTML: {
      return {
        ...state,
        showHTML: !state.showHTML,
      };
    }
    case ACTION_TYPE.SET_HTML: {
      return {
        ...state,
        html: action.html,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const Editor = () => {
  const [{ markdown, html, showHTML }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [inputRef, outputRef] = [useRef(null), useRef(null)];

  useEffect(() => {
    dispatch(ACTION.SET_INITIAL_MARKDWON(defaultMarkdownString));
  }, []);

  useEffect(() => {
    (async () => {
      dispatch(ACTION.SET_HTML(await markdownToHtml(markdown)));
    })();
  }, [markdown]);

  useEffect(() => {
    const [input, output] = [inputRef.current, outputRef.current];
    inputRef.current.focus();
    input.addEventListener("scroll", (e) => {
      output.scrollTop = e.target.scrollTop;
    });
  });

  return (
    <div className="border border-[rgba(var(--color-border))] rounded w-full h-[calc(100vh-50px)] flex flex-col gap-[10px] md:flex-row relative bg-[rgba(var(--color-secondary))]">
      <div className="p-2 h-[50%] md:h-full md:w-[50%] rounded-md">
        <div className="text-center font-bold text-lg py-2">Input</div>
        <textarea
          className="p-2 w-full h-full md:h-[calc(100%-45px)] bg-[rgba(var(--color-primary))] whitespace-pre-wrap overflow-y-auto focus:outline-none scrollbar resize-none block border border-[rgba(var(--color-border))]"
          spellCheck="false"
          onChange={(e) => dispatch(ACTION.GET_INPUT_MARKDOWN(e.target.value))}
          value={markdown}
          ref={inputRef}
        ></textarea>
      </div>
      <div className="p-2 h-[50%] md:h-full md:w-[50%] rounded-md relative">
        <div className="text-center font-bold text-lg pt-5 pb-2 md:py-2">
          Output
        </div>
        <div
          className="p-2 w-full h-[calc(100%-55px)] max-h-full md:h-[calc(100%-45px)] bg-[rgba(var(--color-primary))] overflow-y-auto focus:outline-none scrollbar resize-none block border border-[rgba(var(--color-border))] relative"
          ref={outputRef}
        >
          {showHTML ? (
            <HilightSyntax>{html}</HilightSyntax>
          ) : (
            <Markdown>{markdown}</Markdown>
          )}
        </div>
        <button
          className="absolute top-[67px] md:top-[57px] right-[23px] bg-[rgba(var(--color-accent))] font-semibold p-2 rounded-lg text-xs"
          onClick={() => dispatch(ACTION.SET_SHOW_HTML())}
        >
          {showHTML ? "Markdown" : "HTML"}
        </button>
      </div>
    </div>
  );
};

export default Editor;
