import { FC } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Sector,
  PieSectorShapeProps,
} from "recharts";
import { STAT_COLORS } from "@/constant";
import { QuestionRadioStatPropsType } from "./interface";

/**
 * 格式化百分比显示
 * @param percentage 百分比值（0-1之间）
 * @returns 格式化后的百分比字符串
 */
function formatPercentage(percentage: number): string {
  // 处理除零或无效值的情况
  if (!isFinite(percentage) || percentage < 0) {
    return "0%";
  }
  // 计算百分比
  const percent = percentage * 100;
  // 如果是整数，不显示小数；否则保留2位小数
  return percent % 1 === 0 ? `${percent}%` : `${percent.toFixed(2)}%`;
}

/**
 * 自定义 Pie 扇区组件，使用 strokeWidth 设置边框颜色
 */
const CustomPieSector = (props: PieSectorShapeProps) => {
  // 从 props 中获取 index，如果没有则从 payload 中获取
  const index = props.index ?? (props.payload as any)?.index ?? 0;
  // 根据 index 获取对应的颜色
  const fill = STAT_COLORS[index % STAT_COLORS.length];
  return <Sector {...props} fill={fill} stroke={fill} strokeWidth={2} />;
};

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => (
  <div style={{ width: "300px", height: "400px", minWidth: 0, minHeight: 0 }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="count"
          data={stat}
          cx="50%" // x 轴的偏移
          cy="50%" // y 轴的偏移
          outerRadius={50} // 饼图的直径
          shape={CustomPieSector} // 使用自定义扇区组件，通过 strokeWidth 设置颜色
          label={({ name, percent }) => {
            // Pie 组件的 label 函数是专门为饼图设计的，参数类型为 PieLabelRenderProps
            // 该类型专门包含了 percent 属性（0-1之间），因为饼图标签通常需要显示百分比
            // 所以可以直接从参数中获取，无需手动计算
            const percentage = percent ?? 0;
            return `${name}: ${formatPercentage(percentage)}`;
          }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload || payload.length === 0) {
              return null;
            }
            const data = payload[0];
            const value = (data.value as number) ?? 0;

            // Tooltip 中只显示 name 和 value，不显示百分比
            return (
              <div
                style={{
                  padding: "8px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <p style={{ margin: 0 }}>{`${data.name}: ${value}`}</p>
              </div>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default StatComponent;
