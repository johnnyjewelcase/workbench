import React from "react";

const ArticleContext = React.createContext({
  search: "",
  title: "",
  url: "",
  error: ""
});

export default ArticleContext;
