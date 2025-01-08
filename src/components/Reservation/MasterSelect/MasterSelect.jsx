import './MasterSelect.css';

function MasterSelect({ mastersData, onMasterSelect, selectedMaster }) {
    return (
        <div className='master-select'>
            <h3 className='master-select-title'>Выбор специалиста:</h3>
            <ul className='master-select-items'>
                {mastersData.length > 0 ? (
                    mastersData.map(el => (
                        <li 
                            className={`master-select-item ${selectedMaster && selectedMaster.id === el.id ? 'selected' : ''}`} // Добавление класса
                            key={el.id}
                            onClick={() => onMasterSelect(el)} // Выполнение функции обработки выбора мастера
                        >
                            <img className='master-select-img' src={el.avatar} alt="Master" />
                            <div className='master-select-data'>
                                <h3 className='master-select-data-title'>{el.name}</h3>
                                <p className='master-select-data-role'>{el.role}</p>
                                <p className='master-select-data-rating'>⭐{el.rating.toFixed(1)}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Нет доступных специалистов.</p>
                )}
            </ul>
        </div>
    );
}

export default MasterSelect;