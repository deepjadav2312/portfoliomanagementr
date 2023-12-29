import React, { useState, useEffect } from "react";
import { useGetProjectDetailsByLazyLoadingQuery } from "../../../Apis/projectDetailsApi";
import { projectDetailsModel } from "../../../Interfaces";
import { MainLoader } from "../Common";
import { useParams } from "react-router-dom";
import ProjectDetailsIndex from "./ProjectDetailsIndex";

function ProjectDetailsListSearchIndex() {
  const { search } = useParams();
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allProjectDetailss, setAllProjectDetailss] = useState<projectDetailsModel[]>([]);
  const { data, isLoading } = useGetProjectDetailsByLazyLoadingQuery({
    pageNum,
    search: search || "",
  });

  useEffect(() => {
    if (!isLoading && data && data.result) {
      setAllProjectDetailss((prevProjectDetails) => [...prevProjectDetails, ...data.result]);
      setLoading(false);
    }
  }, [isLoading, data]);

  const handleScroll = () => {
    if (!loading && data && data.result && data.result.length > 0) {
      const isReachedScrollEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isReachedScrollEnd) {
        setLoading(true);
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, data]);

  useEffect(() => {
    // Reset the state when the search term changes
    setAllProjectDetailss([]);
    setPageNum(0);
  }, [search]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center"></ul>
      </div>

      {allProjectDetailss.length > 0 &&
        allProjectDetailss.map((projectDetails: projectDetailsModel, index: number) => (
          <ProjectDetailsIndex projectDetails={projectDetails} key={index} />
        ))}

      {loading && <MainLoader />}
      {loading && data && data.result && data.result.length === 0 && (
        <p>No more companys to load</p>
      )}
    </div>
  );
}

export default ProjectDetailsListSearchIndex;
