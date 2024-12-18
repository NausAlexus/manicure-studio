import './Item.css';
function Item(props) {
	return (
		<div className='item-container'>
			<h3 className='item-container-title'>{props.titleItem}</h3>
			<p className='item-container-description'>{props.descriptionItem}</p>
			<div className='item-content'>
				<ul>
					{props.serviceItem.map(item => (
						<li key={item.name}>
							{item.name} | {item.price} бел.руб.
						</li>
					))}
				</ul>
			</div>
			<button onClick={props.visibleClick} className='item-container-btn'>Забронировать визит</button>
		</div>
	);
};

export default Item;