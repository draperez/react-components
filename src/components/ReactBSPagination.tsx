import React from "react";
import {MdFirstPage, MdChevronLeft, MdChevronRight, MdLastPage} from "react-icons/md";

interface Props {
  "totalPages": number,
  "currentPage": number,
  "onPageClick": (pageNumber: number) => void
}

export const ReactBSPagination = ({ totalPages, currentPage, onPageClick }: Props) => {
  const allPages: number[] = [...Array(totalPages + 1).keys()];
  const showingPages: number[] = allPages.filter(i =>
    i > 0 && (  // Pages start from 1
      (i >= currentPage - 2 && i <= currentPage + 2) ||  // previous 2 and next 2 pages
      (i >= totalPages - 5 && currentPage >= totalPages - 3) ||  // Last 6 pages 
      (i <= 6 && currentPage <= 4)  // First 6 pages
    )
  );
  const minShowingPage = showingPages[0];
  const maxShowingPage = showingPages[showingPages.length - 1];

  return (
    <nav>
      {totalPages > 0 && <ul className="pagination justify-content-center flex-wrap">
        <li
          className={currentPage === 1 ? "page-item disabled" : "page-item"}
          onClick={() => {if (currentPage !== 1) onPageClick(1)}}>
          <button className="page-link" role="button" title="Lehena" disabled={currentPage === 1}>
            <MdFirstPage />
          </button>
        </li>
        <li
          className={currentPage === 1 ? "page-item disabled" : "page-item"}
          onClick={() => { if(currentPage > 1) onPageClick(currentPage - 1)}}>
          <button className="page-link" role="button" title="Aurrekoa">
            <MdChevronLeft />
          </button>
        </li>
        {minShowingPage > 1 && <li className="page-item disabled">
          <button className="page-link" role="button">...</button>
        </li>}
        {showingPages.map(i => {
          return <li
            className={i === currentPage ? "page-item active" : "page-item"}
            key={i}
            onClick={() => {if(i !== currentPage) onPageClick(i)}}>
            <button className="page-link" role="button">{i}</button>
          </li>
        })}
        {maxShowingPage < totalPages && <li className="page-item disabled">
          <button className="page-link" role="button">...</button>
        </li>}
        <li
          className={totalPages === currentPage ? "page-item disabled" : "page-item"} 
          onClick={() => { if(currentPage < totalPages) onPageClick(currentPage + 1)}}>
          <button className="page-link" role="button" title="Hurrengoa" disabled={totalPages === currentPage}>
            <MdChevronRight />
          </button>
        </li>
        <li
          className={totalPages === currentPage ? "page-item disabled" : "page-item"}
          onClick={() => { if(currentPage !== totalPages) onPageClick(totalPages)}}>
          <button className="page-link" role="button" title="Azkena" disabled={totalPages === currentPage}>
            <MdLastPage />
          </button>
        </li>
      </ul>}
    </nav>
  )
}
