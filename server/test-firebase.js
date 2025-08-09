const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./credentials/service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'daxgenai-dfdc3'
});

async function testFirebase() {
  try {
    console.log('Testing Firebase connection...');
    
    // Test 1: Try to read from a collection
    const db = admin.firestore();
    const testDoc = await db.collection('test').doc('test').get();
    console.log('✅ Read test successful');
    
    // Test 2: Try to write to userBehavior collection
    const analyticsRef = await db.collection('userBehavior').add({
      event: 'test',
      timestamp: new Date().toISOString(),
      test: true
    });
    console.log('✅ Write to userBehavior successful, ID:', analyticsRef.id);
    
    // Test 3: Try to write to demoBookings collection
    const bookingRef = await db.collection('demoBookings').add({
      name: 'Test User',
      email: 'test@example.com',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('✅ Write to demoBookings successful, ID:', bookingRef.id);
    
    // Clean up test documents
    await analyticsRef.delete();
    await bookingRef.delete();
    console.log('✅ Cleanup successful');
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error.message);
    console.error('Error details:', error);
  }
}

testFirebase();
