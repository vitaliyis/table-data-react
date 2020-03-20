import React from 'react'

const Pagination2 = (props) => {
  const {currentPage, numberPages, sizeChangePagination, setCurrentPage} = props

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {numberPages.map(item => {
          return currentPage === item
            ? <li className="page-item active" key={item}><span className="page-link">{item}</span></li>
            : item <= sizeChangePagination + 1//<= 5
                ? <li className="page-item" key={item}>
                <a className="page-link"
                   href="#"
                   onClick={() => setCurrentPage(item)}
                >{item}</a></li>
                : null
        })}
        <li className="page-item" key={numberPages.length - 2}><span className="page-link">...</span></li>
        <li className="page-item" key={numberPages.length - 1}>
          <a className="page-link"
             href="#"
             onClick={() => setCurrentPage(numberPages.length)}
          >{numberPages.length}</a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination2