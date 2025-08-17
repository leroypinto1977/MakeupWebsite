import React, { useEffect, useState } from 'react';
import { sanityClient, fetchTestimonials } from '../lib/sanity';

const SanityTest = () => {
  const [testResults, setTestResults] = useState({
    envVars: {},
    connection: null,
    testimonials: [],
    rawQuery: null,
    error: null,
    logs: []
  });

  const addLog = (message) => {
    console.log(message);
    setTestResults(prev => ({
      ...prev,
      logs: [...prev.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  };

  useEffect(() => {
    const runTests = async () => {
      addLog('🚀 Starting Sanity tests...');
      
      // Test 1: Check environment variables
      const envVars = {
        projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
        dataset: import.meta.env.VITE_SANITY_DATASET,
        apiVersion: import.meta.env.VITE_SANITY_API_VERSION
      };

      addLog(`📋 Environment variables: ${JSON.stringify(envVars)}`);

      try {
        // Test 2: Basic connection
        addLog('🔌 Testing basic connection...');
        const basicQuery = await sanityClient.fetch(`*[0..0]`);
        addLog(`✅ Basic connection successful: ${basicQuery.length} documents`);
        
        // Test 3: Test raw testimonials query
        addLog('💬 Testing raw testimonials query...');
        const rawTestimonials = await sanityClient.fetch(`*[_type == "testimonial"]`);
        addLog(`� Raw testimonials found: ${rawTestimonials.length}`);
        
        // Test 4: Test with showOnHomepage filter
        const filteredTestimonials = await sanityClient.fetch(`*[_type == "testimonial" && showOnHomepage == true]`);
        addLog(`🏠 Homepage testimonials: ${filteredTestimonials.length}`);
        
        // Test 5: Fetch testimonials using helper function
        addLog('🔄 Testing fetchTestimonials function...');
        const testimonials = await fetchTestimonials();
        addLog(`✨ Function result: ${testimonials.length} testimonials`);

        setTestResults(prev => ({
          ...prev,
          envVars,
          connection: 'success',
          testimonials,
          rawQuery: rawTestimonials,
          error: null
        }));

      } catch (error) {
        addLog(`❌ Error: ${error.message}`);
        setTestResults(prev => ({
          ...prev,
          envVars,
          connection: 'failed',
          error: error.message
        }));
      }
    };

    runTests();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.95)', 
      color: 'white', 
      padding: '15px', 
      borderRadius: '8px',
      fontSize: '11px',
      maxWidth: '450px',
      maxHeight: '80vh',
      overflow: 'auto',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>🔍 Sanity Debug Panel</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>📡 Connection:</strong> {testResults.connection || 'testing...'}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>💬 Testimonials:</strong> {testResults.testimonials.length} found
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>📋 Raw Query Results:</strong> {testResults.rawQuery?.length || 0} total
      </div>

      {testResults.testimonials.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <strong>✨ Sample Data:</strong>
          <pre style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '4px', margin: '5px 0' }}>
            {JSON.stringify(testResults.testimonials[0], null, 2)}
          </pre>
        </div>
      )}

      {testResults.error && (
        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#ff6b6b' }}>❌ Error:</strong>
          <pre style={{ color: '#ff6b6b', fontSize: '10px' }}>{testResults.error}</pre>
        </div>
      )}

      <div>
        <strong>📝 Logs:</strong>
        <div style={{ maxHeight: '200px', overflow: 'auto', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '4px', margin: '5px 0' }}>
          {testResults.logs.map((log, index) => (
            <div key={index} style={{ fontSize: '10px', marginBottom: '2px' }}>{log}</div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={() => window.location.reload()} 
        style={{ 
          background: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          padding: '5px 10px', 
          borderRadius: '4px', 
          fontSize: '11px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        🔄 Refresh
      </button>
    </div>
  );
};

export default SanityTest;
