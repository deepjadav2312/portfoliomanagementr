import React, { useState } from "react";
import { Footer, Header } from "../Components/Layout/index";
import { 
  ApplicationRoleList,
  ApplicationRoleUpsert,
  ApplicationUserList,
  ApplicationUserUpsert,
  Login,
    Register,
    ProjectDetailsList,ProjectDetailsUpsert,
    ProjectTypeList,ProjectTypeUpsert,
    ProjectXProjectTypeList,ProjectXProjectTypeUpsert,
    ProjectXTechnologyUpsert,
    TechnologyList,
    TechnologyUpsert,
    Search,
    Home,
    Details,

} from "../Pages";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//import jwt_decode from "jwt-decode";
// import { userModel } from "../Interfaces";
// import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";

 import { RootState } from "../Storage/Redux/store";

 function App() {
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />

          <Route path="/search/:search" element={<Search />} />

          {/* <Routh path="/details/:details" element={<Details />} > */}

         
          <Route path="/details/:id" element={<details />} />

          <Route path="/applicationRole/applicationRolelist" element={< ApplicationRoleList/>} />
          <Route path="/applicationRole/applicationRoleUpsert/:id" element={<ApplicationRoleUpsert />} />
          <Route path="/applicationRole/applicationRoleUpsert" element={<ApplicationRoleUpsert />} />


          <Route path="/applicationUser/applicationUserlist" element={< ApplicationUserList/>} />
          <Route path="/applicationUser/applicationUserUpsert/:userId" element={<ApplicationUserUpsert />} />
          <Route path="/applicationUser/applicationUserUpsert" element={<ApplicationUserUpsert />} />

          <Route path="/login" element={< Login/>} />
          <Route path="/register" element={< Register/>} />

          <Route path="/projectDetails/projectDetailsList" element={< ProjectDetailsList/>} />
          <Route path="/projectDetails/projectDetailsUpsert/:id" element={<ProjectDetailsUpsert />} />
          <Route path="/projectDetails/projectDetailsUpsert" element={<ProjectDetailsUpsert />} />

        
          <Route path="/projectType/projectTypeList" element={<ProjectTypeList />} />
          <Route path="/projectType/projectTypeUpsert/:id" element={<ProjectTypeUpsert />} />
          <Route path="/projectType/projectTypeUpsert" element={<ProjectTypeUpsert />} />

          <Route path="/technology/technologylist" element={<TechnologyList />} />
          <Route path="/technology/technologyUpsert/:id" element={<TechnologyUpsert />} />
          <Route path="/technology/technologyUpsert" element={<TechnologyUpsert />} />

          <Route path="/projectXProjectType/projectXProjectTypelist" element={< ProjectXProjectTypeList/>} />
          <Route path="/projectXProjectType/projectXProjectTypeUpsert/:projectDetailsId" element={<ProjectXProjectTypeUpsert />} />
          <Route path="/projectXProjectType/projectXProjectTypeUpsert" element={<ProjectXProjectTypeUpsert />} />
          
          <Route path="/projectXTechnology/projectXTechnologyUpsert/:projectDetailsId" element={<ProjectXTechnologyUpsert />} />
          <Route path="/projectXTechnology/projectXTechnologyUpsert" element={<ProjectXTechnologyUpsert />} />
          
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;



