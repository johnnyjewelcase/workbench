import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Alert from "../../components/Alert";

function Search() {
  const [searchState, setSearchState] = useState({
    search: "Wikipedia",
    title: "",
    url: "",
    error: ""
  });

  // When the component mounts, update the title to be Wikipedia Searcher
  document.title = "Wikipedia Searcher";

  useEffect(() => {
    API.searchTerms(searchState.search)
      .then(res => {
        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        setSearchState({
          ...searchState,
          title: res.data[1][0],
          url: res.data[3][0],
          error: ""
        });
      })
      .catch(err => setSearchState({ ...searchState, error: err.message }));
  }, [searchState.search]);

  const handleInputChange = event => {
    setSearchState({ ...searchState, search: event.target.value });
  };

  return (
    <div>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="text-center">Search For Anything on Wikipedia</h1>
        <Alert
          type="danger"
          style={{ opacity: searchState.error ? 1 : 0, marginBottom: 10 }}
        >
          {searchState.error}
        </Alert>
        <SearchForm
          handleInputChange={handleInputChange}
          results={searchState.search}
        />
        <SearchResults title={searchState.title} url={searchState.url} />
      </Container>
    </div>
  );
}

export default Search;
