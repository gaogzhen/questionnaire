import { FC } from "react";
import { Outlet } from "react-router-dom";
const QuestionLayout: FC = () => (
  <>
    <div>QuestionLayout</div>
    <div>
      <Outlet />
    </div>
  </>
);

export default QuestionLayout;
