import { useState } from 'react';
import { ReactBSPagination } from './components/ReactBSPagination';
import React from 'react';


function example() {
  const totalPages = 1000;
  const [currentPage, setCurrentPage] = useState(1);

  const sizes = [...Array(25).keys()];
  const buttonSizes = [
    "sm" as const,
    "md" as const,
    "lg" as const
  ];
  const justifyContents = [
    "start" as const,
    "end" as const,
    "center" as const,
    "between" as const,
    "around" as const,
    "evenly" as const
  ]

  return (
    <>
      <ReactBSPagination
        totalPages={totalPages}
        buttonSize='sm'
        justifyContent='center'
        currentPage={currentPage}
        onPageClick={(newPage) => { setCurrentPage(newPage) }} />
      {justifyContents.map((justifyContent) => <>
        <h2 key={justifyContent}>Justify Content "{justifyContent}" (0-{sizes.length - 1})</h2>
        {buttonSizes.map((buttonSize) => <>
          {sizes.map((size) => <div title={`title-${justifyContent}-${buttonSize}-${size}`}>
            <ReactBSPagination
              key={`${justifyContent}-${buttonSize}-${size}`}
              totalPages={totalPages}
              size={size}
              buttonSize={buttonSize}
              justifyContent={justifyContent}
              currentPage={currentPage}
              onPageClick={(newPage) => { setCurrentPage(newPage) }} />
          </div>)}
        </>)}
      </>)}
    </>
  )
}

export default example
