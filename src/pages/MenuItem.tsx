import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select, Switch, message } from "antd";
import { useAppDispatch, useAppSelector } from "src/store";
import { addMenuItem, updateMenuItem, deleteMenuItem } from "src/store/features/menuSlice";
import { MenuItem as MenuItemType } from "src/interface/types";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const MenuItem: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const dispatch = useAppDispatch();
  const { items, categories } = useAppSelector((state) => state.menu);

  const showModal = (item?: MenuItemType) => {
    if (item) {
      setEditingItem(item);
      form.setFieldsValue(item);
    } else {
      setEditingItem(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingItem) {
        dispatch(updateMenuItem({ ...values, id: editingItem.id }));
        message.success("Menu item updated successfully!");
      } else {
        dispatch(addMenuItem(values));
        message.success("Menu item added successfully!");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteMenuItem(id));
        message.success("Menu item deleted successfully!");
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: MenuItemType, b: MenuItemType) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: categories.map(cat => ({ text: cat.name, value: cat.name })),
      onFilter: (value: string, record: MenuItemType) => record.category === value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a: MenuItemType, b: MenuItemType) => a.price - b.price,
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (available: boolean) => (
        <Switch checked={available} disabled />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: MenuItemType) => (
        <span>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="menu-items-header">
        <h2 className="menu-items-title">Menu Items</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          className="form-button"
        >
          Add Menu Item
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={items} 
        rowKey="id"
        className="menu-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />

      <Modal
        title={editingItem ? "Edit Menu Item" : "Add Menu Item"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical" className="menu-form">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input.TextArea className="form-input" rows={4} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Select className="form-input">
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.name}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber
              className="form-input"
              min={0}
              precision={2}
              formatter={(value) => `$ ${value}`}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item name="available" label="Available" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuItem;