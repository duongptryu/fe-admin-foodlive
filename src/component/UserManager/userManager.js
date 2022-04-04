import {
  Table,
  Space,
  Tag,
  Row,
  Col,
  Typography,
  Input,
  notification,
  Spin,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import API from "../../api/fetch";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Search } = Input;

const SubUserManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    setLoading(true);
    API.get(`admin/user-device-token?limit=${pageSize}&page=${currentPage}`)
      .then((result) => {
        console.log(result.data.data);
        setData(result.data.data);
      })
      .catch((e) => {
        notification["error"]({
          message: "Error server",
          description: e,
        });
      });
    setLoading(false);
  };

  const handleUpdateStatusUser = (id, status) => {
    setLoading(true);
    API.put(`admin/user/${id}`, {
      status: status,
    })
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "Update status user successful",
        });
        fetchData();
      })
      .catch((err) => {
        console.log(err.response);
        notification["error"]({
          message: "Errorr",
          description: err.response.data.message,
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    document.title = "User Management";
    fetchData();
  }, [currentPage, pageSize]);

  const search = () => {
    let url = "admin/user";
    if (searchText != "") {
      url = url + `?${searchedColumn}=${searchText}`;
    }
    setLoading(true);
    API.get(url)
      .then((result) => {
        console.log(result.data.data);
        setData(result.data.data);
        setTotal(result.data.paging.total);
      })
      .catch((e) => {
        notification["error"]({
          message: "Error server",
          description: e,
        });
      });
    setLoading(false);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  useEffect(() => {
    search();
  }, [searchText, searchedColumn]);

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Full Name",
      key: "name",
      ...getColumnSearchProps("last_name"),
      render: (u) => {
        return (
          <text>
            {u.user.first_name} {u.user.last_name}
          </text>
        );
      },
    },
    {
      title: "Phone Number",
      key: "phone",
      ...getColumnSearchProps("phone"),
      render: (u) => {
        return u.user.phone;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (u) => {
        return u.user.status ? (
          <Tag color="#108ee9">Active</Tag>
        ) : (
          <Tag color="red">Deactive</Tag>
        );
      },
    },
    {
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
    },
    {
      title: "Action",
      key: "action",
      render: (u) => (
        <Space size="middle">
          <Button type="primary">Detail</Button>
          {u.user.status ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatusUser(u.user?.id, false);
              }}
            >
              Deactive
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                handleUpdateStatusUser(u.user?.id, true);
              }}
            >
              Active
            </Button>
          )}
          <Button type="primary">Push Notification</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Spin tip="Loading..." spinning={loading}>
        <Row>
          <Col span={24}>
            <Title keyboard>User Management</Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            {/* <Search
              placeholder="Search user"
              enterButton="Search"
              size="large"
              loading={false}
            /> */}
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            total: total,
          }}
          onChange={(e) => {
            setCurrentPage(e.current);
            setPageSize(e.pageSize);
          }}
        />
      </Spin>
    </>
  );
};

export default SubUserManager;
