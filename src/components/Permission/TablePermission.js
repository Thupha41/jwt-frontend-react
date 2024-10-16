import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import ReactPaginate from "react-paginate";

import {
  deletePermission,
  fetchPermissionsWithPaginate,
  updatePermission,
} from "../../services/permissionService";
import { toast } from "react-toastify";
import ModalDelete from "../UserManagement/ModalDelete";
const TablePermission = forwardRef((props, ref) => {
  const [listPermissions, setListPermissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});
  useEffect(() => {
    fetchPermissions();
  }, [currentPage]);

  useImperativeHandle(ref, () => ({
    fetchChildListPermission() {
      fetchPermissions();
    },
  }));
  const fetchPermissions = async () => {
    let response = await fetchPermissionsWithPaginate(
      currentPage,
      currentLimit
    );
    if (response && +response.EC === 1) {
      setTotalPages(response.DT.totalPages);
      setListPermissions(response.DT.permissions);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const handleDeletePermission = (permission) => {
    setDataModal(permission);
    setIsShowModalDelete(true);
  };

  const confirmDeletePermission = async () => {
    let res = await deletePermission(dataModal);
    if (res && +res.EC === 1) {
      setIsShowModalDelete(false);
      toast.success(res.EM);
      await fetchPermissions();
      setIsShowModalDelete(false);
    } else {
      toast.error(res.EM);
    }
  };

  const handleEditPermission = async () => {
    // let res = await updatePermission();
  };
  return (
    <>
      {/* permission table content */}
      <div className="user-body">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id</th>
              <th scope="col">URL</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listPermissions && listPermissions.length > 0 ? (
              <>
                {listPermissions.map((permission, index) => {
                  return (
                    <tr key={`row-${index}`}>
                      <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                      <td>{permission.id}</td>
                      <td>{permission.url}</td>
                      <td>{permission.description}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            handleEditPermission(permission);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDeletePermission(permission.id);
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
                  <td colSpan={4}>Not found permission</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Permission pagination */}
      <div className="permission-footer">
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
      <ModalDelete
        title="Delete user"
        body="user"
        show={isShowModalDelete}
        dataModel={dataModal}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeletePermission}
      />
    </>
  );
});

export default TablePermission;
