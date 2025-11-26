import { StateType } from "@/store";
import { useSelector } from "react-redux";
import { ComponentsStateType } from "@/store/componentsReducer";

function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.components,
  ) as ComponentsStateType;
  const { componentList = [], selectedId } = components;

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);

  return { componentList, selectedId, selectedComponent };
}

export default useGetComponentInfo;
