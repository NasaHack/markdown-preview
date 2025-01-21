import { Prism } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const HilightSyntax = ({ children, ...rest }) => {
  return (
    <Prism
      style={a11yDark}
      language={"html"}
      PreTag="div"
      className="absolute"
      customStyle={{
        margin: 0,
        padding: 0,
        background: "transparent",
        whiteSpace: "pre-wrap",
      }}
      codeTagProps={{
        style: {
          fontStyle: "italic",
        },
      }}
      {...rest}
    >
      {children}
    </Prism>
  );
};

export default HilightSyntax;
