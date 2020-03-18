import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { showModalAction } from './redux/actions'

class Users extends React.Component {
    state = {
        columns: [
            {
                title: 'Ид юзера',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Имя пользователя',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email'
            }
        ],
        data: []
    }

    onClick = (e, record) => {
        this.props.triggerModal(record) // прокидываю данные одного пользователя в функцию triggerModal в mapDispatchToProps
    }
    async componentDidMount() {
        const response = await fetch('api/Users/GetUsersList')
        const users = await response.json();
        console.log(users);
        this.setState(() => {
            return {
                data: users
            }
        });
    }

    render() {
        const {
            columns,
            data,
        } = this.state;
        return <div>
            <Table rowClassName={(record, index) => {
                if (this.props.blocksUsersArray) { // не является ли blocksUsersArray undefined
                    let trueUser = false // переменная, которая в цикле принимает true, при правде
                    for (let item of this.props.blocksUsersArray) {
                        if (item === index + 1) { // проверка на совпадение id юзера и индекса строки
                            trueUser = true // присваиваю переменной true
                        }
                    }
                    let trueUserData = false; // переменная, которая в цикле принимает true, если находится заблокированный пользователь
                    if (this.state.data) { // не является ли this.state.data undefined
                        for (let item of this.state.data) {
                            if (item.id === index + 1 && item.blocked === true) { // проверка на совпадение id юзера и индекса строки, а также проверка поля blocked в массиве юзеров пришедшего из запроса
                                trueUserData = true // присваиваю переменной true
                            }
                        }
                    }
                    if (trueUser && trueUserData) {
                        return trueUser ? "grey" : "" // если есть такой user перекрашиваем строку в серый цвет}
                    }
                    else if (trueUser && trueUserData === false) {
                        return trueUser ? "grey" : "" // эта проверка сделана для правильного отображения заблокированных пользователей при клике. Без этой проверки при блоке пользователя строка не перекрашивается в серый, но при обновлении страницы все норм
                    }
                }
                if (this.state.data) { // не является ли blocksUsersArray undefined
                    let trueUser = false // переменная, которая в цикле принимает true, при правде
                    for (let item of this.state.data) {
                        if (item.id === index + 1 && item.blocked === true) { // проверка на совпадение id юзера и индекса строки
                            trueUser = true
                        }
                    }
                    return trueUser ? "grey" : "" // если есть такой user перекрашиваем строку в красный цвет
                }
            }}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => { this.onClick(event, record) }
                };
            }}
                columns={columns} dataSource={data} />
        </div>
    }
}



const mapStateToProps = state => {
    return {
        blocksUsersArray: state.modal.blocksUsersArray // получаю массив заблокированных пользователей из store
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerModal: (record) => {
            let action = showModalAction() // action с типом CHANGE_MODAL_VISIBLE
            action.content = record // заношу в action данные пользователя на которого кликнули
            dispatch(action) // отправляю action в reducers
        }
    }
}

const ConnectedUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)
export default ConnectedUsers
