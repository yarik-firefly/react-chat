import React from "react";
import { Alert, Space, Spin } from "antd";
const Loading = ({ dialog }) => (
  <div>
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Space>
        <div style={{ width: 75 }}>
          <Spin tip={dialog ? `Загрузка` : `Подождите`} size="large">
            <div className="content" />
          </Spin>
        </div>
      </Space>
    </Space>
  </div>
);
export default Loading;
