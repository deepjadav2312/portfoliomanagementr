import React from "react";
import { ProjectDetailsListIndex } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";

function Search() {
  return (
    <div>
      <Banner/>
      <div className="container p-2">
        <ProjectDetailsListIndex/>
      </div>
    </div>
  )
}

export default Search;
