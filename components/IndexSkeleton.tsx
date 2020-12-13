import Skeleton from 'react-loading-skeleton'

const IndexSkeleton = () => (
    <>
        <Skeleton width={180} height={90} style={{ fontSize: 16, marginLeft: 20, lineHeight: 2, backgroundColor: "#555", opacity: 0.7 }} />
        <Skeleton width={180} height={90} style={{ fontSize: 16, marginLeft: 40, lineHeight: 2, backgroundColor: "#555", opacity: 0.7 }} />
        <Skeleton width={180} height={90} style={{ fontSize: 16, marginLeft: 40, lineHeight: 2, backgroundColor: "#555", opacity: 0.7 }} />

        <hr />
        <Skeleton width={"99%"} style={{ marginLeft: "0.5%", fontSize: 18, lineHeight: 3, backgroundColor: "#555", opacity: 0.7 }} />
        <hr />
        <Skeleton style={{ fontSize: 20, lineHeight: 2, backgroundColor: "#999", opacity: 0.7 }} />
        <hr />
        <Skeleton style={{ fontSize: 20, lineHeight: 9, backgroundColor: "transparent", border: "4px solid white", opacity: 0.7 }} />
    </>
);

export default IndexSkeleton;