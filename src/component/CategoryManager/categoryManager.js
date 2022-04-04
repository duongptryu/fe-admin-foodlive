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
  Image,
  Drawer,
  Divider,
  Upload,
  Switch,
  Form,
} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import API from "../../api/fetch";
import TextArea from "antd/lib/input/TextArea";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const SubCategoryManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [newCate, setNewCate] = useState({
    name: "",
    description: "",
    icon: {
      url: "",
    },
    status: true,
  });
  const [flagImage, setFlagImage] = useState(false);
  const [cate, setCate] = useState({
    id: "",
    name: "",
    icon: {
      url: "",
    },
    description: "",
    status: false,
    updated_at: "",
    created_at: "",
  });
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "",
    },
  ]);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIcon, setEditIcon] = useState({});
  const [cateStatus, setCateStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    document.title = "Category Management";
    fetchData();
  }, [currentPage, pageSize]);

  const beforeUpload = async (file) => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", file);
    API.post("/upload", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        console.log(result);
        notification["success"]({
          message: "Upload Success",
        });
        setEditIcon(result.data.data);
        return true;
      })
      .catch((err) => {
        notification["error"]({
          message: "Error server",
          description: err,
        });
        return false;
      });
  };

  const onEditCate = () => {
    setLoading(true);
    const cateUpdate = {
      name: editName,
      description: editDescription,
      icon: editIcon,
      status: cateStatus,
    };
    API.put(`/admin/category/${cate.id}`, cateUpdate)
      .then((result) => {
        console.log(result);
        notification["success"]({
          message: "Update Success",
        });
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: "Error",
          description: err,
        });
      });
    onClose();
    fetchData();
    setLoading(false);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onOpenEdit = () => {
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: cate.icon.url,
      },
    ]);
    setEditIcon(cate.icon);
    setEditName(cate.name);
    setEditDescription(cate.description);
    setCateStatus(cate.status);
    setVisibleEdit(true);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const showDrawer = (cate) => {
    console.log(cate);
    setCate({
      id: cate.id,
      name: cate.name,
      icon: cate.icon,
      description: cate.description,
      status: cate.status,
      created_at: cate.created_at,
      updated_at: cate.updated_at,
    });
    setVisible(true);
  };

  const showDrawerCreate = () => {
    setVisibleCreate(true);
  };

  const onClose = () => {
    setVisibleEdit(false);
    setVisible(false);
    setVisibleCreate(false);
  };

  const fetchData = () => {
    setLoading(true);
    API.get(`admin/category?limit=${pageSize}&page=${currentPage}`)
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

  const handleUpdateStatusCate = (id, status) => {
    setLoading(true);
    API.put(`admin/category/${id}`, {
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

  const handleCreateCategory = () => {
    setLoading(true);
    if (flagImage == true) {
      newCate.icon = editIcon;
    }
    API.post(`admin/category`, newCate)
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "create category successful",
        });
        fetchData();
        setVisibleCreate(false);
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

  const handleDeleteCategory = (id) => {
    setLoading(true);
    API.delete(`admin/category/${id}`)
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "Delete category successful",
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

  const search = () => {
    let url = "admin/category";
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
      title: "Icon",
      key: "icon",
      render: (c) => {
        return <Image width={100} src={c.icon.url} />;
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
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
          <Button
            type="primary"
            onClick={() => {
              showDrawer(u);
            }}
          >
            Detail
          </Button>
          {u.status ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatusCate(u.id, false);
              }}
            >
              Deactive
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                handleUpdateStatusCate(u.id, true);
              }}
            >
              Active
            </Button>
          )}
          <Button
            type="primary"
            danger
            onClick={() => {
              handleDeleteCategory(u.id);
            }}
          >
            Delete
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
            <Title keyboard>Category Management</Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            {/* <Search
              placeholder="Search category"
              enterButton="Search"
              size="large"
              loading={false}
            /> */}
          </Col>
          <Col span={16}>
            <Button
              type="primary"
              onClick={showDrawerCreate}
              icon={<PlusOutlined />}
              style={{ float: "right" }}
            >
              New category
            </Button>
          </Col>
        </Row>

        {/* //Detail */}
        <Drawer
          title="Category detail"
          width={736}
          placement="right"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onOpenEdit} type="primary" htmlType="submit">
                Edit
              </Button>
            </Space>
          }
        >
          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Icon</h3>
          </Divider>
          <Row>
            <Col span={24}>
              <Image width={360} src={cate.icon.url} style={{}} />
            </Col>
          </Row>
          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Information</h3>
          </Divider>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>ID: </Text> <Text>{cate.id}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Name: </Text> <Text>{cate.name}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Description: </Text>
              <Text>{cate.description}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Created At: </Text>
              <Text>{cate.created_at}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Updated At: </Text>
              <Text>{cate.updated_at}</Text>
            </Col>
          </Row>
        </Drawer>

        {/* Edit */}
        <Drawer
          title="Category Edit"
          width={736}
          placement="right"
          onClose={() => {
            setVisibleEdit(false);
            setVisible(false);
          }}
          visible={visibleEdit}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onEditCate} type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          }
        >
          <Divider orientation="left" plain>
            Icon
          </Divider>
          <Row>
            <Col span={24}>
              <ImgCrop rotate width={360}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Col>
          </Row>
          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Information</h3>
          </Divider>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Name: </Text>{" "}
              <Paragraph editable={{ onChange: setEditName }}>
                {editName}
              </Paragraph>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Description: </Text>
              <Paragraph editable={{ onChange: setEditDescription }}>
                {editDescription}
              </Paragraph>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>InActive </Text>
              <Switch
                checked={cateStatus}
                onChange={() => {
                  setCateStatus(!cateStatus);
                }}
              />
              <Text strong> Active</Text>
            </Col>
          </Row>
        </Drawer>

        {/* Create */}
        <Drawer
          title="Create a new category"
          width={768}
          placement="right"
          onClose={onClose}
          visible={visibleCreate}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={handleCreateCategory}
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
                  name="name"
                  label="Name category"
                  rules={[
                    { required: true, message: "Please enter category name" },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setNewCate({ ...newCate, name: e.target.value });
                    }}
                    value={newCate.name}
                    placeholder="Please enter category name"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter category description",
                    },
                  ]}
                >
                  <TextArea
                    onChange={(e) => {
                      setNewCate({ ...newCate, description: e.target.value });
                    }}
                    value={newCate.description}
                    placeholder="Please enter category description"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: "" }]}
                >
                  <Switch
                    value={newCate.status}
                    onChange={(e) => {
                      setNewCate({ ...newCate, status: e });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="Icon" plain></Divider>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="flagImage"
                  label="Upload image"
                  rules={[{ required: true, message: "" }]}
                >
                  <Switch
                    value={flagImage}
                    onChange={(e) => {
                      setFlagImage(!flagImage);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ImgCrop rotate width={360}>
                  <Upload
                    disabled={!flagImage}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  onChange={(e) => {
                    setNewCate({ ...newCate, icon: { url: e.target.value } });
                    console.log(newCate.icon.url);
                  }}
                  value={newCate.icon.url}
                  disabled={flagImage}
                />
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

export default SubCategoryManager;
