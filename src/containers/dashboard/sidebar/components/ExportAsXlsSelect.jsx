import React from 'react';
import exportFromJSON from 'export-from-json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function ExportAsXlsSelect() {
  const {
    links,
    subredditFilter,
    searchResults,
    pageResults,
    currentPage,
    searchPages,
    total,
  } = useSelector(state => state.saved);

  const exportAsXLS = event => {
    const exportType = 'xls';
    let fileName = 'spreadsheet';
    let data = [];
    switch (event.target.value) {
      case 'page':
        fileName = `Page${currentPage}of${searchPages}`;
        data = pageResults;
        exportFromJSON({ data, fileName, exportType });
        break;
      case 'subreddit':
        fileName = `ResultsFrom-r/${subredditFilter}`;
        data = searchResults;
        exportFromJSON({ data, fileName, exportType });
        break;
      case 'everything':
        fileName = `AllSavedPosts(${total})`;
        data = links;
        exportFromJSON({ data, fileName, exportType });
        break;
      default:
        break;
    }
    event.target.value = '';
  };

  return (
    <div className="relative">
      <select
        defaultValue=""
        onChange={e => {
          exportAsXLS(e);
        }}
        className="mb-2 font-bold text-white block appearance-none w-full bg-blue-500 py-3 px-4 pr-8 rounded border-b-4 border-blue-700 leading-tight focus:outline-none"
      >
        <option value="" disabled>
          Export Excel Sheet
        </option>
        <option value="page">Current Page</option>
        {subredditFilter && (
          <option value="subreddit">Selected Subreddit</option>
        )}
        <option value="everything">Everything</option>
      </select>
      <div className="pointer-events-none mb-3 mr-1 absolute inset-y-0 right-0 flex items-center px-1 text-white">
        <FontAwesomeIcon icon={faDownload} size="1x" />
      </div>
    </div>
  );
}

export default ExportAsXlsSelect;
