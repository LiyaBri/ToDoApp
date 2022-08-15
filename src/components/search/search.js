//импорт стилей и компонентов
import { Component } from 'react';
import './search.css';

//создаем компонент поиска
class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }
    //получаем данные, которые вводит пользователь и вызываем метод из родительского компонента для передачи их
    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }
    //рендерим компонент (форму) поика
    render() {
        return (
            <div className='search'>
                <p className='search__title'>Введите имя задачи</p>
                <input type="text"
                    className="search__input"
                    placeholder="Найти задачу"
                    value={this.state.term}
                    onChange={this.onUpdateSearch}/>
            </div>
        )
    }
}

export default SearchPanel;