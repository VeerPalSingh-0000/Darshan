import React from 'react';
import { useParams } from 'react-router-dom';

const SchoolPage = () => {
  // The 'useParams' hook reads the URL parameter we defined in App.jsx (':slug')
  const { slug } = useParams();

  // Capitalize the first letter for display
  const schoolName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center">School of Thought: {schoolName}</h1>
      <div className="mt-8 max-w-2xl mx-auto text-lg">
        <p>This is where the detailed content for the <strong>{schoolName}</strong> philosophy will be displayed.</p>
        <p className="mt-4">You can now fetch and display data specific to "{slug}" from a database or a local data file.</p>
      </div>
    </div>
  );
};

export default SchoolPage;