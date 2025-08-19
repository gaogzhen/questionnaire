import { StateType } from "@/store";
import { useSelector } from "react-redux";
import { ComponentsStateType } from "@/store/componentsReducer";

function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.components,
  ) as ComponentsStateType;
  const { componentList = [], selectedId } = components;
  return { componentList, selectedId };
}

export default useGetComponentInfo;
