import React, { useState } from "react";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import "./ElementLists.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const elementsPerPage = 15; // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(0); // React Paginate utilise un index basé sur 0
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
              <tr
                key={
                  item.id_project ||
                  item.id_analysis ||
                  item.id_dataset ||
                  item.id_experience ||
                  item.id_rapport ||
                  index
                }
              >
                {nameModule == "analyse" && (
                  <>
                    <td>{item.name_analysis}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td>{item.created_by}</td>
                    <td>{item.description_analysis}</td>
                    <td></td>
                  </>
                )}
                {nameModule == "mesAnalyses" && (
                  <>
                    <td>{item.name_analysis}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td>{item.created_by}</td>
                    <td>{item.description_analysis}</td>
                    <td>{item.id_project}</td>
                    <td></td>
                  </>
                )}
                {nameModule == "projet" && (
                  <>
                    <td>{item.name_project}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td>{item.description_project}</td>
                    <td>{item.created_by}</td>
                    <td>{item.type_project}</td>
                    <td></td>
                  </>
                )}
                {nameModule == "dataset" && (
                  <>
                    <td>{item.name_dataset}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td>{item.description_dataset}</td>
                    <td>{item.study_name}</td>
                    <td>{item.source_name}</td>
                  </>
                )}

                {nameModule == "rapport" && (
                  <>
                    <td>{item.name_rapport}</td>
                    <td>{item.created_at}</td>
                    <td>{item.id_experience_rapport}</td>
                    <td></td>
                  </>
                )}

                {nameModule == "rapportAnalyse" && (
                  <>
                    <td>{item.name_rapport}</td>
                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                    <td></td>
                  </>
                )}

                {nameModule == "experience" && (
                  <>
                    <td>{item.name_experience}</td>
                    <td>{item.heure_lancement}</td>
                    <td>{item.heure_fin_prevu}</td>
                    <td>
                      {item.statut === "En cours" && (
                        <img
                          src="/assets/statut-en-cours.svg"
                          alt="Statut en cours"
                        />
                      )}
                      {item.statut === "Terminé" && (
                        <img
                          src="/assets/statut-termine.svg"
                          alt="Statut terminé"
                        />
                      )}
                    </td>
                    <td></td>
                  </>
                )}

                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() =>
                      onShow(
                        item.id_project ||
                          item.id_analysis ||
                          item.id_dataset ||
                          item.id_experience ||
                          item.id_rapport ||
                          index
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                  {/* <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() =>
                      onDelete(
                        item.id_project ||
                          item.id_analysis ||
                          item.id_dataset ||
                          item.id_experience ||
                          index
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />*/}

                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => {
                      let idToDelete;
                      switch (nameModule) {
                        case "analyse":
                          idToDelete = item.id_analysis;
                          break;
                        case "mesAnalyses":
                          idToDelete = item.id_analysis;
                          break;
                        case "projet":
                          idToDelete = item.id_project;
                          break;
                        case "dataset":
                          idToDelete = item.id_dataset;
                          break;
                        case "experience":
                          idToDelete = item.id_experience;
                          break;
                        case "rapport":
                          idToDelete = item.id_rapport;
                          break;
                        default:
                          console.error(
                            "Module type not recognized for deletion"
                          );
                          return;
                      }
                      onDelete(idToDelete);
                    }}
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
