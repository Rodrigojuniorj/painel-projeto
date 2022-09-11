import styled from 'styled-components'

export const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 0.5rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    thead {
      tr {
        th {
          background-color: ${(props) => props.theme['gray-600']} !important;
        }
      }
    }

    th {
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme.white};
      font-size: 0.9rem;
      line-height: 1.6;
      white-space: nowrap;
      text-align: center;

      &:first-child {
        text-align: start;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }

    td {
      padding: 0.2rem;
      font-size: 0.9rem;
      line-height: 1.6;
      vertical-align: middle;
      white-space: nowrap;
      text-align: center;

      &:first-child {
        text-align: start;
        width: 15%;
        padding-left: 1.5rem;
      }
      &:nth-last-child(2) {
        width: 5%;
      }

      &:last-child {
      }
    }
  }
`

export const ModalContent = styled.div`
  h3 {
    display: flex;
    justify-content: center;
    font-weight: 800;
    margin-bottom: 2rem;
  }

  & > button {
    background: transparent;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
    border: none;
    cursor: pointer;
  }

  p {
    &:last-child {
      width: 100%;
      gap: 0.5rem;

      font-size: 1.25rem;
      color: ${(props) => props.theme['gray-400']};

      b {
        color: ${(props) => props.theme['gray-600']};
      }
    }
  }
`

export const SeparaModalContent = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  p {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;

    font-size: 1.25rem;
    color: ${(props) => props.theme['gray-400']};

    b {
      color: ${(props) => props.theme['gray-600']};
    }
  }
`
