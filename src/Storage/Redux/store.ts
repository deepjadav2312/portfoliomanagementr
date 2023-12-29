import { configureStore } from "@reduxjs/toolkit";
import { applicationRoleReducer } from "./applicationRoleSlice";
import { applicationUserReducer } from "./applicationUserSlice";
import { applicationUserRoleReducer } from "./applicationUserRoleSlice";
import { userAuthReducer } from "./userAuthSlice";
import { userloginReducer } from "./userloginSlice";
import { projectDetailsReducer } from "./projectDetailsSlice";
import { projectTypeReducer } from "./projectTypeSlice";
import { projectXProjectTypeReducer } from "./projectXProjectTypeSlice";
import { projectXTechnologyReducer } from "./projectXTechnologySlice";
import { technologyReducer } from "./technologySlice";

import {
  applicationRoleApi,
  applicationUserApi,
  applicationUserRoleApi,
  usersApi,
  projectDetailsApi,
  projectTypeApi,
  projectXProjectTypeApi,
  projectXTechnologyApi,
  technologyApi
} from "../../Apis";

const store = configureStore({
  reducer: {
    applicationRoleStore : applicationRoleReducer,
    applicationUserStore : applicationUserReducer,
    applicationUserRoleStore : applicationUserRoleReducer,
    userAuthStore : userAuthReducer,
    userloginStore : userloginReducer,
    projectDetailsStore : projectDetailsReducer,
    projectTypeStore : projectTypeReducer,
    projectXProjectTypeStore : projectXProjectTypeReducer,
    projectXTechnologyStore :projectXTechnologyReducer,
    technologyStore : technologyReducer,
    [applicationRoleApi.reducerPath] : applicationRoleApi.reducer,
    [applicationUserApi.reducerPath] : applicationUserApi.reducer,
    [applicationUserRoleApi.reducerPath] : applicationUserRoleApi.reducer,
    [usersApi.reducerPath] : usersApi.reducer,
    [projectDetailsApi.reducerPath] : projectDetailsApi.reducer,
    [projectTypeApi.reducerPath] : projectTypeApi.reducer,
    [projectXProjectTypeApi.reducerPath] : projectXProjectTypeApi.reducer,
    [projectXTechnologyApi.reducerPath] : projectXTechnologyApi.reducer,
    [technologyApi.reducerPath] : technologyApi.reducer,
   },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(applicationRoleApi.middleware)
      .concat(applicationUserApi.middleware)
      .concat(applicationUserRoleApi.middleware)
      .concat(usersApi.middleware)
      .concat(projectDetailsApi.middleware)
      .concat(projectTypeApi.middleware)
      .concat(projectXProjectTypeApi.middleware)
      .concat(projectXTechnologyApi.middleware)
      .concat(technologyApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
