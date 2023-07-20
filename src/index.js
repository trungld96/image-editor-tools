import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { DEFAULT_SECTIONS, SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { DownloadButton } from "polotno/toolbar/download-button";
import { Button } from "@blueprintjs/core";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import { createStore } from "polotno/model/store";

import tJson from "../src/assets/json/template.json";

import tJson2 from "../src/assets/json/template2.json";
import { CustomUploadJson, UploadJsonPanel } from "./component/UploadJsonPanel";

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T", // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
const ActionControls = ({ store }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  return (
    <div>
      <DownloadButton store={store} />
      <Button
        intent="primary"
        onClick={() => {
          console.log("save");
          if (isDownloading) return;
          setIsDownloading(true);
          const json = store.toJSON();

          console.log("save", json);
          const jsonTemplate = JSON.stringify(json);
          const blob = new Blob([jsonTemplate], { type: "application/json" });

          // Create a download link
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = "template.json";
          // Trigger the download
          downloadLink.click();
          setTimeout(() => {
            setIsDownloading(false);
          }, 1000);
        }}
      >
        Save
      </Button>
    </div>
  );
};

const CustomToolbar = ({ store }) => {
  return (
    <Toolbar
      store={store}
      components={{
        ActionControls,
      }}
    />
  );
};
const page = store.addPage();

const sections = [...DEFAULT_SECTIONS, CustomUploadJson];

export const App = ({ store }) => {
  // store.loadJSON(tJson2);
  // // wait for loading
  // store.waitLoading();
  // do export
  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <CustomToolbar store={store} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App store={store} />);
