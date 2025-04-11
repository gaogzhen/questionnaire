import { FC } from "react";
import { Outlet } from "react-router-dom";
const MainLayout: FC = () => (
  <>
    <div>header</div>
    <div>
      <Outlet />
    </div>
    <div>footer</div>
  </>
);

export default MainLayout;
