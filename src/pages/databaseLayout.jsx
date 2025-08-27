import { Outlet } from "react-router-dom";
import DatabasePage from "./databasePage";

export default function DatabaseLayout() {
  return (
    <>
      <DatabasePage />
      <Outlet />
    </>
  );
}
