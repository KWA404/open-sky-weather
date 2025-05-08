import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 mb-6 flex items-center">
      <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-3 flex-shrink-0" />
      <p className="text-red-700 dark:text-red-300">{message}</p>
    </div>
  );
};

export default ErrorMessage;