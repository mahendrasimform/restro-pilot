import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select, Switch, message } from "antd";
import { useAppDispatch, useAppSelector } from "src/store";
import { addMenuItem, updateMenuItem, deleteMenuItem, addCategory } from "src/store/features/menuSlice";
import { MenuItem as MenuItemType } from "src/interface/types";

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
    dispatch(deleteMenuItem(id));
    message.success("Menu item deleted successfully!");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (available: boolean) => (available ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: MenuItemType) => (
        <span>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <Button type="primary" onClick={() => showModal()}>
          Add Menu Item
        </Button>
      </div>

      <Table columns={columns} dataSource={items} rowKey="id" />

      <Modal
        title={editingItem ? "Edit Menu Item" : "Add Menu Item"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Select>
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
              min={0}
              precision={2}
              formatter={(value) => `$ ${value}`}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
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