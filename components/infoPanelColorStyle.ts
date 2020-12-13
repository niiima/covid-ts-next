import { getColor } from '../utils/color.util';
import alpha from 'color-alpha'
export const selectColorStyles = {
    control: styles => ({ ...styles, backgroundColor: '#999' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? getColor(data.color, 1, 1, false)
                    : isFocused
                        ? alpha(data.color[1] ? data.color[1].color : data.color[0].color, 0.3)
                        : data.color[1] ? data.color[1].color : "white",
            color: isDisabled
                ? 'lightgray'
                : isSelected
                    ? data.color[1].color
                    : data.color[0].color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled || (isSelected ? data.color[1] ? data.color[1].color : data.color[0].color : "white")//alpha(data.color[1].color,1.2))//.alpha(0.3).css()),
            },
        };
    },
    multiValue: (styles, { data }) => ({
        ...styles,
        backgroundColor: data.color[1] ? data.color[1].color : alpha(data.color[0].color, 1.8)
    }),
    multiValueLabel: (styles, { data }) => {
        return {
            ...styles,
            color: getColor(data.color, 0, 1, false)
        }
    },
    multiValueRemove: (styles, { data }) => {
        return {
            ...styles,
            color: data.color[0].color,
            ':hover': {
                backgroundColor: alpha(data.color[1] ? data.color[1].color : data.color[0].color, 0.9),
                color: 'white',
            },
        }
    },
};