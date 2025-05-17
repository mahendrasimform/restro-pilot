import React from "react";
import { Card, Row, Col, Statistic, Table } from "antd";
import { useAppSelector } from "src/store";
import { ShopOutlined, CheckCircleOutlined, AppstoreOutlined } from '@ant-design/icons';
import { MenuItem } from "src/interface/types";

const Dashboard: React.FC = () => {
  const { items, categories } = useAppSelector((state) => state.menu);
  const availableItems = items.filter((item) => item.available).length;

  const recentItems = [...items]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Ingredients',
      dataIndex: 'ingredients',
      key: 'ingredients',
      render: (ingredients: string[]) => ingredients.join(', '),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `₹${price.toFixed(2)}`,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      
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

      <Card title="Recently Added Items" className="recent-items-card">
        <Table
          columns={columns}
          dataSource={recentItems}
          rowKey="id"
          pagination={false}
          className="recent-items-table"
        />
      </Card>
    </div>
  );
};

export default Dashboard;