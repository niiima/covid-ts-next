import React, { useState } from 'react';
//import ReactDOM from 'react-dom'
import { Table } from 'antd';
import ReactDragListView from 'react-drag-listview/lib/index.js';
const CovidDragableTable = (props) => {
    const [data, setData] = useState({data:props.countries});
    // setData(props.countries);
    console.log(data)
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
            render: ()=>//(text, record, index) =>
            {
                //console.log(text,record,index)
               return( <a className="drag-handle" href="#">Drag</a>)
            }
        }
    ];

    //const that = this;
    //this.dragProps = {
    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const data = props.data;
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            setData({
                data:data
            });
        },
        handleSelector: "a"
    };

console.log(data)
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

//<ReactDragListView {...this.dragProps}></ReactDragListView>
export default CovidDragableTable; 