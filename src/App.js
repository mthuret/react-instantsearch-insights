import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Pagination,
  Highlight,
  Configure,
  connectHits,
  connectStateResults
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';
import { withCookies, Cookies } from 'react-cookie';

const searchClient = algoliasearch(
  'AP2QL7H7SN',
  '118d71ecb7177dd2bbe510705f1b42a5'
);


class App extends Component {
  render() {
    console.log("otken", window.aa('ANONYMOUS_USER_TOKEN'));
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">ais-ecommerce-demo-app</a>
          </h1>
          <p className="header-subtitle">
            using{' '}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </header>

        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="dotjs-demo-backup">
            <div className="search-panel">
              <div className="search-panel__results">
                <SearchBox className="searchbox" placeholder="" />
                <Hits />
                <Configure clickAnalytics enablePersonalization={true} userToken={window.aa} />

                <div className="pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div >
    );
  }
}

const Hits = connectHits(
  connectStateResults(({ hits, searchResults }) => (
    <div>
      {hits.map((hit, index) => (
        <div key={hit.objectId}>
          <Highlight attribute="title" hit={hit} />
          <p>{hit.genre}</p>
          <div>
            <button
              onClick={() => {
                console.log(searchResults)
                window.aa('clickedObjectIDsAfterSearch', {
                  index: "dotjs-demo-backup",
                  eventName: "Click on results",
                  queryID: searchResults.queryID,
                  objectIDs: [hit.objectID],
                  positions: [searchResults.hitsPerPage * searchResults.page + index + 1],
                });
              }}
            >
              Click search event
          </button>
            <button
              onClick={() => {
                window.aa('convertedObjectIDsAfterSearch', {
                  index: "dotjs-demo-backup",
                  eventName: "Converted search",
                  queryID: searchResults.queryID,
                  objectIDs: [hit.objectID],
                });
              }}
            >
              Conversion search event
          </button>
            <button
              onClick={() => {
                window.aa('viewedObjectIDs', {
                  index: "dotjs-demo-backup",
                  eventName: "View details",
                  objectIDs: [hit.objectID],
                });
              }}
            >
              View event
          </button>
            <button
              onClick={() => {
                window.aa('clickedObjectIDs', {
                  index: "dotjs-demo-backup",
                  eventName: "Add to Favorite",
                  objectIDs: [hit.objectID],
                });
              }}
            >
              Click event
          </button>
            <button
              onClick={() => {
                window.aa('convertedObjectIDs', {
                  index: "dotjs-demo-backup",
                  eventName: "Add to cart",
                  objectIDs: [hit.objectID],
                });
              }}
            >
              Conversion event
          </button>
          </div>
        </div>
      ))}
    </div>
  ))
);

export default withCookies(App);
