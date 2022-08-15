//импорт стилей и компонентов
import { Component } from "react";
import './form-add-note.css';

//формируем класс добавления и редактироования заметок, получем данные от родителя 
class FormAddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            condition: false,
            ready: false
        };
    }
    //функция для обновления пропсов
    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.editTodo.title) {
            this.setState({ title: '' });
        } else {
            this.setState({ title: nextProps.editTodo.title });
        }
    } 
    //функция для получения данных, которые вводит пользователь (заметка) и записи в state
    onValueChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    //отправка данных из формы
    onSubmit = (e) => {
        e.preventDefault(); //отменяем стандартное поведение, перезагрузку старницы
        //если заметка редактиоовалась, то отправляем вместе с id, если нет, то отправляем только данные, которые пользователь ввел: состяние и заметку
        let newTodoTitle = e.target.querySelector('input');
        if (this.props.isEditing) {
            this.props.onAdd(newTodoTitle.value, this.state.condition, this.state.ready, this.props.editTodo.id,);
        } else {
            this.props.onAdd(this.state.title, this.state.condition, this.state.ready);
        }
        newTodoTitle.value = '';

        //обновляем state (сбрасываем данные)
        this.setState({
            title: '',
            condition: false,
            ready: false
        })
    }
    //проверяем какое состояние выбрал пользователь и записываем его 
    onCondition = (e) => {
        if (e.target.value == 'process') {
            this.setState({
                condition: 'process',
            })
        } else if (e.target.value == 'ready'){
            this.setState({
                condition: 'ready',
                ready: true
            })
        } else {
            this.setState({
                condition: false,
            })
        }
    }
    //рендерим компонент
    render() {
        return (
            <div className="addform">
                <h3 className="addform__title">Добавьте или отредактируйте задачу</h3>

                <form className="addform__form" onSubmit={this.onSubmit}>
                    Задача
                    <input
                        type="text" 
                        placeholder="Что нужно сделать?" 
                        className="addform__input"
                        name="title"
                        value={this.state.title}
                        onChange={this.onValueChange} required
                        />
                    <div className="addform__buttons">
                        <div className="addform__select">
                        Установите статус задачи:
                            <input 
                                type="radio" 
                                id="expect" 
                                className="addform__check" 
                                name='condition' 
                                value='expect' 
                                onChange={this.onCondition}/>
                            <label for="expect" className="addform__option"> В ожидании </label>
                            <input 
                                type="radio" 
                                id="process" 
                                className="addform__check" 
                                name='condition' 
                                value='process'
                                onChange={this.onCondition}/>
                            <label for="process" className="addform__option"> Выполняется </label>
                            <input 
                                type="radio" 
                                id="ready" 
                                className="addform__check" 
                                name='condition' 
                                value='ready'
                                onChange={this.onCondition}/>
                            <label for="process" className="addform__option"> Выполнено </label>
                        </div>
                        <button type="submit" className="addform__button">+</button>
                    </div>   
                </form>
            </div>
        )
    }
}
//эспортируем компонент
export default FormAddNote;
