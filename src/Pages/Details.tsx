import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../Helper";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProjectDetailsMutation,
  useGetProjectDetailssQuery,
  useGetProjectDetailsByIdQuery,
} from "../Apis/projectDetailsApi";
import { useGetProjectXProjectTypeByProjectDetailsIdQuery } from "../Apis/projectXProjectTypeApi";
import { useGetProjectXTechnologyByProjectDetailsIdQuery } from "../Apis/projectXTechnologyApi";


import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import {
  projectDetailsModel,
  projectXTechnologyModel,
  projectXProjectTypeModel,
} from "../Interfaces";
import { json } from "stream/consumers";

function Details() {
  debugger;
  const { id } = useParams();
  const navigate = useNavigate();
  function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: projectDetailsData } = useGetProjectDetailsByIdQuery(id);
    const { data: projectXTechnology } = useGetProjectXProjectTypeByProjectDetailsIdQuery(id);
    const { data: projectXProjectType } = useGetProjectXTechnologyByProjectDetailsIdQuery(id);
    const [showFullDescription, setShowFullDescription] = useState(false);

    function toggleDescription() {
      setShowFullDescription((prev) => !prev);
    }

    return (
      <>
        <div className="hoteld shadow border-0 mt-4 mb-4">
          <div className="hoteld-header bg-secondary bg-gradient text-light py-4">
            <div className="row">
              <div className="col-12 text-center">
                <h3 className="text-white text-uppercase">
                  {projectDetailsData?.result.projectName}
                </h3>
              </div>
            </div>
          </div>
          <div className=" d-flex justify-content-end">
            <a
              onClick={() => navigate("/Home")}
              className="btn btn-secondary mt-3"
            >
              Back to Home
            </a>
          </div>
          <div className="hoteld-body  px-3">
            <div className="py-3">
              <div className="row">
                <div className="col-12 col-lg-4 text-center mb-3"></div>
                <div className="col-12 col-lg-6  offset-lg-1">
                  <div className="col-12 col-md-6 pb-4">
                    <span className="badge">{projectDetailsData?.result.projectName}</span>
                  </div>
                  <div className="">
                    <span className="text-dark text-opacity-50">
                      Client Name :-
                    </span>
                    <span className="text-dark">
                      {projectDetailsData?.result.clientName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className=" text-dark text-uppercase">
                <h4>{projectDetailsData?.result.projectName}Project Type</h4>
              </div>
            </div>
            {projectXProjectType?.result?.map((ProjectType: projectXProjectTypeModel) => {
              return (
                <div className="row border" key={ProjectType.id}>
                  <div className="col-2">{ProjectType.projectType?.projectTypes}</div>
                </div>
              );
            })}
            <div className="">
              <div className=" text-dark text-uppercase">
                <h4>{projectDetailsData?.result.projectName} Technology</h4>
              </div>
            </div>
            {projectXTechnology?.result?.map((Technology: projectXTechnologyModel) => {
              return (
                <div className="row border" key={Technology.id}>
                  <div className="col-2">{Technology.technology?.technologyName}</div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Details;
