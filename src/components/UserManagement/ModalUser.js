import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllRoles } from "../../services/userServices";
import { toast } from "react-toastify";
const ModalUser = (props) => {
  const [userRoles, setUserRoles] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    let response = await fetchAllRoles();
    if (response && +response.data.EC === 1) {
      setUserRoles(response.data.DT);
    } else {
      toast.error(response.data.EM);
    }
  };
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-user"
        show={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>{props.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            {/* Email */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="red">*</span>):
              </label>
              <input className="form-control" type="email"></input>
            </div>

            {/* Phone */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>):
              </label>
              <input className="form-control" type="text"></input>
            </div>

            {/* Username */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Username (<span className="red">*</span>):
              </label>
              <input className="form-control" type="text"></input>
            </div>
            {/* Password */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password (<span className="red">*</span>):
              </label>
              <input className="form-control" type="password"></input>
            </div>
            {/* Sex */}
            <div className="col-12 col-sm-6 form-group">
              <label>Sex:</label>
              <select className="form-select">
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Role */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Role (<span className="red">*</span>):
              </label>
              <select className="form-select">
                {userRoles.length > 0 &&
                  userRoles.map((role, index) => {
                    return (
                      <option key={`role - ${index}`} value={role.id}>
                        {role.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* Address */}
            <div className="col-12 col-sm-12 form-group">
              <label>
                Address (<span className="red">*</span>):
              </label>
              <input className="form-control" type="text"></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
