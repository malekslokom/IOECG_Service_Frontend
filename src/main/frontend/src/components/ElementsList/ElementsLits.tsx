import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import "./ElementLists.css";
interface ListProps {
  nameModule: string;
  columns: string[];
  elementsList: any[];
  onDelete: (index: number) => void;
  onShow: (index: number) => void;
}

const ElementsList: React.FC<ListProps> = ({
  nameModule,
  columns,
  elementsList,
  onShow,
  onDelete,
}) => {
  const elementsPerPage = 5; // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(0); // React Paginate utilise un index basé sur 0
  console.log(elementsList);
  const onPageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const paginatedElements = elementsList.slice(
    currentPage * elementsPerPage,
    (currentPage + 1) * elementsPerPage
  );

  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedElements.map((item, index) => (
              <tr key={index}>
                {nameModule == "analyse" && (
                  <>
                    <td>{item.nom}</td>
                    <td>{item.dateCreation}</td>
                    <td>{item.auteur}</td>
                    <td>{item.description}</td>
                    <td></td>
                  </>
                )}
                {nameModule == "projet" && (
                  <>
                    <td>{item.nom}</td>
                    <td>{item.dateCreation}</td>
                    <td>{item.auteur}</td>
                    <td>{item.version}</td>
                    <td>{item.type}</td>
                    <td></td>
                  </>
                )}
                {nameModule == "dataset" && (
                  <>
                    <td>{item.nom}</td>
                    <td>{item.dateCreation}</td>
                    <td>{item.auteur}</td>
                    <td>{item.description}</td>
                    <td>{item.type}</td>
                    <td></td>
                  </>
                )}

                {nameModule == "rapport" && (
                  <>
                    <td>{item.nom}</td>
                    <td>{item.dateCreation}</td>
                    <td>{item.auteur}</td>
                    <td>{item.models.join(", ")}</td>
                    <td>{item.datasets.join(", ")}</td>
                    <td></td>
                  </>
                )}

                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() =>
                      onShow(index + currentPage * elementsPerPage)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() =>
                      onDelete(index + currentPage * elementsPerPage)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        breakLabel={"..."}
        pageCount={Math.ceil(elementsList.length / elementsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={"pagination justify-content-end"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ElementsList;
