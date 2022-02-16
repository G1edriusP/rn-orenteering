import React from "react";

export const combineProviders =
  (...providers) =>
  ({ children }) => {
    return providers.reduceRight((child, Provider) => <Provider>{child}</Provider>, children);
  };
