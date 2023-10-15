import React from "react";

export default function Profile({ extractedData }) {
  console.log(extractedData);
  return (
    <>
      <div className="container py-5">
        <div className="row">
          <p className="text-center fw-bold mb-4">
            Hello, {extractedData?.personal_infos?.name?.raw_name}
          </p>
          <h4>Your Informatiom:</h4>
          <div className="d-flex align-items-center justify-content-between flex-wrap ms-4">
            <span className="my-3">
              <span className="fw-bold">Email:</span>{" "}
              {extractedData?.personal_infos?.mails[0]}
            </span>
            <span className="my-3">
              <span className="fw-bold">Phone:</span>{" "}
              {extractedData?.personal_infos?.phones[0]}
            </span>
            <span className="my-3">
              <span className="fw-bold">Country:</span>{" "}
              {extractedData?.personal_infos?.address?.country_code},{" "}
              {extractedData?.personal_infos?.address?.raw_input_location}
            </span>
            <span className="my-3">
              <span className="fw-bold">Your Accouts:</span>{" "}
              {extractedData?.personal_infos?.urls.map((url, index) => (
                <span key={index}>{url},</span>
              ))}
            </span>
          </div>
          <h4 className="mt-3">Your Skills:</h4>
          <div className="d-flex align-items-center flex-wrap ms-4">
            {extractedData?.skills.map((skill, index) => (
              <span key={index} className="my-3 me-3 fw-1">
                {skill.name},
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
