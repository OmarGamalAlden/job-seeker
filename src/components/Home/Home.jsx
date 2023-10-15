import React from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";

export default function Home({ extractedData }) {
  return (
    <>
      {extractedData ? (
        <div className="container d-flex align-items-center error_page">
          <div className="row">
            <span className="fs-5">
              Wellcome to our platform,{" "}
              <span className="fw-bold">
                Sir {extractedData?.personal_infos?.name?.raw_name}
              </span>{" "}
            </span>
            {extractedData?.personal_infos?.self_summary ? (
              <p className="mt-3">
                <span className="fw-bold">Your-Summary :</span>{" "}
                {extractedData?.personal_infos?.self_summary}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
