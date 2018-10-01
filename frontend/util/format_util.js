export const formatDistance = (length) => {
    let feet = length * 3.2808399;
    let miles = feet / 5280;
    return (miles.toFixed(2) + " miles");
}

export const formatElevation = (elevationGain) => {
    let feet = elevationGain * 3.2808399;
    return (feet.toFixed(0) + " feet");
}

export const formatTime = (duration) => {
    let minutes = (duration / 60).toFixed(0);
    let hours = Math.floor(minutes / 60);
    if (hours < 1) {
        if (minutes < 10) {
            return ("0:0" + minutes);
        } else {
            return ("0:" + minutes);
        }
    } else {
        minutes = (minutes % 60).toFixed(0);
        if (minutes < 10) {
            return (hours + ":0" + minutes);
        } else {
            return (hours + ":" + minutes);
        }
    }
}

// formatDate courtesy of an App Academy assessment
export const formatDate = (date) => {
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    };
    const daysOfWeek = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    };
    const obj = new Date(date);
    const month = months[obj.getMonth()];
    const day = obj.getDate();
    const year = obj.getFullYear();
    const dayOfWeek = daysOfWeek[obj.getDay()];
    return `${month} ${day}, ${year}`;
}