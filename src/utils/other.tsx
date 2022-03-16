import React from "react";

export const combineProviders =
  (...providers: any) =>
  ({ children }: any) => {
    return providers.reduceRight(
      (child: any, Provider: any) => <Provider>{child}</Provider>,
      children,
    );
  };
