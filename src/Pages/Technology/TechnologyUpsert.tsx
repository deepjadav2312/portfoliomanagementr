import React, { useEffect, useState } from "react";
import {
  useCreateTechnologyMutation,
  useGetTechnologyByIdQuery,
  useUpdateTechnologyMutation,
} from "../../Apis/technologyApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse } from "../../Interfaces";

const technologyData: { technologyName: string; version: string } = {
  technologyName: "",
  version: ""
};

function TechnologyUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [technologyInputs, setTechnologyInputs] = useState(technologyData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createTechnology] = useCreateTechnologyMutation();
  const [updateTechnology] = useUpdateTechnologyMutation();
  const { data } = useGetTechnologyByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        technologyName: data.result.technologyName,
        version: data.result.version,
        isActive: data.result.isActive,
      };
      setTechnologyInputs(tempData);
      setIsChecked(tempData.isActive);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update countryInputs with the new value of isActive
    setTechnologyInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleTechonologyInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, technologyInputs);
    setTechnologyInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("TechnologyName", technologyInputs.technologyName);
    formData.append("Version", technologyInputs.version);
    formData.append("IsActive", isChecked.toString());
    let response;
    try {
      let response: apiResponse;
      if (id) {
        //update
        formData.append("Id", id);
        response = await updateTechnology({ data: formData, id });

        if (response != null && response.data?.isSuccess) {
          toastNotify("Technology updated successfully", "success");
          navigate("/technology/technologylist");
          setLoading(true);
        } else {
          toastNotify("Invalid Technology Data", "error");
        }

      } else {
        //create
        response = await createTechnology(formData);
        if (response != null && response.data?.isSuccess) {
          toastNotify("Technology created successfully", "success");
          navigate("/technology/technologylist");
        } else {
          toastNotify("Invalid Technology Data", "error");
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
        {id ? "Edit Technology" : "Add Technology"}
      </h3>


      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <label htmlFor="text">Technology Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter technologyName"
              required
              name="technologyName"
              value={technologyInputs.technologyName}
              onChange={handleTechonologyInput}
            />

            <label htmlFor="text">Version</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter version"
              name="version"
              value={technologyInputs.version}
              onChange={handleTechonologyInput}
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
                  onClick={() => navigate("/technology/technologylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to TechnologyList
                </a>
              </div>
            </div>
          </div>

        </div>
      </form>


    </div>
  );
}

export default TechnologyUpsert;
