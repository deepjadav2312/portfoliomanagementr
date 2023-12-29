// ProjectXTechnologyUpsert.tsx

import React, { useEffect, useState } from "react";
import { useGetProjectDetailsByIdQuery } from "../../Apis/projectDetailsApi";
import { useGetAllTechnologysQuery } from "../../Apis/technologyApi";
import {
  useGetProjectXTechnologyByProjectDetailsIdQuery,
  useCreateProjectXTechnologyMutation,
} from "../../Apis/projectXTechnologyApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function ProjectXTechnologyUpsert() {
  const { projectDetailsId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: projectDetailsData } = useGetProjectDetailsByIdQuery(projectDetailsId);
  const { data: technologyData } = useGetAllTechnologysQuery(null);
  const { data: projectXTechnologyData } = useGetProjectXTechnologyByProjectDetailsIdQuery(projectDetailsId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedProjectDetailsIds, setSelectedProjectDetailsIds] = useState<string[]>([]);
  const [createProjectXTechnology] = useCreateProjectXTechnologyMutation();

  useEffect(() => {
    if (technologyData) {
      const initialCheckedMap: Record<string, boolean> = {};
      projectXTechnologyData?.result.forEach((item: any) => {
        initialCheckedMap[item.technologyId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedProjectDetailsIds(projectXTechnologyData?.result.map((item: any) => item.technologyId) || []);
    }
  }, [technologyData, projectXTechnologyData]);

  const handleOnChange = (technologyId: string) => {
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [technologyId]: !prevMap[technologyId],
    }));

    setSelectedProjectDetailsIds((prevIds) => {
      if (prevIds.includes(technologyId)) {
        return prevIds.filter((id) => id !== technologyId);
      } else {
        return [...prevIds, technologyId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    if (projectDetailsId) {
      formData.append("ProjectDetailsId", projectDetailsId);
      selectedProjectDetailsIds.forEach((technologyId) => {
        formData.append("SelectedTechnologyIds", technologyId);
      });

      const response = await createProjectXTechnology(formData);
      if (response) {
        toastNotify("ProjectTechnology updated successfully", "success");
        setLoading(false);
        navigate("/projectDetails/projectDetailslist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success"> Edit Project For {projectDetailsData?.result.projectName}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="form-group">
              <label>Select Technology:</label>
              {technologyData?.result.map((technology: any) => (
                <div key={technology.id} className="form-check">
                  <input
                    type="checkbox"
                    name="SelectedTechnologyIds"
                    className="form-check-input"
                    id={`technology-${technology.id}`}
                    value={technology.id}
                    checked={isCheckedMap[technology.id] || false}
                    onChange={() => handleOnChange(technology.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`technology-${technology.id}`}
                  >
                    {technology.technologyName}
                  </label>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  onClick={() => navigate("/projectDetails/projectDetailslist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to ProjectDetailsList
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProjectXTechnologyUpsert;
