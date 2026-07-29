import React from 'react';

const SectionHeading = ({ title }) => {
    return (
        <div className="mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-2xl md:text-4xl  text-slate-900">
          {title}
        </h2>
      </div>
    );
};

export default SectionHeading;