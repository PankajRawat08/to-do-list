import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
const Tasks = ({ tasks, handleDeleteTask, handleEditTask }) => {
  const columns = [
    {
      title: "Timestamp created",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: (a, b) => a.timestamp - b.timestamp,
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      render: (text) =>
        text ? moment(text).format("MMMM Do YYYY, h:mm:ss a") : "-",
    },

    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      filters: [
        { text: "Personal", value: "Personal" },
        { text: "Work", value: "Work" },
        { text: "Shopping", value: "Shopping" },
      ],
      onFilter: (value, record) => record.tag.includes(value),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "OPEN", value: "OPEN" },
        { text: "WORKING", value: "WORKING" },
        { text: "DONE", value: "DONE" },
        { text: "OVERDUE", value: "OVERDUE" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text) => (
        <span
          style={{
            color:
              text === "OPEN"
                ? "#1890ff"
                : text === "WORKING"
                ? "#faad14"
                : text === "DONE"
                ? "#52c41a"
                : "#f5222d",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "key",
      render: (record) => {
        return (
          <>
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleEditTask(record);
              }}
            />
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
              onClick={() => {
                handleDeleteTask(record);
              }}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={tasks}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default Tasks;
