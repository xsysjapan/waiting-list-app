import * as React from "react";
import { Redirect } from "react-router";

export type HomePageProps = {};

export const HomePage = (props: HomePageProps) => {
  return <Redirect to="/waiting-lists" />;
};

export default HomePage;
