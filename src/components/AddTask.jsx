import React, { useState } from "react";
import { Form, Input, DatePicker, Button, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function AddTask({ addTask, visible, onCancel }) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    const id = parseInt(Math.random() * 1000);
    const timestamp = new Date().toLocaleString();
    const dueDate = values.dueDate?.format("YYYY-MM-DD");
  
    // Check if due date is before timestamp
    if (dueDate && new Date(dueDate) < new Date(timestamp)) {
      message.error("Due date cannot be before timestamp!");
      setIsSubmitting(false);
      return;
    }
    const newTask = {
      key: id,
      timestamp: new Date().toLocaleString(),
      title: values.title,
      description: values.description,
      dueDate: values.dueDate?.format("YYYY-MM-DD"),
      tag: values.tag
      ? values.tag.split(",").map((t) => t.trim())
      : [],

      status: "OPEN",
    };

    addTask(newTask);
    form.resetFields();
    message.success("Task added successfully!");
    setIsSubmitting(false);
  };

  return (
    <Modal
      open={visible}
      title="Add a new task"
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="inline" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "Please enter a title!" },
            { max: 100, message: "Title cannot be more than 100 characters!" },
          ]}
        >
          <Input placeholder="Title" maxLength={100} />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            { required: true, message: "Please enter a description!" },
            {
              max: 1000,
              message: "Description cannot be more than 1000 characters!",
            },
          ]}
        >
          <TextArea placeholder="Description" maxLength={1000} />
        </Form.Item>
        <Form.Item name="dueDate">
          <DatePicker placeholder="Due Date" />
        </Form.Item>
        <Form.Item name="tag">
          <Input placeholder="Tags (comma separated)" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ marginTop: 5 }}
            htmlType="submit"
            loading={isSubmitting}
            icon={<PlusOutlined />}
          >
            Add Task
          </Button>
          <Button style={{ marginLeft: 10, marginTop: 5 }} onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddTask;
