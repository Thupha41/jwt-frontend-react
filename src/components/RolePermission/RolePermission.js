import "./RolePermission.scss";
import React, { useEffect, useState } from "react";
import { fetchAllRoles } from "../../services/userServices";
import { toast } from "react-toastify";
import {
  fetchAllPermissions,
  fetchPermissionByRole,
  assignPermissionsToRole,
} from "../../services/permissionService";

import _ from "lodash";
const RolePermission = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [selectRole, setSelectRole] = useState("");
  const [listPermissions, setListPermissions] = useState([]);
  const [assignPermissionByRole, setAssignPermissionByRole] = useState([]);
  useEffect(() => {
    getRoles();
    fetchPermissions();
    // getPermissionByRole();
  }, []);

  const fetchPermissions = async () => {
    let response = await fetchAllPermissions();
    console.log(response);
    if (response && +response.EC === 1) {
      setListPermissions(response.DT);
    }
  };
  const getRoles = async () => {
    let response = await fetchAllRoles();
    if (response && +response.EC === 1) {
      setUserRoles(response.DT);
    } else {
      toast.error(response.EM);
    }
  };

  const handleOnChangePermission = async (value) => {
    setSelectRole(value);
    if (value) {
      let response = await fetchPermissionByRole(value);
      if (response && +response.EC === 1) {
        let data = buildDataPermissionByRole(
          response.DT.Permissions,
          listPermissions
        );
        setAssignPermissionByRole(data);
      }
    }
  };

  const buildDataPermissionByRole = (rolePermission, allPermissions) => {
    let result = [];
    if (allPermissions && allPermissions.length > 0) {
      allPermissions.map((permission) => {
        let obj = {};
        obj.url = permission.url;
        obj.id = permission.id;
        obj.description = permission.description;
        obj.isAssigned = false;
        if (rolePermission && rolePermission.length > 0) {
          obj.isAssigned = rolePermission.some((item) => item.url === obj.url);
        }
        result.push(obj);
      });
    }
    return result;
  };

  const handleSelectPermission = (value) => {
    const _assignPermissionByRole = _.cloneDeep(assignPermissionByRole);
    let foundIndex = _assignPermissionByRole.findIndex(
      (item) => +item.id === +value
    );
    if (foundIndex > -1) {
      _assignPermissionByRole[foundIndex].isAssigned =
        !_assignPermissionByRole[foundIndex].isAssigned;
    }
    setAssignPermissionByRole(_assignPermissionByRole);
  };
  const buildDataToSave = () => {
    let result = {};
    const _assignPermissionByRole = _.cloneDeep(assignPermissionByRole);
    result.roleId = selectRole;
    let rolePermissions = _assignPermissionByRole.filter((item) => {
      return item.isAssigned === true;
    });

    let finalRolePermissions = rolePermissions.map((item) => {
      let final = { roleId: +selectRole, permissionId: +item.id };
      return final;
    });
    result.rolePermissions = finalRolePermissions;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    console.log("check data", data);
    let res = await assignPermissionsToRole(data);
    if (res && +res.EC === 1) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="assign-container">
      <div className="container">
        <div className="title mt-3">
          <h2>Role Permission</h2>
        </div>

        <div>
          <h4>Select role</h4>
        </div>
        <div className="assign-role-permission">
          <div className="col-12 col-sm-6 form-group">
            <label>
              Role (<span className="red">*</span>):
            </label>
            <select
              className="form-select"
              // value={userData.role}
              onChange={(event) => handleOnChangePermission(event.target.value)}
            >
              <option value="">Select role</option>
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
          <hr />

          {selectRole && (
            <div className="available-permission">
              <h5>Assign permission:</h5>
              {assignPermissionByRole &&
                assignPermissionByRole.length > 0 &&
                assignPermissionByRole.map((item, index) => {
                  return (
                    <div
                      className="form-check"
                      key={`list-permission-${index}`}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item.id}
                        id={`list-permission-${index}`}
                        checked={item.isAssigned}
                        onChange={(event) =>
                          handleSelectPermission(event.target.value)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`list-permission-${index}`}
                      >
                        {item.url}
                      </label>
                    </div>
                  );
                })}
              <div className="mt-3">
                <button
                  className="btn btn-warning"
                  onClick={() => handleSave()}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePermission;
