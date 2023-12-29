import React, { useEffect, useState } from "react";
import {
  useCreateProjectDetailsMutation,
  useGetProjectDetailsByIdQuery,
  useUpdateProjectDetailsMutation,
} from "../../Apis/projectDetailsApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse } from "../../Interfaces";

const projectDetailsData: {
  projectName: string; clientName: string; clientEmail: string; budgent: string;
  duration: string; startDate: number; endDate: number; isActive?: boolean;
} = {
  projectName: "",
  clientName: "",
  clientEmail: "",
  duration: "",
  budgent: "",
  startDate: 0,
  endDate: 0,
};

function ProjectDetailsUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectDetailsInputs, setProjectDetailsInputs] = useState(projectDetailsData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createProjectDetails] = useCreateProjectDetailsMutation();
  const [updateProjectDetails] = useUpdateProjectDetailsMutation();
  const { data } = useGetProjectDetailsByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        projectName: data.result.projectName,
        clientName: data.result.clientName,
        clientEmail: data.result.clientEmail,
        duration: data.result.duration,
        budgent: data.result.budgent,
        startDate: data.result.startDate,
        endDate: data.result.endDate,
        isActive: data.result.isActive,
      };
      setProjectDetailsInputs(tempData);
      setIsChecked(tempData.isActive);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setProjectDetailsInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleProjectDetailsInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, projectDetailsInputs);
    setProjectDetailsInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("ProjectName", projectDetailsInputs.projectName);
    formData.append("ClientName", projectDetailsInputs.clientName);
    formData.append("ClientEmail", projectDetailsInputs.clientEmail);
    formData.append("Duration", projectDetailsInputs.duration);
    formData.append("Budgent", projectDetailsInputs.budgent);
    formData.append("StartDate", projectDetailsInputs.startDate.toString());
    formData.append("EndDate", projectDetailsInputs.endDate.toString());
    formData.append("IsActive", isChecked.toString());

    try {
      let response: apiResponse;

      if (id) {
        formData.append("Id", id);
        alert(JSON.stringify(formData));
        response = await updateProjectDetails({ data: formData, id });

        if (response != null && response.data?.isSuccess) {
          toastNotify("ProjectDetails updated successfully", "success");
          navigate("/projectDetails/projectDetailslist");
          setLoading(true);
        } else {
          toastNotify("Invalid ProjectDetails Data", "error");
        }
      } else {
        response = await createProjectDetails(formData);

        if (response != null && response.data?.isSuccess) {
          toastNotify("ProjectDetails created successfully", "success");
          navigate("/projectDetails/projectDetailslist");
        } else {
          toastNotify("Invalid ProjectDetails Data", "error");
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      toastNotify("Error occurred", "error");
    }
    setLoading(false);
  };


  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">
        {id ? "Edit ProjectDetails" : "Add ProjectDetails"}
      </h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="projectName"
              value={projectDetailsInputs.projectName}
              onChange={handleProjectDetailsInput}
            />

            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="clientName"
              value={projectDetailsInputs.clientName}
              onChange={handleProjectDetailsInput}
            />

            <label htmlFor="clientEmail">Client Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="clientEmail"
              value={projectDetailsInputs.clientEmail}
              onChange={handleProjectDetailsInput}
            />

            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="duration"
              value={projectDetailsInputs.duration}
              onChange={handleProjectDetailsInput}
            />

            <label htmlFor="budgent">Budgent</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="budgent"
              value={projectDetailsInputs.budgent}
              onChange={handleProjectDetailsInput}
            />

            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="startDate"
              value={projectDetailsInputs.startDate}
              onChange={handleProjectDetailsInput}
            />

            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="endDate"
              value={projectDetailsInputs.endDate}
              onChange={handleProjectDetailsInput}
            />


            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              checked={isChecked}
              onChange={handleOnChange}
            />

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/projectDetails/projectDetailslist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to ProjectDetails
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProjectDetailsUpsert;
