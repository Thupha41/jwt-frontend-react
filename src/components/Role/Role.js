import React, { useEffect } from "react";
import "./Role.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
const Role = () => {
  const [listChilds, setListChilds] = useState({
    child: {
      url: "",
      description: "",
    },
  });
  const _listChilds = _.cloneDeep(listChilds);

  const handleOnChangeInput = (name, value, key) => {
    _listChilds[key][name] = value;
    setListChilds(_listChilds);
  };

  const handleAddNewRowInput = () => {
    _listChilds[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChilds(_listChilds);
  };

  const handleDeleteRowInput = (key) => {
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="mt-3">
          <div className="title-role">
            <h4>Add a new role</h4>
          </div>
          <div className="role-parent">
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <div className="role-child row" key={`child-${key}`}>
                  <div className={`col-sm-5 col-12 form-group ${key}`}>
                    <label>URL:</label>
                    <input
                      type="text"
                      className="form-control"
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
              <button className="btn btn-success mt-4">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
