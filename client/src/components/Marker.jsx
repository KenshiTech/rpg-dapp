import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { MdDone, MdOutlineErrorOutline } from "react-icons/md";

const LOADER_SIZE = 20;
const LOADER_COLOR = "#fff";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 36px 1fr;
  width: 36px;
  height: 100%;

  & .top {
    grid-row: 1;
    background-color: lightgray;
    margin: 0 12px;
  }

  & .middle {
    grid-row: 2;
    justify-content: center;
    align-items: center;
  }

  & .middle .roundel {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .bottom {
    grid-row: 3;
    margin: 0 12px;
    background-color: lightgray;
  }
`;

export default function Marker({ type, loading, error }) {
  return (
    <Container>
      {type === "start" ? (
        <>
          <div className="middle">
            <div className="roundel">
              {error ? (
                <MdOutlineErrorOutline color={LOADER_COLOR} size={LOADER_SIZE + "px"} />
              ) : loading ? (
                <ClipLoader color={LOADER_COLOR} size={LOADER_SIZE} />
              ) : (
                <MdDone color={LOADER_COLOR} size={LOADER_SIZE + "px"} />
              )}
            </div>
          </div>
          {!loading && <div className="bottom"></div>}
        </>
      ) : type === "middle" ? (
        <>
          <div className="top"></div>
          <div className="middle">
            <div className="roundel">
              {error ? (
                <MdOutlineErrorOutline color={LOADER_COLOR} size={LOADER_SIZE + "px"} />
              ) : loading ? (
                <ClipLoader color={LOADER_COLOR} size={LOADER_SIZE} />
              ) : (
                <MdDone color={LOADER_COLOR} size={LOADER_SIZE + "px"} />
              )}
            </div>
          </div>
          {!loading && <div className="bottom"></div>}
        </>
      ) : type === "end" ? (
        <>
          <div className="top"></div>
          <div className="middle">
            <div className="roundel">
              {error ? (
                <MdOutlineErrorOutline color={LOADER_COLOR} size={LOADER_SIZE + "px"} />
              ) : loading ? (
                <ClipLoader color={LOADER_COLOR} size={LOADER_SIZE} />
              ) : (
                <MdDone color={LOADER_COLOR} size={LOADER_SIZE + "px"} />
              )}
            </div>
          </div>
        </>
      ) : null}
    </Container>
  );
}
