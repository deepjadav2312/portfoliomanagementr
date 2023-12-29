import React, { useEffect, useState } from "react";
import {
  useCreateApplicationRoleMutation,
  useGetApplicationRoleByIdQuery,
  useUpdateApplicationRoleMutation,
} from "../../Apis/applicationRoleApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse } from "../../Interfaces";

const applicationRoleData: { name: string } = {
  name: "",
};

function ApplicationRoleUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicationRoleInputs, setApplicationRoleInputs] = useState(applicationRoleData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createCountry] = useCreateApplicationRoleMutation();
  const [updateCountry] = useUpdateApplicationRoleMutation();
  const { data } = useGetApplicationRoleByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
      };
      setApplicationRoleInputs(tempData);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setApplicationRoleInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleApplicationRoleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, applicationRoleInputs);
    setApplicationRoleInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("Name", applicationRoleInputs.name);

    try {
      let response: apiResponse;

      if (id) {
        formData.append("Id", id);
        alert(JSON.stringify(formData));
        response = await updateCountry({ data: formData, id });

        if (response != null && response.data?.isSuccess) {
          toastNotify("ApplicationRole updated successfully", "success");
          navigate("/applicationRole/applicationRolelist");
          setLoading(true);
        } else {
          toastNotify("Invalid Country Data", "error");
        }
      } else {
        response = await createCountry(formData);

        if (response != null && response.data?.isSuccess) {
          toastNotify("ApplicationRole created successfully", "success");
          navigate("/applicationRole/applicationRolelist");
        } else {
          toastNotify("Invalid Country Data", "error");
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
        {id ? "Edit Application Role" : "Add Application Role"}
      </h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={applicationRoleInputs.name}
              onChange={handleApplicationRoleInput}
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
                  onClick={() => navigate("/applicationRole/applicationRolelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to RoleList
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ApplicationRoleUpsert;
