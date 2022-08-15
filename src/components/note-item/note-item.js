//импорт стилей
import './note-item.css';

const NoteItem = (props) => {
    //наследуем из родительского компонента данные и методы
    const {title, condition, deleteItem, onReady, ready, onEdit} = props;
    let noteIcon = 'note__ind';
    let noteItem = 'note__item';
    let titleNew = title;
    //проверяем помещается ли заметка в поле с заметками, если нет, то обрезаем ее и ставим ...
    if (titleNew.length > 19) {
        titleNew = titleNew.slice(0, 18) + '...';
    } 
    //проверяем состояние и присваем заметке класс для стилизации
    if (condition == 'process') {
        noteIcon += ' process';
    } else if (condition == 'ready') {
        noteIcon += ' ready';
        noteItem += ' ready-item'
    }
    else {
        noteIcon += ' expect';
    }
    //проверяем выполнена ли заметка и присваем ей класс для стилизации
    if (ready) {
        noteIcon += ' ready';
        noteItem += ' ready-item'
    }
    //формируем заметку
    return (
        <li className={noteItem}>
            <div className='note__text'>
                <button type="button" className={noteIcon} onClick={onReady}/>
                <div className="note__title">{titleNew}</div>
            </div>

            <div className='note__icons'>
                <div className='note__icon' onClick={onEdit}>
                    <img src='pen.png'/>
                </div>
                <div className='note__icon' onClick={deleteItem}>
                    <img src='close.png'/>
                </div>
            </div>
        </li>
    )
}
//экспортируем компонент
export default NoteItem;

