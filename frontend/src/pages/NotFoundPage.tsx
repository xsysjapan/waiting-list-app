import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export type NotFoundPageProps = {};

export const NotFoundPage = (props: NotFoundPageProps) => {
  return (
    <Layout>
      <h1>404 Not Found</h1>
      <p>お探しのページは見つかりません。</p>
      <div>
        <Link to="/">トップページに戻る</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
