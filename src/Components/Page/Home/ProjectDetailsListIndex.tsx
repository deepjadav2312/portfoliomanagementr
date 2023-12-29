import React, { useState, useEffect } from "react";
import { useGetProjectDetailsByLazyLoadingQuery } from "../../../Apis/projectDetailsApi";
import { projectDetailsModel } from "../../../Interfaces";
import ProjectDetailsIndex from "./ProjectDetailsIndex";
import { useDispatch } from "react-redux";
import { setProjectDetails } from "../../../Storage/Redux/projectDetailsSlice";
import { MainLoader,MiniLoader } from "../Common";

function ProjectDetailsListIndex() {
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allProjectDetailss, setAllProjectDetailss] = useState<projectDetailsModel[]>([]);

  const dispatch = useDispatch();
  const search = "";

  const { data, isLoading } = useGetProjectDetailsByLazyLoadingQuery({
    pageNum,
    search: search || "",
  });

  useEffect(() => {
    if (!isLoading && data && data.result) {
      setAllProjectDetailss((prevProjectDetails) => [...prevProjectDetails, ...data.result]);
      setLoading(false);
      setHasMore(data.result.length > 0);
    }
  }, [isLoading, data]);

  const handleScroll = () => {
    if (!loading && hasMore) {
      const isReachedScrollEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

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
  }, [loading, hasMore]);

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
      {!loading && !hasMore && <p>No more projectDetails to load</p>}
    </div>
  );
}

export default ProjectDetailsListIndex;



