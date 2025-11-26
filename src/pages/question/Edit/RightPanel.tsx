import { FC } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";

import ComponentProp from "./ComponentProp";

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: "prop",
      label: "属性",
      icon: <FileTextOutlined />,
      children: <ComponentProp />,
    },
    {
      key: "setting",
      label: "页面设置",
      icon: <SettingOutlined />,
      children: <div>页面设置</div>,
    },
  ];

  return <Tabs defaultActiveKey="prop" items={tabsItems}></Tabs>;
};

export default RightPanel;
