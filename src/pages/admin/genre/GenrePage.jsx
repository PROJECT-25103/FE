import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, message, Input, Typography } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

const GenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/genre");
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setGenres(data);
      setFilteredGenres(data);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi tải danh sách thể loại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = genres.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredGenres(filtered);
  };

  const toggleStatus = async (genre) => {
    try {
      await axios.patch(`http://localhost:8000/api/genre/status/${genre._id}`, {
        status: !genre.status,
      });
      message.success("Cập nhật trạng thái thành công!");
      fetchGenres();
    } catch (error) {
      console.error(error);
      message.error("Cập nhật trạng thái thất bại!");
    }
  };

  const columns = [
    {
      title: "Tên thể loại",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status ? "green" : "red" }}>
          {status ? "Hoạt Động" : "Đang Khóa"}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingGenre(record);
              setOpenModal(true);
            }}
          />
          <Button
            icon={record.status ? <LockOutlined /> : <UnlockOutlined />}
            onClick={() => toggleStatus(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 30 }}>
        Quản lý thể loại phim
      </Title>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm theo tên thể loại..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          style={{ width: 250 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingGenre(null);
            setOpenModal(true);
          }}
        >
          Thêm thể loại
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredGenres}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

       <Modal
        open={openModal}
        footer={null}
        onCancel={() => setOpenModal(false)}
        title={editingGenre ? "Sửa thể loại" : "Thêm thể loại"}
      >
        <GenreForm
          genre={editingGenre}
          onClose={() => setOpenModal(false)}
          refresh={fetchGenres}
        />
      </Modal> 
    </div>
  );
};

export default GenrePage;