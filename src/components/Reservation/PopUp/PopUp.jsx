import './PopUp.css';

export default function PopUp(props) {
    return (
        <>
            <div className='pop-up-background' style={{ display: props.isVisiblePopUp ? "block" : "none"}}></div>
            <div className='pop-up-container' style={{ transform: `translate(-50%, -50%) scale(${props.isVisiblePopUp ? 1 : 0})` }}>
                <p>{props.formMessage}</p>
            </div>
        </>
    )
}