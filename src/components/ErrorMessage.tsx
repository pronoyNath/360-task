
import React from 'react';
import { Alert } from 'antd';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Alert
      message="Error"
      description={message}
      type="error"
      showIcon
      className="mb-6"
    />
  );
};

export default ErrorMessage;
