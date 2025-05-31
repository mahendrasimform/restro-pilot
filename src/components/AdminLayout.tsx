import React from "react";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store";
import { logout } from "src/store/features/authSlice";
import { DashboardOutlined, MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import "../styles/admin.css";

const { Header, Content, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout className="admin-layout">
      <Header className="admin-header">
        <h1 className="admin-logo">Restaurant Admin</h1>
        <Button 
          icon={<LogoutOutlined />}
          onClick={handleLogout} 
          type="primary" 
          danger
          className="form-button"
        >
          Logout
        </Button>
      </Header>
      <Layout>
        <Sider width={200} className="admin-sider" theme="light">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={[
              {
                key: "1",
                icon: <DashboardOutlined />,
                label: "Dashboard",
                onClick: () => navigate("/"),
              },
              {
                key: "2",
                icon: <MenuOutlined />,
                label: "Menu Items",
                onClick: () => navigate("/menu"),
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content className="admin-content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;