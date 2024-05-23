import {Alert} from "react-bootstrap";
import {useEffect, useState} from "react";
import {format} from "date-fns";
import "./deadline-alert.css";
const DeadlineAlert = ({ checkDeadlines }) => {
    const [visibleAlerts, setVisibleAlerts] = useState({});
    const getAlertVariant = (deadline) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const timeDifference = deadlineDate - now;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (daysDifference < 1) {
            return 'danger';
        } else if (daysDifference <= 3) {
            return 'warning';
        } else {
            return null;
        }
    };

    const handleClose = (index) => {
        setVisibleAlerts(prevState => ({
            ...prevState,
            [index]: false,
        }));
    };

    useEffect(() => {
        if (checkDeadlines) {
            const initialVisibleAlerts = checkDeadlines.reduce((acc, item, index) => {
                const variant = getAlertVariant(item.deadline);
                if (variant) {
                    acc[index] = true;
                }
                return acc;
            }, {});
            setVisibleAlerts(initialVisibleAlerts);
        }
    }, [checkDeadlines]);

    return (
        <>
            {checkDeadlines &&
                checkDeadlines.map((item, index) => {
                    const variant = getAlertVariant(item.deadline);
                    return (
                        visibleAlerts[index] && (
                            <div key={index} className="deadline-alert" style={{top: 20 + index * 80}}>
                                <Alert variant={variant} onClose={() => handleClose(index)} dismissible>
                                    <Alert.Heading>Project Deadline</Alert.Heading>
                                    <p className="project-name">Project: {item.projectName}</p>
                                    <p>Deadline: {format(item.deadline, 'dd.MM.yyyy HH:mm')}</p>
                                </Alert>
                            </div>
                        )
                    );
                })}
        </>
    );
};
export default DeadlineAlert;