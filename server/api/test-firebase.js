const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Test Firebase connection
router.get('/test-firebase', async (req, res) => {
  try {
    console.log('🧪 Testing Firebase connection...');
    
    // Check if Firebase is initialized
    if (!admin.apps.length) {
      return res.status(500).json({
        success: false,
        error: 'Firebase not initialized',
        details: 'Firebase Admin SDK not properly configured'
      });
    }

    const db = admin.firestore();
    
    // Test basic Firestore operations
    console.log('📁 Testing Firestore connection...');
    
    // Try to create a test document
    const testDoc = db.collection('test').doc('connection-test');
    await testDoc.set({
      test: true,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      message: 'Firebase connection test successful'
    });
    
    console.log('✅ Test document created successfully');
    
    // Try to read the test document
    const doc = await testDoc.get();
    console.log('✅ Test document read successfully');
    
    // Clean up - delete the test document
    await testDoc.delete();
    console.log('✅ Test document cleaned up');
    
    // Test the demo_bookings collection
    console.log('📋 Testing demo_bookings collection...');
    const demoBookingsRef = db.collection('demo_bookings');
    const snapshot = await demoBookingsRef.limit(1).get();
    
    console.log('✅ demo_bookings collection accessible');
    
    res.json({
      success: true,
      message: 'Firebase connection test successful',
      details: {
        firebaseInitialized: true,
        firestoreAccessible: true,
        demoBookingsCollection: true,
        testDocumentCreated: true,
        testDocumentRead: true,
        testDocumentDeleted: true
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Firebase connection test failed',
      details: error.message,
      stack: error.stack
    });
  }
});

// Test Firebase service account
router.get('/test-firebase-config', (req, res) => {
  try {
    console.log('🔧 Testing Firebase configuration...');
    
    if (!admin.apps.length) {
      return res.status(500).json({
        success: false,
        error: 'Firebase not initialized'
      });
    }
    
    const app = admin.app();
    const options = app.options;
    
    res.json({
      success: true,
      message: 'Firebase configuration test',
      details: {
        projectId: options.projectId,
        databaseURL: options.databaseURL,
        storageBucket: options.storageBucket,
        serviceAccountEmail: options.credential?.clientEmail || 'Not available',
        serviceAccountProjectId: options.credential?.projectId || 'Not available'
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Firebase config test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Firebase configuration test failed',
      details: error.message
    });
  }
});

module.exports = router;
