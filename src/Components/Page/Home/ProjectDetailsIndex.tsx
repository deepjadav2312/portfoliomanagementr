import React from "react";
import { apiResponse, projectDetailsModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  projectDetails: projectDetailsModel;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function ProjectDetailsIndex(props: Props) {
  const navigate = useNavigate();
  // const userData: userModel = useSelector(
  //   (state: RootState) => state.userAuthStore
  // );

  return (
    <div className="col-lg-3 col-sm-6">
      <Link to={`/projectDetailsDetail/${props.projectDetails.id}`} className="text-decoration-none text-black">
        <div className="row p-2"> 
          <div className="col-12 p-1">
            <h5 className="fw-bold text-center  text-uppercase">
              {truncateText(props.projectDetails.projectName, 20)}
            </h5>

            <a>
              <img
                src="https://placehold.co/300x400/png"
                height="300px"
                width="400px"
                className="card-img-top rounded"
              />
              {/* } */}
            </a>

            <div className="card-body p-1">
              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">CientName:-</span>
                {/* @Company.Address.Substring(0, Math.Min(20, Company.Address.Length))... */}
                {props.projectDetails.clientName?.substring(0,Math.min(20, props.projectDetails.clientName.length))}
              </div>

              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">Duration:-</span>
                {props.projectDetails.duration}
              </div>

            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectDetailsIndex;
