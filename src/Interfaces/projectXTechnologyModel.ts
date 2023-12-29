import technologyModel from "./technologyModel";
import projectDetailsModel from "./projectDetailsModel";

export default interface projectXTechnologyModel {
  id: number;
  projectDetailsId?: number;
  projectDetails?: projectDetailsModel;
  technologyId?: number;
  technology?: technologyModel;
  }