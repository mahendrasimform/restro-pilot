import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "src/store/features/menuSlice";
import { MenuItem as MenuItemType } from "src/interface/types";
import { PlusOutlined } from "@ant-design/icons";
import MenuItemTable from "../components/menu/MenuItemTable";
import MenuItemForm from "../components/menu/MenuItemForm";

const MenuItem: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const dispatch = useAppDispatch();
  const { items, categories, ingredients } = useAppSelector(
    (state) => state.menu
  );

  const handleAddEdit = (values: Partial<MenuItemType>) => {
    if (editingItem) {
      dispatch(updateMenuItem({ ...editingItem, ...values }));
      message.success("Menu item updated successfully!");
    } else {
      dispatch(
        addMenuItem({
          ...(values as Omit<MenuItemType, "id">),
          createdAt: new Date().toISOString(),
        })
      );
      message.success("Menu item added successfully!");
    }
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteMenuItem(id));
        message.success("Menu item deleted successfully!");
      },
    });
  };

  const showModal = (item?: MenuItemType) => {
    if (item) {
      setEditingItem(item);
    } else {
      setEditingItem(null);
    }
    setIsModalVisible(true);
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2 className="menu-title">Menu Items</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          className="add-button"
        >
          Add Menu Item
        </Button>
      </div>

      <MenuItemTable items={items} onEdit={showModal} onDelete={handleDelete} />

      <MenuItemForm
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingItem(null);
        }}
        onSubmit={handleAddEdit}
        initialValues={editingItem || undefined}
        categories={categories}
        ingredients={ingredients}
      />
    </div>
  );
};

export default MenuItem;
