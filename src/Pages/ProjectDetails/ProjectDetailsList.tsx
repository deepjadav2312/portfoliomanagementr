import React, { useState, useRef, useCallback, useEffect } from "react";
import {
useDeleteProjectDetailsMutation,
useGetProjectDetailssQuery,
useGetProjectDetailsByLazyLoadingQuery
} from "../../Apis/projectDetailsApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { projectDetailsModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";


function ProjectDetailsList() {
  const [deleteProjectDetails] = useDeleteProjectDetailsMutation();
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch, isSuccess  } = useGetProjectDetailssQuery({
    search: searchQuery,
    pageSize: pageSize,
    pageNumber: pageNumber,
  });

  const [allProjectDetailss, setAllProjectDetailss] = useState<projectDetailsModel[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  const debouncedSearch = debounce(() => refetch(), 300);

  useEffect(() => {
    if (isSuccess) {
      if (data.result && data.result.length > 0) {
        // Check for duplicate data before appending
        const newCountries = data.result.filter((newCountry: any) => {
          return !allProjectDetailss.some((existingCountry) => existingCountry.id === newCountry.id);
        });

        setAllProjectDetailss((prevCountries) => [...prevCountries, ...newCountries]);
      } else {
        // No more data, set hasMore to false
        setHasMore(false);
      }
    }
  }, [data, isSuccess]);

  const handleProjectDetailsDelete = async (id: number) => {
    toast.promise(
      deleteProjectDetails(id),
      {
        pending: "Processing your request...",
        success: "Project Details Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      },
    );
  };

  const lastProjectDetailsRef = useCallback(
    (node: any) => {
      if (isLoading || !isSuccess || isFetching || !node) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      observer.current.observe(node);
    },
    [isLoading, isSuccess, isFetching]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setPageNumber(1);
    debouncedSearch();
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setPageNumber(1); // Reset to the first page when page size changes
    debouncedSearch();
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">ProjectDetails List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/projectDetails/projectDetailsupsert")}
            >
              Add New ProjectDetails
            </button>
          </div>

          <div className="row border p-2">
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-2">
              <button className="btn btn-primary" onClick={debouncedSearch}>
                Search
              </button>
            </div>
            <div className="col-1">
              <label htmlFor="pageSize">Page Size:</label>
              <select
                id="pageSize"
                className="form-control"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>

          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-2">Project Name</div>
              <div className="col-2">Client Name</div>
              <div className="col-2">ProjectType</div>
              <div className="col-2">Technology</div>
              <div className="col-1">IsActive</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((state: projectDetailsModel) => {
              return (
                <div className="row border" key={state.id}>
                  <div className="col-1">{state.id}</div>
                  <div className="col-2">{state.projectName}</div>
                  <div className="col-2">{state.clientName}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(
                          "/projectXProjectType/projectXProjectTypeupsert/" + state.id
                        )
                      }
                    >
                      <i className="bi bi-pencil-fill"></i>Edit ProjectType
                    </button>
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(
                          "/projectXTechnology/projectXTechnologyupsert/" + state.id
                        )
                      }
                    >
                      <i className="bi bi-pencil-fill"></i>Edit Technology
                    </button>
                  </div>

                  <div className="col-1">{state.isActive?.toString()}</div>
                  <div className="col-2">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/projectDetails/projectDetailsupsert/" + state.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleProjectDetailsDelete(state.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}

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

export default ProjectDetailsList;
