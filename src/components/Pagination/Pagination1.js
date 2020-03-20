import React from 'react'

const Pagination1 = (props) => {
  const {currentPage, numberPages, setCurrentPage} = props


  return (
    <nav aria-label="...">
      <ul className="pagination">
        {numberPages.map(item => {
          return currentPage === item
            ? <li className="page-item active" key={item}><span className="page-link">{item}</span></li>
            : <li className="page-item" key={item}>
              <a className="page-link"
                 href="#"
                 onClick={() => setCurrentPage(item)}
              >{item}
              </a>
            </li>
        })}
      </ul>
    </nav>
  )
}

export default Pagination1