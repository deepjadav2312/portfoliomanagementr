import React, { useEffect, useState } from "react";
import { ProjectDetailsIndex } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";
import { projectDetailsModel } from "../Interfaces";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const receivedRoles = ["Customer", "Admin", "Data Operator"]; 
  const [userRole, setUserRole] = useState(receivedRoles);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
      const decodedToken = parseJwt(token);
      setUserName(decodedToken.unique_name);
      setUserRole(decodedToken.role || []);
    } else {
      setLoggedIn(false);
      setUserName("");
      setUserRole([]);
    }
  }, []);

  const parseJwt = (token: any) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  return (
    <div>
      {(!userRole.includes("Data Operator")) && (!userRole.includes("Admin")) && (
        <div className="container p-2">
          {/* Assuming ProjectDetailsIndex expects a prop named projectDetails */}
          <ProjectDetailsIndex projectDetails={{ id: 1, projectName: 'Example Project' } as projectDetailsModel} />
        </div>
      )}
    </div>
  );
}

export default Home;
