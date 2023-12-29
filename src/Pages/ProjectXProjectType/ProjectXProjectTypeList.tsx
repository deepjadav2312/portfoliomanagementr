import React from "react";
import {
  useDeleteProjectXProjectTypeMutation,
  useGetProjectXProjectTypesQuery,
} from "../../Apis/projectXProjectTypeApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { projectXProjectTypeModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function ProjectXProjectTypeList() {

  const [deleteProjectXProjectType] = useDeleteProjectXProjectTypeMutation();
  const { data, isLoading } = useGetProjectXProjectTypesQuery(null);
  const navigate = useNavigate();

  const handleProjectXProjectTypeDelete = async (id: number) => {
    toast.promise(
      deleteProjectXProjectType(id),
      {
        pending: "Processing your request...",
        success: "ProjectXProjectType Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      },
    );
  };
  
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">ProjectXProjectType List</h1>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-2">Id</div>
              <div className="col-4">Project Name</div>
              <div className="col-4">ProjectType Name</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((companyXPayment: projectXProjectTypeModel) => {
              return (
                <div className="row border" key={companyXPayment.id}>
                  <div className="col-2">{companyXPayment.id}</div>
                  <div className="col-4">{companyXPayment.projectDetails?.projectName}</div>
                  <div className="col-4">{companyXPayment.projectType?.projectTypes}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleProjectXProjectTypeDelete(companyXPayment.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectXProjectTypeList;
