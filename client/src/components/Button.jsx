import styled from "styled-components";

const Btn = styled.button`
  border: 1px solid var(--primary-color);
  padding: 0.5em 1em;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  gap: 0.75em;
  cursor: pointer;
  color: #fff;
  background: #000;
  border: none;
  align-self: center;
  text-align: center;
  width: 100px;
  align-items: center;
  justify-content: center;
  font-size: 2em;
`;

export default function Button({ onClick, disabled, children }) {
  return (
    <Btn onClick={onClick} disabled={disabled}>
      {children}
    </Btn>
  );
}
