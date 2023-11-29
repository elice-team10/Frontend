import styled from 'styled-components';
import theme from '../../config/theme';

const ErrorBlockContainer = styled.div`
  .error-block {
    background-color: #eee;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 4px;
    color: #890b35;
    display: flex;
    gap: 2rem;
    align-items: center;
    text-align: left;
  }
  .error-block-icon {
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    color: #fff;
    background-color: ${theme.colors.primary};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .error-block h2 {
    color: ${theme.colors.text};
    font-size: 1.25rem;
    margin: 0;
  }

  .error-block p {
    color: ${theme.colors.text};
    margin: 0;
  }
`;

export default function ErrorBlock({ title, message }) {
  return (
    <ErrorBlockContainer>
      <div className="error-block">
        <div className="error-block-icon">!</div>
        <div className="error-block-text">
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
      </div>
    </ErrorBlockContainer>
  );
}
