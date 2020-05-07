import PrimaryLayout from "../../components/Layout/PrimaryLayout";
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Checkbox, Form, Input, message, Table} from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ShopOutlined from "@ant-design/icons/lib/icons/ShopOutlined";
import "./products.page.less";
import {fetchProducts, updateProduct} from "../../api/products.api";
import {Link} from "react-router-dom";

const EditableContext = React.createContext();

const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {


    state = {
        dataSource: []
    };


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            dataSource: nextProps.dataSource
        })
    }

    handleCheckbox = (event, record) => {
        record.available = event.target.checked;
        this.handleSave(record)
    }

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '80%',
                editable: true,
            },
            {
                title: 'Price',
                dataIndex: 'price',
                width: '10%',
                editable: true
            },
            {
                title: 'Available',
                dataIndex: 'available',
                editable: false,
                render: (text, record, index) => {
                    return (
                        <Checkbox checked={record.available} onChange={(e) => this.handleCheckbox(e, record)}/>
                    )
                }
            },
            {
                title: "Details",
                render: (text, record, index) => {
                    return (
                        <Link to={{
                            pathname: '/productDetail/' + record.key,
                            state: {
                                product: record
                            }
                        }}>
                            Details
                        </Link>
                    )
                }
            }
        ];

        this.setState({
            dataSource: props.dataSource
        })
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key),
        });
    };

    handleSave = row => {
        this.props.updateProductCallback(row)
            .then((data) => {
                /* let savedProduct = data.data;
                 const newData = [...this.state.dataSource];
                 const index = newData.findIndex(item => savedProduct.key === item.key);
                 const item = newData[index];
                 newData.splice(index, 1, {...item, ...savedProduct});*/
                this.props.reloadCallback();
                message.success("Product Saved")

            }).catch((data) => {
            message.success("Product could not saved");
        });
    };

    render() {
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                {this.state.dataSource &&
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={this.state.dataSource}
                    columns={columns}
                />
                }
            </div>
        );
    }
}

class ProductsPage extends React.Component {


    constructor(props) {
        super(props);

        this.loadTable = this.loadTable.bind(this)
    }


    state = {
        data: []
    };

    loadTable() {
       this.props.fetchProducts().then((data) => {
            this.setState({
                data: data.data
            })
            console.log(data.data)
        }).catch((message) => {
            console.log(message);
        });
    }

    componentDidMount() {
        this.loadTable()
    }

    render() {
        return (
            <PrimaryLayout pageIcon={<ShopOutlined style={{fontSize: '36px', color: '#08c'}}/>} pageName={"Products"}
                           loading={this.props.loading}>
                <EditableTable reloadCallback={this.loadTable} updateProductCallback={this.props.updateProduct}
                               dataSource={this.state.data}/>
            </PrimaryLayout>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth.isLoggedIn,
        loading: state.data.loading
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchProducts: fetchProducts,
        updateProduct: updateProduct
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)