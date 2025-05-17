import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { useAppSelector } from "src/store";

const Dashboard: React.FC = () => {
  const { items, categories } = useAppSelector((state) => state.menu);

  const availableItems = items.filter((item) => item.available).length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Menu Items" value={items.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Available Items" value={availableItems} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Categories" value={categories.length} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;