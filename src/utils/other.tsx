import React from "react";

export const combineProviders =
  (...providers: any) =>
  ({ children }: any) => {
    return providers.reduceRight(
      (child: any, Provider: any) => <Provider>{child}</Provider>,
      children,
    );
  };

export const createUID = (): string => {
  const head: string = Date.now().toString(36);
  const tail: string = Math.random().toString(36).substring(2);
  return head + tail;
};
