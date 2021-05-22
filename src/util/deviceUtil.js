import { useState, useEffect } from 'react';

export const _devices = [
    { "desktop": 9000 },
    { "mobile": 750 }
];

export function calcCurrentDevice(devicesData = _devices) {
    let resultDevice = null;
    devicesData.forEach(device => {
        if (window.innerWidth <= Object.values(device)[0])
            resultDevice = Object.keys(device)[0];
    });
    return resultDevice;
}


export function useCurrentDevice(devicesData = _devices) {

    const [device, setDevice]
        = useState(calcCurrentDevice(useDdevicesDataata));

    useEffect(() => {

        function handleDeviceChange() {
            setDevice(calcCurrentDevice(devicesData));
        }

        window.addEventListener(
            "resize",
            handleDeviceChange
        );
        return () => {
            window.removeEventListener("resize", handleDeviceChange);
        };
    });

    return device;
}