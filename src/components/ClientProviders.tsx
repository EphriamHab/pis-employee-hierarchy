"use client";

import React from "react";
import { Provider } from "react-redux";
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Header from "./Header";
import { store } from "../store/store";

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider>
        <Provider store={store}>
          <Header />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </Provider>
      </MantineProvider>
    </>
  );
};

export default ClientProviders;
