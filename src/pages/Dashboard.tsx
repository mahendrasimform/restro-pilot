import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { useAppSelector } from "src/store";
import { ShopOutlined, CheckCircleOutlined, AppstoreOutlined } from "@ant-design/icons";

const Dashboard: React.FC = () => {
  const { items, categories } = useAppSelector((state) => state.menu);
  const availableItems = items.filter((item) => item.available).length;

  return (
    <div>
      <h2 className="menu-items-title">Dashboard Overview</h2>
      <Row gutter={[24, 24]} className="dashboard-stats">
        <Col xs={24} sm={8}>
          <Card className="stat-card">
            <Statistic 
              title="Total Menu Items" 
              value={items.length}
              prefix={<ShopOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card">
            <Statistic 
              title="Available Items" 
              value={availableItems}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card">
            <Statistic 
              title="Categories" 
              value={categories.length}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;