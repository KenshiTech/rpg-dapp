import styled from "styled-components";

const Btn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5em;
  border-radius: 4px;
  background-color: #5688c7;
  font-size: 2em;
  color: #fff;
  border: none;
  padding: 1em;
  cursor: pointer;
  box-shadow: #336199 0px 7px 0px 0px;
  margin: 3rem 0;
  align-self: center;
  cursor: pointer;

  &:hover {
    box-shadow: #336199 0px 9px 0px 0px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: #336199 0px 2px 0px 0px;
    transform: translateY(5px);
  }
`;

export default function Button({ onClick, disabled, children }) {
  return (
    <Btn onClick={onClick} disabled={disabled}>
      {children}
    </Btn>
  );
}
