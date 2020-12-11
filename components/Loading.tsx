import ReactLoading from 'react-loading';
import styled from 'styled-components'
const Loading = ({ type, color,height = 400, width =300 }) => (
    <LoadingCenter>
        <ReactLoading className="text-center" type={type} color={color} height={height} width={width} />
    </LoadingCenter>
);

const LoadingCenter = styled.div`
text-align:center;
`
export default Loading;