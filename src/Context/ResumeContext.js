import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

export let resumeContext = createContext(0);

function ResumeContextProvider(props) {
  //state for extracted data form resume parser
  const [extractedData, setExtractedData] = useState(null);
  // proceessof extract data from user resume
  // this is an API called eden-ai using AI to process this operation..
  async function getInfoFromUserResume(resumeURL) {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/ocr/resume_parser",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzkwZTIwZTMtMTQ1ZC00NDQ1LTgxMWUtMmZjOGU4MWE3ZTNlIiwidHlwZSI6ImFwaV90b2tlbiJ9.Uh6x7UEn_PWMKNwgtLT7d8qzjhvVMw8-Tcz-7PRNUzQ",
      },
      data: {
        show_original_response: false,
        fallback_providers: "",
        providers: "affinda",
        file_url: `${resumeURL?.replace(/['"]+/g, "")}`,
      },
    };
    await axios
      .request(options)
      .then((response) => {
        // store extracted data into state!!
        const data = response.data.affinda;
        if (data.status == "success") {
          setExtractedData(data.extracted_data);
        } else {
          alert("fail to extract your data, please provide an pdf document");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <resumeContext.Provider value={{ extractedData, getInfoFromUserResume }}>
      {props.children}
    </resumeContext.Provider>
  );
}
export default ResumeContextProvider;
