import { Input } from "@nextui-org/input";
import React from "react";

export const ProfileInputs = () => {
  return (
    <div>
      <Input
        type="text"
        // label="Email"
        labelPlacement={"inside"}
        description={"placement"}
      />
    </div>
  );
};
