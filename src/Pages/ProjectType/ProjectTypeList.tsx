import React, { useState } from "react";
import {
  useDeleteProjectTypeMutation,
  useGetProjectTypesQuery,
} from "../../Apis/projectTypeApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { projectTypeModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

function ProjectTypeList() {
  const [deleteProjectType] = useDeleteProjectTypeMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetProjectTypesQuery({
    search: searchQuery,
    pageSize: pageSize,
    pageNumber: pageNumber,
  });
  const navigate = useNavigate();

  const debouncedSearch = debounce(() => refetch(), 300);

  const handleLanguageDelete = async (id: number) => {
    toast.promise(
      deleteProjectType(id),
      {
        pending: "Processing your request...",
        success: "ProjectType Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setPageNumber(1);
    debouncedSearch();
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && !isError && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">ProjectType List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/projectType/projectTypeupsert")}
            >
              Add New ProjectType
            </button>
          </div>
          <div className="row border p-2">
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button className="btn btn-success" onClick={debouncedSearch}>
                Search
              </button>
            </div>
          </div>
          <br />

          <div className="">
            <div className="row border">
              <div className="col-4">ProjectType Name</div>
              <div className="col-2">Is Active</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((projectType: projectTypeModel) => (
              <div className="row border" key={projectType.id}>
                <div className="col-4">{projectType.projectTypes}</div>
                <div className="col-2">{projectType.isActive?.toString()}</div>
                <div className="col-4">
                  <button className="btn btn-success">
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() =>
                        navigate("/projectType/projectTypeupsert/" + projectType.id)
                      }
                    ></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleLanguageDelete(projectType.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="pagination">
              <button
                className="btn btn-link"
                disabled={pageNumber === 1}
                onClick={() => setPageNumber((prev) => prev - 1)}
              >
                Previous
              </button>
              <span> Page {pageNumber} </span>
              <button
                className="btn btn-link"
                disabled={data.result.length < pageSize}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ProjectTypeList;
