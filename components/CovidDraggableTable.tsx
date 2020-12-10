import React, { useState } from 'react';
import { Table } from 'antd';
import ReactDragListView from 'react-drag-listview/lib/index.js';
const CovidDraggableTable = (props) => {
    const [data, setData] = useState({ data: props.countries });
    const columns = [
        {
            title: "Index",
            dataIndex: "index"
        },
        {
            title: "Name",
            dataIndex: "country"
        },
        {
            title: "Total",
            dataIndex: "cases"
        },
        {
            title: "Active",
            dataIndex: "active"
        },
        {
            title: "Critical",
            dataIndex: "critical"
        },
        {
            title: "Deaths",
            dataIndex: "deaths"
        },
        {
            title: "Operates",
            key: "operate",
            render: () =>
            {
                return (<a className="drag-handle" href="#">Drag</a>)
            }
        }
    ];

    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const data = props.data;
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            setData({
                data: data
            });
        },
        handleSelector: "a"
    };

    return (
        <div style={{ margin: 20 }}>
            <h2>Table row  dragging</h2>
            <ReactDragListView {...dragProps}>
                <Table
                    columns={columns}
                    pagination={false}
                    dataSource={data.data}
                />
            </ReactDragListView>
        </div>
    );
}

export default CovidDraggableTable; 