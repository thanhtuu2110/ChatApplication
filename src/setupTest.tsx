import { RenderOptions, render } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter } from "react-router-dom";

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export * from "@testing-library/jest-dom";
export { customRender as render };
