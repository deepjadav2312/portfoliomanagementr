import React, { useEffect, useState } from "react";
import {
  useCreateProjectTypeMutation,
  useGetProjectTypeByIdQuery,
  useUpdateProjectTypeMutation,
} from "../../Apis/projectTypeApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse } from "../../Interfaces";

const projectTypeData: { projectTypes: string } = {
  projectTypes: "",
};

function ProjectTypeUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [projectTypeInputs, setProjectTypeInputs] = useState(projectTypeData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createProjectType] = useCreateProjectTypeMutation();
  const [updateProjectType] = useUpdateProjectTypeMutation();
  const { data } = useGetProjectTypeByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        projectTypes: data.result.projectTypes,
        isActive: data.result.isActive,
      };
      setProjectTypeInputs(tempData);
      setIsChecked(tempData.isActive);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update countryInputs with the new value of isActive
    setProjectTypeInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleProjectTypeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, projectTypeInputs);
    setProjectTypeInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("ProjectTypes", projectTypeInputs.projectTypes);
    formData.append("IsActive", isChecked.toString());
    let response;
    try {
      let response: apiResponse;
      if (id) {
        //update
        formData.append("Id", id);
        response = await updateProjectType({ data: formData, id });

        if (response != null && response.data?.isSuccess) {
          toastNotify("ProjectType updated successfully", "success");
          navigate("/projectType/projectTypelist");
          setLoading(true);
        } else {
          toastNotify("Invalid ProjectType Data", "error");
        }

      } else {
        //create
        response = await createProjectType(formData);
        if (response != null && response.data?.isSuccess) {
          toastNotify("ProjectType created successfully", "success");
          navigate("/projectType/projectTypelist");
        } else {
          toastNotify("Invalid ProjectType Data", "error");
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
      <h3 className=" px-2 text-success">
        {id ? "Edit ProjectType" : "Add ProjectType"}
      </h3>


      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <label htmlFor="text">ProjectType Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter projectTypes"
              required
              name="projectTypes"
              value={projectTypeInputs.projectTypes}
              onChange={handleProjectTypeInput}
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
                  onClick={() => navigate("/projectType/projectTypelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to ProjectTypeList
                </a>
              </div>
            </div>
          </div>

        </div>
      </form>


    </div>
  );
}

export default ProjectTypeUpsert;
