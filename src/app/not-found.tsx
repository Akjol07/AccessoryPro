import { redirect } from "next/navigation";
import { FC } from "react";

const NotFound: FC = () => {
  redirect("/");
  return <></>;
};

export default NotFound;
