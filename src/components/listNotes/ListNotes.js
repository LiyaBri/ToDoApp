//импорт стилей и пунктов списка (заметки)
import './list-notes.css';
import NoteItem from "../note-item/note-item";

//из родительского компонента передаем данные и методы в дочерний, формируем список из заметок
const ListNotes = ({data, deleteItem, onReady, ready, onEdit}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <NoteItem
                key={id} 
                {...itemProps}
                deleteItem={(e) => deleteItem(id)}
                onReady={(e) => onReady(id)} 
                onEdit={(e) => onEdit(id, data)}/>
        )
    })

    return (
        <ul className="app__list">
            {elements}
        </ul>
    )
}

export default ListNotes;