import React, { useState, useEffect } from "react";
import "./Users.scss";
import { fetchAllUsers, deleteUser } from "../../services/userServices";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
const Users = () => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModel, setDataModel] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit);
    if (response && response.data && +response.data.EC === 1) {
      setTotalPages(response.data.DT.totalPages);
      setListUsers(response.data.DT.users);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModel({});
  };

  const handleDeleteUser = (user) => {
    setDataModel(user);
    setIsShowModalDelete(true);
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModel);
    if (response && +response.data.EC === 1) {
      toast.success(response.data.EM);
      await fetchUsers();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.data.EM);
    }
  };
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title">
              <h3>Table Users</h3>
            </div>
            <div className="action">
              <button className="btn btn-success">Refresh</button>
              <button className="btn btn-primary">Add new user</button>
            </div>
          </div>
          {/* User table content */}
          <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((user, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>{index + 1}</td>
                          <td>{user.id}</td>
                          <td>{user.email}</td>
                          <td>{user.username}</td>
                          <td>{user.Role ? user.Role.name : ""}</td>
                          <td>
                            <button className="btn btn-info" href="/">
                              Edit
                            </button>
                            {/* <form method="post" action=""> */}
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteUser(user.id);
                              }}
                            >
                              Delete
                            </button>
                            {/* </form> */}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not found user</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* User pagination */}
          <div className="user-footer">
            {totalPages > 0 && (
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModel={dataModel}
      />
    </>
  );
};

export default Users;
