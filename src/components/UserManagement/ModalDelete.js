import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDelete = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete this {props.body}{" "}
          {props.dataModel.email ? props.dataModel.email : props.dataModel.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
