//импорт стилей и компонентов
import { Component } from 'react';
import './app.css';
import FormAddNote from '../form-add/form-add-note';
import ListNotes from '../listNotes/ListNotes';
import SearchPanel from '../search/search';

//приложение
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
            ], //массив данных
            term: '', //переменная для поиска заметок
            edit: false, //переменная-флаг для редактирования текста
            editTodo: {}, //данные, которые будем редактировать
        }
        this.dataId = 1; //для ключей
    }

    //функция для удаления заметок через идентификатор. Получаем ключ заметки, ищем в массиве заметку с таким ключем, создаем новый массив без этой заметки и записываем его в state 
    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    //функция для поиска заметок. Получаем все заметки и то, что пользователь вводит в строку поиска. Все приводим к нижнему регистру, чтобы поиск не зависел от регистра. Если пользователь ничего не ввел, то с полем с заметками ничего не происходит. Если пользователь что-то ввел, то фильтруем заметки по title (содержание заметки) и оставляем в поле те, что подходят под заданные условия поиска
    searchNote = (items, term) => {
        term = term.toLowerCase();
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            item = item.title.toLowerCase();
            return item.indexOf(term) > -1;
        })
    }

    //обновляем в state переменную, ответственную за поиск. Записываем данные, которые пользователь вводит в строку поиска
    onUpdateSearch = (term) => {
        this.setState({term});
    }

    //функция для добавления новых заметок. Передаем название заметки, которое пользователь вводит, ее уникальный ключ и состояние, которое выбрал пользователь
    addItem = (title, condition, ready, id) => {
        //если такая заметка уже существует и ее просто редактировали, то находим ее и обновляем ее содержание и состояние в state, а также сбрасываем переменные, отвечающие за редактирование
        if (id) {
            this.state.data.find((elem, index) => {
                if (elem.id === id) {
                    this.state.data.splice(index, 1, { "title": title, "condition": condition, "id": id, "ready": ready});
                }
            });
            this.setState({ data: this.state.data });
            this.setState({ isEditing: false, editTodo: {},});
        } else {
            //если это новая заметка, то создаем новый массив под нее и вносим его в state
            const newItem = {
                title, 
                condition: condition,
                ready: ready,
                id: this.dataId++
            }
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            }); 
        }
    }
    //проверка на то, выполнена задача или нет. Если она не выполнена, то отмечаем как выполненную и наоборот.
    onReady = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            if (data[index].ready) {
                data[index].ready = false;
            } else {
                data[index].ready = true;
            }
            const newArr = [...before, data[index], ...after]
            return {
                data: newArr
            }
        })
    }

    // редактирование заметки. Получаем ключ заметки, которую пользователь хочет отредактировать. Ставим переменную отвечающую за редактироование в активное состояние и передаем данные для редактирования в массив editTodo
    editTodo = (id) => {
        const editElem = this.state.data.find((item) => {
            if (item.id === id) {
                return item}
        });
        this.setState({edit: true, editTodo: editElem});
    }
    //рендерим приложение
    render() {
        const {data, term} = this.state;
        const visibleData = this.searchNote(data, term); //видимый массив с учетом поиска

        return (
            <div className='app'>
                {/* шапка */}
                <h1 className='app__title'>Приложение ToDo List</h1>
                <p className='app__subtitle'>Чтобы точно ничего не забыть</p>
                {/* основное тело приложения */}
                <div className='app__body'>
                    <div className='app__notes'>
                        <div className='app__icon'><img src="to-do-list.png"/></div>
                        {/* список заметок */}
                        <ListNotes 
                            data={visibleData}
                            deleteItem={this.deleteItem}
                            onReady={this.onReady}
                            onEdit={this.editTodo}/>
                    </div>
                    {/* форма добавления/редактирования заметок, форма поиска */}
                    <div className='app__edit'>
                        <div className='app__icon'><img src="editing.png"/></div>
                        <FormAddNote onAdd={this.addItem} deleteItem={this.deleteItem} isEditing={this.state.edit} editTodo={this.state.editTodo} value={this.state.value}/>
                        <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;