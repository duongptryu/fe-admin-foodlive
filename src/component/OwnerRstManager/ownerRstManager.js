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
  Drawer,
  Form,
  Popover,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import API from "../../api/fetch";
const { Title, Text } = Typography;
const { Search } = Input;

const SubOwnerRstManager = () => {
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
  const [rst, setRst] = useState([]);
  const [loadingRst, setLoadingRst] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleCreateUser = () => {
    setLoading(true);
    API.post("admin/owner-rst", newUser)
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "Create account successful",
        });
        setNewUser({ first_name: "", last_name: "", phone: "", password: "" });
        setVisible(false);
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

  const handleUpdateStatusOwner = (id, status) => {
    setLoading(true);
    API.put(`admin/owner-rst/${id}`, {
      status: status,
    })
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "Update status category successful",
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
    API.get(`admin/owner-rst?limit=${pageSize}&page=${currentPage}`)
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

  const getListRstOfOwner = (ownerId) => {
    setLoading(true);
    API.get(`admin/restaurant?owner_id=${ownerId}`)
      .then((result) => {
        console.log(result);
        setRst(result.data.data);
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
    document.title = "Onwer Restaurant Management";
    fetchData();
  }, [currentPage, pageSize]);

  const theirRst = () => {
    return (
      <Spin spinning={loadingRst}>
        {" "}
        {rst.length !== 0
          ? rst.map((r) => {
              return (
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate(`/rst/${r.id}`);
                    }}
                  >
                    {r.name}
                  </Button>
                </div>
              );
            })
          : "No restaurant found"}
      </Spin>
    );
  };

  const search = () => {
    setLoading(true);
    let url = "admin/owner-rst";
    if (searchText != "") {
      url = url + `?${searchedColumn}=${searchText}`;
    }
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
      title: "Full Name",
      key: "name",
      ...getColumnSearchProps("last_name"),
      render: (u) => {
        return (
          <text>
            {u.first_name} {u.last_name}
          </text>
        );
      },
    },
    {
      title: "Phone Number",
      key: "phone",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
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
                handleUpdateStatusOwner(u.id, false);
              }}
            >
              Deactive
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                handleUpdateStatusOwner(u.id, true);
              }}
            >
              Active
            </Button>
          )}
          <Popover content={theirRst} trigger="click" title="Restaurant">
            <Button
              type="primary"
              onClick={() => {
                getListRstOfOwner(u.id);
              }}
            >
              Their Restaurant
            </Button>
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Spin tip="Loading..." spinning={loading}>
        <Row>
          <Col span={24}>
            <Title keyboard>Owner Restaurant Management</Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            {/* <Search
              placeholder="Search restaurant"
              enterButton="Search"
              size="large"
              loading={false}
            /> */}
          </Col>
          <Col span={16}>
            <Button
              type="primary"
              onClick={showDrawer}
              icon={<PlusOutlined />}
              style={{ float: "right" }}
            >
              New account
            </Button>
          </Col>
        </Row>

        <Drawer
          title="Create a new account"
          width={378}
          placement="right"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={handleCreateUser}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="first_name"
                  label="First Name"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setNewUser({ ...newUser, first_name: e.target.value });
                    }}
                    value={newUser.first_name}
                    placeholder="Please enter your first name"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="last_name"
                  label="Last Name"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setNewUser({ ...newUser, last_name: e.target.value });
                    }}
                    value={newUser.last_name}
                    placeholder="Please enter your last name"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setNewUser({ ...newUser, phone: e.target.value });
                    }}
                    value={newUser.phone}
                    placeholder="Please enter your phone number"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setNewUser({ ...newUser, password: e.target.value });
                    }}
                    value={newUser.password}
                    placeholder="Please enter your password"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>

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

export default SubOwnerRstManager;
