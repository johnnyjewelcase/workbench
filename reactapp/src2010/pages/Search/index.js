import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Alert from "../../components/Alert";
import API from "../../utils/API";
import ArticleContext from "../../utils/ArticleContext";

function Search() {
  const [article, setArticle] = useState({
    search: "Wikipedia",
    title: "",
    url: "",
    error: ""
  });

  // When the component mounts, update the title to be Wikipedia Searcher
  useEffect(() => {
    document.title = "Wikipedia Searcher";

    if (!article.search) {
      return;
    }

    API.searchTerms(article.search)
      .then(res => {
        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        setArticle({ title: res.data[1][0] });
        setArticle({ url: res.data[3][0] });
      })
      .catch(err => setArticle({ error: err }));
  }, [article.search]);

  const handleInputChange = event => {
    setArticle({ search: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
  };
  return (
    <div>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="text-center">Search For Anything on Wikipedia</h1>
        <Alert
          type="danger"
          style={{ opacity: article.error ? 1 : 0, marginBottom: 10 }}
        >
          {article.error}
        </Alert>
        <SearchForm
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          results={article.search}
        />
        <ArticleContext.Provider value={article}>
          <SearchResults title={article.title} url={article.url} />
        </ArticleContext.Provider>
      </Container>
    </div>
  );
}

export default Search;
