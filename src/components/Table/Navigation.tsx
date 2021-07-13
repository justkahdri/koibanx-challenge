import React from "react";

type NavigationProps = {
  rowsPerPage: number;
  total: number;
  page: number;
  pages: number;
};

const Navigation = (props: NavigationProps) => {
  const near_pages = props.page
    ? [...Array(props.page + 3).keys()].map((indx) => indx + 1)
    : [];

  return (
    <div className="navigation">
      <span className="navigation-info">
        Mostrando {props.rowsPerPage} de {props.total} resultados
      </span>
      <div>
        {props.page !== 1 && (
          // Does not display on first page
          <a className="navigation-link" href={`#${props.page - 1}`}>
            Anterior
          </a>
        )}
        {near_pages.slice(Math.max(near_pages.length - 7, 0)).map((page) =>
          page !== props.page ? (
            <a key={page} href={`#${page}`} className="navigation-link">
              {page}
            </a>
          ) : (
            <span key={page} className="navigation-text">
              {page}
            </span>
          )
        )}
        {props.page !== props.pages && (
          // Does not display if is in the last page
          <a className="navigation-link" href={`#${props.page + 1}`}>
            Siguiente
          </a>
        )}
      </div>
    </div>
  );
};

export default Navigation;
