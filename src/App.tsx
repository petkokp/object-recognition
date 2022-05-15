import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import "./App.css";
import { ImagesList, Upload, Logout, TabPanel } from "./components";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const formFields = {
  signUp: {
    username: {
      placeholder: "Email",
      isRequired: true,
    },
  },
  signIn: {
    username: {
      placeholder: "Email",
      isRequired: true,
    },
  },
};

const handleConfirmSignIn = ({ user, code, mfaType }: any) => {
  debugger;
  return new Promise((resolve, reject) => resolve('a'));
};

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Upload image" {...a11yProps(0)} />
          <Tab label="View images" {...a11yProps(1)} />
          <Tab label="Logout" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Upload />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImagesList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Logout />
      </TabPanel>
    </div>
  );
}

export default withAuthenticator(App, {
  formFields,
  services: { handleConfirmSignIn },
});
