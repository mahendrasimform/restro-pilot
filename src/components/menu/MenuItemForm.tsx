import React from "react";
import { Modal, Form, Input, InputNumber, Select, Switch, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MenuItemFormProps } from "src/interface/types";
import "../../styles/menu.css";

const { TextArea } = Input;

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  categories,
  ingredients,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const fileList = form.getFieldValue("images") || [];
      const images = fileList.map((file: any) => file.thumbUrl || file.url);
      onSubmit({ ...values, images });
      form.resetFields();
    });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
      title={initialValues ? "Edit Menu Item" : "Add Menu Item"}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        className="menu-form"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
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
          label="Price (₹)"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber min={0} precision={2} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="ingredients"
          label="Ingredients"
          rules={[{ required: true, message: "Please input the ingredients!" }]}
        >
          <Select
            mode="tags"
            placeholder="Add ingredients"
            style={{ width: "100%" }}
            options={ingredients.map((ingredient: any) => ({
              label: ingredient.name,
              value: ingredient.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="images"
          label="Images"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: "Please upload at least one image!" },
          ]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            accept="image/*"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item name="available" label="Available" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MenuItemForm;
