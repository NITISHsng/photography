import FeedbackForm from '@/components/FeedbackForm';
import React from 'react';

const FeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage;