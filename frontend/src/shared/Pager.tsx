import * as React from "react";
import { Link } from "react-router-dom";

function constructUrl(url: string, page: number, perPage: number) {
  let queryStrings = [];
  if (page > 1) {
    queryStrings.push(`page=${page}`);
  }
  if (perPage !== 10) {
    queryStrings.push(`perPage=${perPage}`);
  }

  if (queryStrings.length > 0) {
    if (url?.includes("?")) {
      return `${url}&${queryStrings.join("&")}`;
    } else {
      return `${url}?${queryStrings.join("&")}`;
    }
  }
  return url;
}

function enumerate(page: number, lastPage: number, maxCount: number): number[] {
  const half = Math.floor(maxCount / 2);
  const to =
    page > half
      ? Math.min(page + half, lastPage)
      : Math.min(maxCount, lastPage);
  const from = Math.max(to - maxCount + 1, 1);
  const pages = [] as number[];
  for (let i = from; i <= to; i++) {
    pages.push(i);
  }
  console.log(pages);
  return pages;
}

export type PagerProps = {
  url: string;
  totalCount: number;
  page: number;
  perPage: number;
};

export const Pager = (props: PagerProps) => {
  const { url, totalCount, page: currentPage, perPage } = props;
  const { lastPage, prev, next } = React.useMemo(() => {
    const lastPage =
      totalCount % perPage === 0
        ? totalCount / perPage
        : Math.ceil(totalCount / perPage);
    return {
      lastPage,
      prev: currentPage > 1,
      next: currentPage < lastPage,
    };
  }, [totalCount, currentPage, perPage]);
  return (
    <nav>
      <ul className="pagination">
        {prev ? (
          <>
            <li className="page-item">
              <Link
                className="page-link"
                to={constructUrl(url, 1, perPage)}
                title="最初のページ"
              >
                &lt;&lt;
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link"
                to={constructUrl(url, currentPage - 1, perPage)}
                title="前のページ"
              >
                &lt;
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="page-item disabled">
              <span className="page-link">&lt;&lt;</span>
            </li>
            <li className="page-item disabled">
              <span className="page-link">&lt;</span>
            </li>
          </>
        )}
        {enumerate(currentPage, lastPage, 10).map((page) => {
          return page === currentPage ? (
            <li className="page-item active" key={page}>
              <Link
                className="page-link"
                to={constructUrl(url, page, perPage)}
                title={`${page}ページ`}
              >
                {page}
              </Link>
            </li>
          ) : (
            <li className="page-item" key={page}>
              <Link
                className="page-link"
                to={constructUrl(url, page, perPage)}
                title={`${page}ページ`}
              >
                {page}
              </Link>
            </li>
          );
        })}
        {next ? (
          <>
            <li className="page-item">
              <Link
                className="page-link"
                to={constructUrl(url, currentPage + 1, perPage)}
                title="次のページ"
              >
                &gt;
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link"
                to={constructUrl(url, lastPage, perPage)}
                title="最後のページ"
              >
                &gt;&gt;
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="page-item disabled">
              <span className="page-link">&gt;</span>
            </li>
            <li className="page-item disabled">
              <span className="page-link">&gt;&gt;</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pager;
