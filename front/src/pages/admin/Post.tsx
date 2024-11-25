import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { Space, Table, Tag, Modal, Input, Button, Select } from "antd";
import type { TableProps } from "antd";
import apiPost from "../../api/apiPost";
import { Post as PostType } from "../../types/Post";

interface DataType {
  key: string;
  userName: string;
  postId: string;
  title: string;
  content: string;
  status: "pending" | "approved" | "declined";
}

const Post = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<"pending" | "approved" | "declined" | "">("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

  const fetchListPost = async () => {
    try {
      let res;
      if (selectedStatus === "") {
        res = await apiPost.getAllPost(); // Fetch all posts if no filter
      }
       else if (selectedStatus === "pending") {
        res = await apiPost.getAllPendingPost(); // Replace with your actual API call for pending posts
      }
       else if (selectedStatus === "approved") {
        res = await apiPost.getAllApprovedPost(); // Replace with your actual API call for approved posts
      } 
      else if (selectedStatus === "declined") {
        res = await apiPost.getAllDeclinedPost(); // Replace with your actual API call for declined posts
      }

      if (res) {
        const filterData = res.map((item: PostType) => ({
          userName: item.user.fullName,
          postId: item.postId,
          title: item.title,
          content: item.content,
          status: item.status,
          key: item.postId, // assuming postId is unique
        }));
        setData(filterData);
        setFilteredData(filterData); // Set the filtered data initially
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchListPost(); // Fetch data on component mount or status change
  }, [selectedStatus]); // Depend on selectedStatus to refetch when it changes

  const handleStatusClick = (key: string) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.key === key) {
          const nextStatus =
            item.status === "pending"
              ? "approved"
              : item.status === "approved"
              ? "declined"
              : "approved";
          apiPost.updateStatusPost(nextStatus, item.postId)
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleStatusFilterChange = (status: "pending" | "approved" | "declined" | "") => {
    setSelectedStatus(status); // Update selected status
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "userName",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "postId",
      dataIndex: "postId",
      key: "postId",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, record) => {
        const color =
          record.status === "pending"
            ? "orange"
            : record.status === "approved"
            ? "green"
            : "volcano";
        const label = record.status.toUpperCase();

        return (
          <Tag
            color={color}
            onClick={() => handleStatusClick(record.key)}
            style={{ cursor: "pointer" }}
          >
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit {record.userName}</a>
          <a onClick={()=> showDeleteModal(record.postId)}>Delete</a>
        </Space>
      ),
    },
  ];

  // Hàm xử lý mở modal xác nhận
  const showDeleteModal = (postId: string) => {
    setPostIdToDelete(postId);
    setIsDeleteModalVisible(true);
  };

  // Hàm xử lý đóng modal
  const handleCancel = () => {
    setIsDeleteModalVisible(false);
  };

  // Hàm xử lý xóa bài viết
  const handleDelete = async () => {
    if (postIdToDelete) {
      try {
        const res = await apiPost.deletePostId(postIdToDelete); // Gọi API xóa bài viết
        if (res.success) {
          // Xóa bài viết khỏi state nếu thành công
          setData((prevData) => prevData.filter((item) => item.postId !== postIdToDelete));
          setIsDeleteModalVisible(false); // Đóng modal
        } else {
          // Xử lý nếu không xóa thành công
          console.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Post" />
      <div className="flex flex-col gap-10">
        <div className="flex items-center mb-4">
          <Select
            defaultValue=""
            style={{ width: 200 }}
            onChange={handleStatusFilterChange}
            allowClear
            placeholder="Filter by status"
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="approved">Approved</Select.Option>
            <Select.Option value="declined">Declined</Select.Option>
          </Select>
        </div>
        <Table<DataType> columns={columns} dataSource={filteredData} />
        <Modal
        title="Confirm Deletion"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
      </div>
    </>
  );
};

export default Post;
