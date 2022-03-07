import React from "react";

export type CardsDataType = {
  title: string;
  onPress: () => void;
  icon?: React.FC<{ size: number }>;
};
