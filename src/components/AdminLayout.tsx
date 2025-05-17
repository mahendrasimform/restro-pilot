import React from "react";
import { Layout, Menu, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store";
import { logout } from "src/store/features/authSlice";

const { Header, Content, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ color: "white", margin: 0 }}>Restaurant Admin</h1>
        <Button onClick={handleLogout} type="primary" danger>
          Logout
        </Button>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={[
              {
                key: "1",
                label: "Dashboard",
                onClick: () => navigate("/"),
              },
              {
                key: "2",
                label: "Menu Items",
                onClick: () => navigate("/menu"),
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content style={{ padding: 24, margin: 0, background: "#fff" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;