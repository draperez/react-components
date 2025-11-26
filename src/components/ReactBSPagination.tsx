interface Props {
  totalPages: number,
  currentPage: number,
  size?: number
  buttonSize?: "sm" | "md" | "lg",
  wrap?: boolean,
  justifyContent?: "start" | "end" | "center" | "between" | "around" | "evenly",
  onPageClick: (pageNumber: number) => void
}

export const ReactBSPagination = ({ totalPages, currentPage, size = 5, buttonSize = "md", wrap, justifyContent = "center", onPageClick }: Props) => {
  const allPages: number[] = [...Array(totalPages + 1).keys()];

  const partSize = Math.floor(size/2);

  const showingPages: number[] = allPages.filter(i =>
    i > 0 && (  // No page 0, pages start from 1
      (i >= currentPage - partSize && i <= currentPage + partSize) ||  // previous 2 and next 2 pages
      (i >= totalPages - size && currentPage >= totalPages - (size - partSize)) ||  // Last 6 pages 
      (i <= (size + 1) && currentPage <= (size + 1 - partSize))  // First 6 pages
    )
  );

  const minShowingPage = showingPages[0];
  const maxShowingPage = showingPages[showingPages.length - 1];
  
  const paginationClassNames = [
    "pagination",
    "justify-content-"+justifyContent,
    buttonSize !== "md" ? "pagination-"+buttonSize : "",
    wrap ? "flex-wrap" : ""
  ];

  return (
    <nav>
      {totalPages > 0 && <ul className={paginationClassNames.join(" ")}>
        <li
          className={currentPage === 1 ? "page-item disabled" : "page-item"}
          onClick={() => { if (currentPage !== 1) onPageClick(1) }}>
          <button className="page-link" role="button" title="First" disabled={currentPage === 1}>
            &#x00AB;
          </button>
        </li>
        <li
          className={currentPage === 1 ? "page-item disabled" : "page-item"}
          onClick={() => { if (currentPage > 1) onPageClick(currentPage - 1) }}>
          <button className="page-link" role="button" title="Previous">
            &lsaquo;
          </button>
        </li>
        {minShowingPage > 1 && <li className="page-item disabled">
          <button className="page-link" role="button">...</button>
        </li>}
        {showingPages.map(i => {
          return <li
            className={i === currentPage ? "page-item active" : "page-item"}
            key={i}
            onClick={() => { if (i !== currentPage) onPageClick(i) }}>
            <button className="page-link" role="button">{i}</button>
          </li>
        })}
        {maxShowingPage < totalPages && <li className="page-item disabled">
          <button className="page-link" role="button">...</button>
        </li>}
        <li
          className={totalPages === currentPage ? "page-item disabled" : "page-item"}
          onClick={() => { if (currentPage < totalPages) onPageClick(currentPage + 1) }}>
          <button className="page-link" role="button" title="Next" disabled={totalPages === currentPage}>
            &rsaquo;
          </button>
        </li>
        <li
          className={totalPages === currentPage ? "page-item disabled" : "page-item"}
          onClick={() => { if (currentPage !== totalPages) onPageClick(totalPages) }}>
          <button className="page-link" role="button" title="Last" disabled={totalPages === currentPage}>
            &#x00BB;
          </button>
        </li>
      </ul>}
    </nav>
  )
}
