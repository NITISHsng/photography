import React from 'react';
import { UserCheck } from 'lucide-react';


const Operator: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <UserCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Operator Management</h2>
        </div>
      </div>
      

    </div>
  )
}

export default Operator