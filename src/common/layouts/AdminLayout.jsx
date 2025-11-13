import React from "react";
import { Layout, Button, Space, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet } from "react-router";
import SideBar from "./components/SideBar";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={260}
        style={{
          overflow: "hidden",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#fff",
        }}
      >
        <div style={{ height: 64, padding: "16px 24px" }}>
          <Text strong style={{ fontSize: 24 }}>
            MPV Admin
          </Text>
        </div>
        <SideBar />
      </Sider>

      <Layout style={{ marginLeft: 260 }}>
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <Space>
            <Button icon={<UserOutlined />}>Admin</Button>
            <Button icon={<LogoutOutlined />} onClick={() => {}}>
              Đăng xuất
            </Button>
          </Space>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: 4,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
