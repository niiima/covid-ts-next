import ReactLoading from 'react-loading';
import styled from 'styled-components'
const Loading = ({ type, color }) => (
    <LoadingCenter>
        <ReactLoading className="text-center" type={type} color={color} height={400} width={300} />
    </LoadingCenter>
);

const LoadingCenter = styled.div`
margin-left:300px;
text-align:center;
width:200px;
//transform:scale(0.5)
`


export default Loading;