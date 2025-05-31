import React from 'react';
import { Table, Button, Image, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MenuItemTableProps, MenuItem } from 'src/interface/types';
import '../../styles/menu.css';

const MenuItemTable: React.FC<MenuItemTableProps> = ({ items, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images: string[]) => (
        <Image.PreviewGroup>
          <div className="image-gallery">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Item image ${index + 1}`}
                width={50}
                height={50}
                className="menu-item-image"
              />
            ))}
          </div>
        </Image.PreviewGroup>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: MenuItem, b: MenuItem) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: Array.from(new Set(items.map(item => item.category))).map(cat => ({
        text: cat,
        value: cat,
      })),
      onFilter: (value: string, record: MenuItem) => record.category === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `₹${price.toFixed(2)}`,
      sorter: (a: MenuItem, b: MenuItem) => a.price - b.price,
    },
    {
      title: 'Ingredients',
      dataIndex: 'ingredients',
      key: 'ingredients',
      render: (ingredients: string[]) => (
        <Space size={[0, 8]} wrap>
          {ingredients.map((ingredient, index) => (
            <Tag key={index} color="blue">{ingredient}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      render: (available: boolean) => (
        <Tag color={available ? 'success' : 'error'}>
          {available ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: MenuItem) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns as any}
      dataSource={items}
      rowKey="id"
      className="menu-table"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
      }}
    />
  );
};

export default MenuItemTable;