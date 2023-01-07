import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const Table = styled(motion.table)`
  border-spacing: 0;
  display: table;
  font-size: 1rem;
  line-height: 1.2rem;
  width: 100%;
  word-break: keep-all;

  & tbody {
    flex-grow: 1;
  }

  & tr:not(:last-of-type) {
    border-bottom: 1px solid #ececec;
    width: 100%;
  }

  & th {
    font-size: 0.875rem;
    font-weight: normal;
    padding: 8px 0;
    text-align: left;
    vertical-align: initial;
    white-space: nowrap;
  }

  & td {
    font-weight: 500;
    height: 40px;
    padding: 8px 16px;
    white-space: pre-line;
  }

  ${({ theme }) => css`
    @media ${theme.device.md} {
      width: 50%;
    }
    @media ${theme.device.lg} {
      width: 100%;
      overflow-x: hidden;
    }
  `}
`;

const Numbered = styled.span<{ light?: boolean }>`
  display: block;
  width: 100%;

  & span {
    font-weight: 300;
  }

  &:not(:last-of-type) {
    padding-bottom: 6px;
  }

  ${({ light }) =>
    light &&
    css`
      font-weight: 300;
    `}
`;

const TypesCell = styled.td`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

export { Table, Numbered, TypesCell };
