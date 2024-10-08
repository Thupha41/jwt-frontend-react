import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllRoles, createNewUser } from "../../services/userServices";
import { toast } from "react-toastify";
import _ from "lodash";
const ModalUser = (props) => {
  const [userRoles, setUserRoles] = useState([]);

  const defaultUserData = {
    email: "",
    username: "",
    phone: "",
    address: "",
    sex: "",
    role: "",
    password: "",
  };

  const validInputDefault = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidAddress: true,
    isValidPassword: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [validateInput, setValidateInput] = useState(validInputDefault);
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    let response = await fetchAllRoles();
    if (response && +response.data.EC === 1) {
      setUserRoles(response.data.DT);
      if (response.data.DT && response.data.DT.length > 0) {
        let roles = response.data.DT;
        setUserData({ ...userData, role: roles[0].id });
      }
    } else {
      toast.error(response.data.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    const _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInput = () => {
    let newValidState = { ...validInputDefault };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    // Trim values
    const trimmedEmail = userData.email.trim();
    const trimmedPhone = userData.phone.trim();

    // Validate Email
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newValidState.isValidEmail = false;
      setValidateInput(newValidState);
      toast.error(
        trimmedEmail ? "Please enter a valid email!" : "Please enter email!"
      );
      return false;
    }

    // Validate Phone
    if (!trimmedPhone || !phoneRegex.test(trimmedPhone)) {
      newValidState.isValidPhone = false;
      setValidateInput(newValidState);
      toast.error(
        trimmedPhone
          ? "Please enter a valid phone number!"
          : "Please enter phone number!"
      );
      return false;
    }

    // Validate Username
    if (!userData.username) {
      newValidState.isValidUsername = false;
      setValidateInput(newValidState);
      toast.error("Please enter a username!");
      return false;
    }

    // Validate Password
    if (!userData.password || userData.password.length < 4) {
      newValidState.isValidPassword = false;
      setValidateInput(newValidState);
      toast.error(
        userData.password
          ? "Password must be longer than 3 characters!"
          : "Please enter a password!"
      );
      return false;
    }

    // Validate Role
    if (!userData.role) {
      newValidState.isValidRole = false;
      setValidateInput(newValidState);
      toast.error("Please select a role!");
      return false;
    }

    // Validate Sex
    if (!userData.sex) {
      newValidState.isValidSex = false;
      setValidateInput(newValidState);
      toast.error("Please select sex!");
      return false;
    }

    // Validate Address
    if (!userData.address) {
      newValidState.isValidAddress = false;
      setValidateInput(newValidState);
      toast.error("Please enter an address!");
      return false;
    }

    setValidateInput(newValidState);
    return true;
  };

  const handleCreateNewUser = async () => {
    if (checkValidateInput()) {
      try {
        let res = await createNewUser({ ...userData, roleId: userData.role });
        console.log(">>> check response", res);

        if (res.data && +res.data.EC === 1) {
          toast.success(res.data.EM);
          props.onHide();
          setUserData({ ...defaultUserData, role: userRoles[0]?.id });
        } else if (res.data && +res.data.EC === 0) {
          // Handle email or phone already exists
          toast.error(res.data.EM);
        } else {
          toast.error(res.data.EM);
        }
      } catch (error) {
        // Handle network or server errors
        if (error.response && error.response.data && error.response.data.EM) {
          // Display error message returned from the backend
          toast.error(error.response.data.EM);
        } else {
          // Display generic error message
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-user"
        show={props.isShowModalUser}
        onHide={props.onHide}
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
              <input
                className={`form-control ${
                  !validateInput.isValidEmail ? "is-invalid" : ""
                }`}
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "email")
                }
              />
            </div>

            {/* Phone */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>):
              </label>
              <input
                className={`form-control ${
                  !validateInput.isValidPhone ? "is-invalid" : ""
                }`}
                type="text"
                value={userData.phone}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "phone")
                }
              />
            </div>

            {/* Username */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Username (<span className="red">*</span>):
              </label>
              <input
                className={`form-control ${
                  !validateInput.isValidUsername ? "is-invalid" : ""
                }`}
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "username")
                }
              />
            </div>
            {/* Password */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password (<span className="red">*</span>):
              </label>
              <input
                className={`form-control ${
                  !validateInput.isValidPassword ? "is-invalid" : ""
                }`}
                type="password"
                value={userData.password}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "password")
                }
              />
            </div>
            {/* Sex */}
            <div className="col-12 col-sm-6 form-group">
              <label>Sex:</label>
              <select
                className={`form-select ${
                  !validateInput.isValidSex ? "is-invalid" : ""
                }`}
                value={userData.sex}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "sex")
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Role */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Role (<span className="red">*</span>):
              </label>
              <select
                className={`form-select ${
                  !validateInput.isValidRole ? "is-invalid" : ""
                }`}
                value={userData.role}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "role")
                }
              >
                {userRoles.length > 0 &&
                  userRoles.map((role, index) => {
                    return (
                      <option key={`role-${index}`} value={role.id}>
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
              <input
                className="form-control"
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "address")
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateNewUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
