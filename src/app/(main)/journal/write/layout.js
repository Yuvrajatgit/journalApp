
import React, { Suspense } from "react";
import {BarLoader} from "react-spinners";


const WriteLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<BarLoader color="teal" width={"100%"}/>}>{children}</Suspense>
    </div>
  );
};

export default WriteLayout;
