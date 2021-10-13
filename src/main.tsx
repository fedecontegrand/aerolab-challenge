import {ChakraProvider} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {Provider as UserProvider} from "./componets/Context";

import "./theme.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
