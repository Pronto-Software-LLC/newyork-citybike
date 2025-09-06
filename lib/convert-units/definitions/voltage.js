const SI = {
    V: {
        name: {
            singular: 'Volt',
            plural: 'Volts',
        },
        to_anchor: 1,
    },
    mV: {
        name: {
            singular: 'Millivolt',
            plural: 'Millivolts',
        },
        to_anchor: 0.001,
    },
    kV: {
        name: {
            singular: 'Kilovolt',
            plural: 'Kilovolts',
        },
        to_anchor: 1000,
    },
};
const measure = {
    systems: {
        SI,
    },
};
export default measure;
