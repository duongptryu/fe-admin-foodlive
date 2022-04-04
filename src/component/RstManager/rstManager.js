import { useNavigate } from "react-router-dom";
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
  Select,
  DatePicker,
  Drawer,
  Form,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import API from "../../api/fetch";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
const { Search } = Input;

const SubRstManager = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const handleUpdateStatusRst = (id, status) => {
    setLoading(true);
    API.put(`admin/restaurant/${id}`, {
      status: status,
    })
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "Update status restaurant successful",
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

  const fetchData = () => {
    setLoading(true);
    API.get(`admin/restaurant?limit=${pageSize}&page=${currentPage}`)
      .then((result) => {
        console.log(result);
        setData(result.data.data);
      })
      .catch((e) => {
        console.log(e);
        notification["error"]({
          message: "Error server",
          description: e.response.data.message,
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Restaurant Management";
    fetchData();
  }, [currentPage, pageSize]);

  const search = () => {
    let url = "admin/restaurant";
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
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Address",
      key: "phone",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "City",
      key: "city",
      render: (r) => {
        return <Text type="secondary">{r.city.title}</Text>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (u) => {
        return u.status ? (
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
          {u.status ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatusRst(u.id, false);
              }}
            >
              Deactive
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatusRst(u.id, true);
              }}
            >
              Active
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => {
              navigate(`/rst/${u.id}`);
            }}
          >
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Spin tip="Loading..." spinning={loading}>
        <Row>
          <Col span={24}>
            <Title keyboard>Restaurant Management</Title>
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

export default SubRstManager;
