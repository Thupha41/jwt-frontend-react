import React, { useEffect } from "react";
import "./Permission.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createNewPermission } from "../../services/permissionService";
const Permission = () => {
  const dataChildDefault = {
    url: "",
    description: "",
    isValidUrl: true,
  };

  const [listChilds, setListChilds] = useState({
    child: dataChildDefault,
  });
  const _listChilds = _.cloneDeep(listChilds);

  const handleOnChangeInput = (name, value, key) => {
    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewRowInput = () => {
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listChilds);
  };

  const handleDeleteRowInput = (key) => {
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let result = [];
    Object.entries(listChilds).map(([key, child]) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };
  const handleSave = async () => {
    console.log(listChilds);
    let invalidObj = Object.entries(listChilds).find(([key, child]) => {
      return child && !child.url;
    });
    console.log("check invalid", invalidObj);
    if (!invalidObj) {
      //call api
      let data = buildDataToPersist();
      let res = await createNewPermission(data);
      if (res && +res.EC === 1) {
        toast.success(res.EM);
      } else if (res && +res.EC !== 1) {
        toast.error(res.EM);
      }
    } else {
      toast.error("URL input must not be empty");
      const key = invalidObj[0];
      _listChilds[key]["isValidUrl"] = false;
      setListChilds(_listChilds);
    }
  };

  return (
    <div className="permission-container">
      <div className="container">
        <div className="mt-3">
          <div className="title-permission">
            <h4>Add a new permission</h4>
          </div>
          <div className="permission-parent">
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <div className="permission-child row" key={`child-${key}`}>
                  <div className={`col-sm-5 col-12 form-group ${key}`}>
                    <label>URL:</label>
                    <input
                      type="text"
                      className={`form-control ${
                        !child.isValidUrl ? "is-invalid" : ""
                      }`}
                      value={child.url}
                      onChange={(event) =>
                        handleOnChangeInput("url", event.target.value, key)
                      }
                    />
                  </div>
                  <div className="col-sm-5 col-12 form-group">
                    <label>Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={child.description}
                      onChange={(event) =>
                        handleOnChangeInput(
                          "description",
                          event.target.value,
                          key
                        )
                      }
                    />
                  </div>
                  <div className="col-sm-2 col-12 mt-4 pe-auto">
                    <button
                      className="btn btn-primary add"
                      onClick={() => {
                        handleAddNewRowInput();
                      }}
                    >
                      <FaPlusCircle />
                    </button>
                    {index >= 1 && (
                      <button
                        className="btn btn-danger del"
                        onClick={() => handleDeleteRowInput(key)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div>
              <button
                className="btn btn-success mt-4"
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permission;
