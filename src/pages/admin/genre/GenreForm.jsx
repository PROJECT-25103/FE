import React, { useEffect } from "react";
import { Form, Input, Button, message, Switch } from "antd";
import axios from "axios";

const GenreForm = ({ genre, onClose, refresh }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (genre) {
      form.setFieldsValue({
        ...genre,
        status: genre.status === true,
      });
    } else {
      form.resetFields();
    }
  }, [genre]);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        status: !!values.status,
      };

      if (genre) {
        await axios.patch(
          `http://localhost:8000/api/genre/update/${genre._id}`,
          payload,
        );
        message.success("Cập nhật thể loại thành công!");
      } else {
        await axios.post("http://localhost:8000/api/genre", payload);
        message.success("Thêm thể loại thành công!");
      }
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      message.error("Lưu thất bại!");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Tên thể loại"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên thể loại!" }]}
      >
        <Input placeholder="Nhập tên thể loại..." />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <Input.TextArea rows={3} placeholder="Nhập mô tả..." />
      </Form.Item>

      <Form.Item label="Trạng thái" name="status" valuePropName="checked">
        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
      </Form.Item>

      <Form.Item style={{ textAlign: "right" }}>
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Hủy
        </Button>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GenreForm;
