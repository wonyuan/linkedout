import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import "@styles/global.css";
import { LoadingProvider } from "@context/loadingContext.js";
import { MantineProvider } from "@mantine/core";
import { theme } from "@styles/theme.js";
import {
    emotionTransform,
    MantineEmotionProvider,
  } from '@mantine/emotion';
  

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadingProvider>
      <MantineProvider theme={theme} stylesTransform={emotionTransform}>
        <MantineEmotionProvider>
            <App />
        </MantineEmotionProvider>
      </MantineProvider>
    </LoadingProvider>
  </React.StrictMode>
);
