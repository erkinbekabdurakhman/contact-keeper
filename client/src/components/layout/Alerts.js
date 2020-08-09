import React, { useContext, use} from 'react';
import AlertContext from '../../Context/alert/alertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext);

    return(
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => {
            return <div key={alert.id} className={`alert alert-${alert.type}`}>
                        <i className="fa fa-info-circle" /> {alert.msg}
                    </div>
        })
    )
}

export default Alerts;