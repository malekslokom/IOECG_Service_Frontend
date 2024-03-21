// import React from 'react';

import './ModelModal.css';

// interface ModelModalProps {
//   model: Model;
//   onClose: () => void;
// }

// const ModelModal: React.FC<ModelModalProps> = ({ model, onClose }) => {
//   console.log("HERE")
//   console.log(model)
//   return (
//     <div className="bg-primary">
//     <div className="modal fade bg-primary" id="exampleModal" tabIndex={-999} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="exampleModalLabel">{model.name}</h5>
//             <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <div className="modal-section">
//               <p className="modal-section-title">Informations sur le modèle</p>
//               <div className="section-box">
//                 <div className="d-flex justify-content-between">
//                   <div className="input-group mb-3">
//                     <span className="input-group-text">Auteur</span>
//                     <input type="text" className="form-control" value={model.author} readOnly />
//                   </div>
//                   <div className="input-group mb-3">
//                     <span className="input-group-text">Nom de projet</span>
//                     <input type="text" className="form-control" value={model.projectName} readOnly />
//                   </div>
//                 </div>
//                 {/* <textarea className="form-control" rows={4} readOnly>{model.description}</textarea> */}
//               </div>
//             </div>
//             <div className="modal-section">
//               <p className="modal-section-title">Architecture</p>
//               <div className="section-box">
//                 <div className="d-flex justify-content-between">
//                   <div className="input-group mb-3">
//                     <span className="input-group-text">Nom</span>
//                     <input type="text" className="form-control" value={model.architectureName} readOnly />
//                   </div>
//                   <div className="input-group mb-3">
//                     <span className="input-group-text">Version</span>
//                     <input type="text" className="form-control" value={model.architectureVersion} readOnly />
//                   </div>
//                 </div>
//                 {/* <textarea className="form-control" rows={4} readOnly>{model.architectureDescription}</textarea> */}
//               </div>
//             </div>

//             <div className="modal-section">
//               <p className="modal-section-title">Informations Additionnelles</p>
//               <div className="section-box">
//                 <div className="d-flex flex-wrap gap-2 justify-content-between mb-4">
//                   <div>
//                     <h4 className="tag-title">Total des Paramètres</h4>
//                     <span className="badge bg-secondary">{model.totalParams}</span>
//                   </div>
//                   <div>
//                     <h4 className="tag-title">Taille du Modèle</h4>
//                     <span className="badge bg-secondary">{model.modelSize}</span>
//                   </div>
//                   <div>
//                     <h4 className="tag-title">Taille du Batch</h4>
//                     <span className="badge bg-secondary">{model.hyperparameters.batchSize}</span>
//                   </div>
//                 </div>
//                 <div className="d-flex flex-wrap gap-2 justify-content-between">
//                   <div>
//                     <h4 className="tag-title">Taux d'Apprentissage</h4>
//                     <span className="badge bg-secondary">{model.hyperparameters.learningRate}</span>
//                   </div>
//                   <div>
//                     <h4 className="tag-title">Nature de la Tâche</h4>
//                     <span className="badge bg-secondary">{model.taskNature}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//           <div className="modal-footer">
//             <button type="button" className="custom-button" data-dismiss="modal" onClick={onClose}>Fermer</button>
//           </div>
//         </div>
//       </div>
//     </div>

// <h1>HERE</h1>
// <h1>HERE</h1>
// <h1>HERE</h1>
//     </div>
//   );
// }

// export default ModelModal;
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ModelModalProps {
  model: Model;
  onClose: () => void;
}

const ModelModal: React.FC<ModelModalProps> = ({ model, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{model.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-section">
          <p className="modal-section-title">Informations sur le modèle</p>
          <div className="section-box">
            <div className="d-flex justify-content-between">
              <div className="input-group mb-3">
                <span className="input-group-text">Auteur</span>
                <input type="text" className="form-control" value={model.author} readOnly />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nom de projet</span>
                <input type="text" className="form-control" value={model.project_name} readOnly />
              </div>
            </div>
            <textarea className="form-control" rows={4} readOnly value={model.description}/> 
          </div>
        </div>
        <div className="modal-section">
          <p className="modal-section-title">Architecture</p>
          <div className="section-box">
            <div className="d-flex justify-content-between">
              <div className="input-group mb-3">
                <span className="input-group-text">Nom</span>
                <input type="text" className="form-control" value={model.architecture_name} readOnly />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Version</span>
                <input type="text" className="form-control" value={model.architecture_version} readOnly />
              </div>
            </div>
            <textarea className="form-control" rows={4} readOnly value={model.architecture_description}/>
          </div>
        </div>
        <div className="modal-section">
          <p className="modal-section-title">Informations Additionnelles</p>
          <div className="section-box">
            <div className="d-flex flex-wrap gap-2 justify-content-between mb-4">
              <div>
                <h6 className="tag-title">Total des Paramètres</h6>
                <span className="badge bg-secondary">{model.total_params}</span>
              </div>
              <div>
                <h6 className="tag-title">Taille du Modèle</h6>
                <span className="badge bg-secondary">{model.model_size}</span>
              </div>
              <div>
                <h6 className="tag-title">Taille du Batch</h6>
                <span className="badge bg-secondary">{model.batch_size}</span>
              </div>
            </div>
            <div className="d-flex flex-wrap gap-2 justify-content-between">
              <div>
                <h6 className="tag-title">Taux d'Apprentissage</h6>
                <span className="badge bg-secondary">{model.learning_rate}</span>
              </div>
              <div>
                <h6 className="tag-title">Nature de la Tâche</h6>
                <span className="badge bg-secondary">{model.task_nature}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className='custom-button' onClick={onClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModelModal;

