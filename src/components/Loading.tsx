import React from "react";
import { Alert, Space, Spin } from "antd";
const Loading = (props: { dialog: boolean }) => (
  <div>
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Space>
        <div style={{ width: 75 }}>
          <Spin tip={props.dialog ? `Загрузка` : `Подождите`} size="large">
            <div className="content" />
          </Spin>
        </div>
      </Space>
    </Space>
  </div>
);
export default Loading;
