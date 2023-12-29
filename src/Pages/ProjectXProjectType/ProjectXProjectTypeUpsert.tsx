import React, { useEffect, useState } from "react";
import { useGetProjectDetailsByIdQuery } from "../../Apis/projectDetailsApi";
import { useGetAllProjectTypesQuery } from "../../Apis/projectTypeApi";
import { useGetProjectXProjectTypeByProjectDetailsIdQuery, useCreateProjectXProjectTypeMutation } from "../../Apis/projectXProjectTypeApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function ProjectXProjectTypeUpsert() {
  debugger
  const { projectDetailsId  } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: projectDetailsData } = useGetProjectDetailsByIdQuery(projectDetailsId);
  const { data: projectTypeData } = useGetAllProjectTypesQuery(null);
  const { data: ProjectXProjectTypeData } = useGetProjectXProjectTypeByProjectDetailsIdQuery(projectDetailsId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedProjectDetailsIds, setSelectedProjectDetailsIds] = useState<string[]>([]);
  const [createProjectXProjectType] = useCreateProjectXProjectTypeMutation();

  
  useEffect(() => {
    if (projectTypeData) {
      const initialCheckedMap: Record<string, boolean> = {};
      ProjectXProjectTypeData?.result.forEach((item: any) => {
        initialCheckedMap[item.projectTypeId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedProjectDetailsIds(ProjectXProjectTypeData?.result.map((item: any) => item.projectTypeId) || []);
    }
  }, [projectTypeData, ProjectXProjectTypeData]);

  const handleOnChange = (projectTypeId: string) => {
    console.log('Before update - isCheckedMap:', isCheckedMap);
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [projectTypeId]: !prevMap[projectTypeId],
    }));
    console.log('After update - isCheckedMap:', isCheckedMap);
  
    setSelectedProjectDetailsIds((prevIds) => {
      if (prevIds.includes(projectTypeId)) {
        // If projectTypeId is already in the list, remove it
        return prevIds.filter((id) => id !== projectTypeId);
      } else {
        // If projectTypeId is not in the list, add it
        return [...prevIds, projectTypeId];
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    if (projectDetailsId) {
      formData.append("ProjectDetailsId", projectDetailsId);
      selectedProjectDetailsIds.forEach((projectTypeId) => {
        formData.append("SelectedProjectTypeIds", projectTypeId);
      });

      const response = await createProjectXProjectType(formData);
      if (response) {
        toastNotify("Project Type updated successfully", "success");
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
              <label>Select Project Type:</label>
              {projectTypeData?.result.map((projectType: any) => (
                <a key={projectType.id} className="form-check text-decoration:none">
                  <input
                    type="checkbox"
                    name="SelectedProjectTypeIds"
                    className="form-check-input"
                    id={`projectType-${projectType.id}`}
                    value={projectType.id}
                    checked={isCheckedMap[projectType.id] || false}
                    onChange={() => handleOnChange(projectType.id)}
                  />
               <label
  className="form-check-label"
  htmlFor={`projectType-${projectType.id}`}
>
  {projectType.projectTypes}
</label>
                </a>
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

export default ProjectXProjectTypeUpsert;




    // var data : any = {
    //   CompanyId : companyData?.result.id
    // };
    // selectedPayments.map((val,index) => {
    //   data[`PaymentId[${index}]`] = val
    // });
  
    // const data: any[] = selectedPayments.map((val, index) => ({
    //   CompanyId: companyData?.result.id,
    //   PaymentId: val,
    // }));
    // console.log(data);