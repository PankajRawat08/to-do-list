import { Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";

const Edit = ({
  isEditing,
  setIsEditing,
  tasks,
  setTasks,
  records,
  setRecords,
}) => {
  const [form] = Form.useForm();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (records) {
      setTask(records);
    }
  }, [records]);

  useEffect(() => {
    form.setFieldsValue(task);
  }, [task]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedTask = { ...task, ...values };
        const index = tasks.findIndex((t) => t.key === task.key);
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1, updatedTask);
        setTasks(updatedTasks);
        setIsEditing(false);
        setRecords(null);
        setTask(null);
        Modal.success({ title: "Task updated successfully!" });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setRecords(null);
    setTask(null);
  };

  const handleFormChange = (changedValues) => {
    setTask({ ...task, ...changedValues });
  };

  return (
    <Modal
      title="Edit Task"
      open={isEditing}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleOk}
        onValuesChange={handleFormChange}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the task title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter the task description!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        
        <Form.Item
          label="Due Date"
          name="dueDate"
          initialValue={moment(records.dueDate).format("YYYY-MM-DD")}
          rules={[{ required: true, message: "Please select the due date!" }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select the task tag!" }]}
        >
          <Select>
            <Select.Option value="Meeting">Meeting</Select.Option>
            <Select.Option value="Development">Development</Select.Option>
            <Select.Option value="Testing">Testing</Select.Option>
            <Select.Option value="Deployment">Deployment</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            { required: true, message: "Please select the task status!" },
          ]}
        >
          <Select>
            <Select.Option value="OPEN">OPEN</Select.Option>
            <Select.Option value="WORKING">WORKING</Select.Option>
            <Select.Option value="DONE">DONE</Select.Option>
            <Select.Option value="OVERDUE">OVERDUE</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Edit;
