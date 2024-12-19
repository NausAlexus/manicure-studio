import "./ServicesSelect.css"
import ServicesConfig from "../../../config/services-config.json";


const ServicesSelect = () => {
    const ServicesSelect = ServicesConfig["services-items"]


    return (

        <>
        <h3 className="reservation-title">Выбор услуги:</h3>
        {ServicesSelect.map((item) => (
            <div  key={item.title} className="ServicesSelect">
                <ul>
                    <li>{item.title}</li>
                </ul>
            </div>
        ))}
        
        </>
    );
}
 
export default ServicesSelect;