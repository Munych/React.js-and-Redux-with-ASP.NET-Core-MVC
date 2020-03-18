/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Button } from 'antd';
import { blockUserAction } from './redux/actions'


class BlockUser extends React.Component {
    state = {
        blockedUsers : [] // массив заблокированных пользователей
    }
    onblockUser = (record) => {
        alert(`Пользователь с ID = ${record.id} заблокирован`);
        let blockArray = this.state.blockedUsers; // Считываю массив заблокированных пользователей из state
        blockArray.push(record.id); // добавляю в массив id пользователя из события onConfirm в <Popconfirm>
        this.setState({ blockedUsers: blockArray }); // меняю массив заблокированных пользователей в state
        this.props.blockUser(record, this.state.blockedUsers); // передаю в функцию blockUser, которая находится в mapDispatchToProps - данные пользователя на которого кликнули и массив заблокированных пользователей из state
        (async () => { // анонимная асинхронная функция
            try {
                const response = await fetch('api/Users/BlockUser?recordId=' + record.id) // передаю через строку запрос record.id в контроллер UsersController
                const users = await response.json(); //преобразую в формат json
                console.log(users); // вывожу в консоль для контроля
            } catch (e) {
                console.log(e); // вывод ошибки
            }
        })();
      }
    render () {
        const {
            record = {} //данные которые пришли от события в Modal.js,
        } = this.props
        return (
            <Popconfirm
                title="Вы уверены что хотите заблокировать пользователя?"
                onConfirm={() =>{this.onblockUser(record);}}
                okText="Да"
                cancelText="Нет"
            >
                <Button type='danger' > Заблокировать пользователя </Button>
            </Popconfirm>
        )
    }
};
const mapStateToProps = state =>{
    return{
        record: state.modal.content, // данные пользователя на которого кликнули и нажали заблокировать
    }
}
const mapDispatchToProps = dispatch => {
    return{
        blockUser: (record,blockedUsers) => {
            let action = blockUserAction(); // вызываю action c type BLOCK_USER
            action.block = blockedUsers;// передаю в action заблокированных пользователей из state
            dispatch(action);// отправляю в редьюсер
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockUser)