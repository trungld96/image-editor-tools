import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import MdFileUpload from "@meronex/icons/md/MdFileUpload";
import { useState } from "react";
import { Button } from "@blueprintjs/core";

export const UploadJsonPanel = observer(({ store }) => {
  //   const [files, setFiles] = useState("");
  const [isUploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setUploading(true);
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      //   setFiles(e.target.result);
      store.loadJSON(JSON.parse(e.target.result));
      store.waitLoading();
    };
    setUploading(false);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <label htmlFor="input-json">
        <Button
          icon="upload"
          style={{ width: "100%" }}
          onClick={() => {
            document.querySelector("#input-json")?.click();
          }}
          loading={isUploading}
        >
          Upload template json
        </Button>
        <input
          type="file"
          id="input-json"
          style={{ display: "none" }}
          onChange={handleChange}
          multiple
        />
      </label>
    </div>
  );
});
// define the new custom section
export const CustomUploadJson = {
  name: "Upload template json",
  Tab: (props) => (
    <SectionTab name="Upload template json" {...props}>
      <MdFileUpload />
    </SectionTab>
  ),
  Panel: UploadJsonPanel,
};
