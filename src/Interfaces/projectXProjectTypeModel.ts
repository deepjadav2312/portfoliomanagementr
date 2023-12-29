import projectTypeModel from "./projectTypeModel";
import projectDetailsModel from "./projectDetailsModel";

export default interface projectXProjectTypeModel {
  id: number;
  projectDetailsId?: number;
  projectDetails?: projectDetailsModel;
  projectTypeId?: number;
  projectType?: projectTypeModel;
  }