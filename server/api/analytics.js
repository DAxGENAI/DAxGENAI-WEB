const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// In-memory storage for analytics (fallback)
let localAnalytics = [];

// Store user behavior analytics
router.post('/analytics', async (req, res) => {
  try {
    const { event, properties, timestamp, userAgent, url, userId, sessionId } = req.body;
    
    // Validate required fields
    if (!event) {
      return res.status(400).json({ 
        success: false, 
        error: 'Event name is required' 
      });
    }

    // Create analytics document
    const analyticsData = {
      event,
      properties: properties || {},
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || req.headers['user-agent'] || '',
      url: url || req.headers.referer || '',
      userId: userId || null, // null for anonymous users
      sessionId: sessionId || null,
      ipAddress: req.ip || req.connection.remoteAddress || '',
      createdAt: new Date().toISOString(),
      // Add geolocation data if available
      geoLocation: {
        country: req.headers['cf-ipcountry'] || null,
        city: req.headers['cf-ipcity'] || null,
      }
    };

    // Try to store in Firestore first
    try {
      const docRef = await admin.firestore()
        .collection('userBehavior')
        .add(analyticsData);

      console.log(`Analytics event stored in Firebase: ${event} (ID: ${docRef.id})`);

      res.json({ 
        success: true, 
        message: 'Analytics event stored successfully in Firebase',
        eventId: docRef.id,
        storage: 'firebase'
      });
    } catch (firebaseError) {
      // Fallback to local storage
      const localId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localAnalytics.push({
        id: localId,
        ...analyticsData
      });

      console.log(`Analytics event stored locally: ${event} (ID: ${localId})`);
      console.log('Firebase error:', firebaseError.message);

      res.json({ 
        success: true, 
        message: 'Analytics event stored locally (Firebase unavailable)',
        eventId: localId,
        storage: 'local',
        firebaseError: firebaseError.message
      });
    }

  } catch (error) {
    console.error('Error storing analytics:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to store analytics event',
      details: error.message 
    });
  }
});

// Get analytics summary (admin only)
router.get('/analytics/summary', async (req, res) => {
  try {
    const { startDate, endDate, eventType } = req.query;
    
    // Try to get from Firebase first
    try {
      let query = admin.firestore().collection('userBehavior');
      
      // Add date filters if provided
      if (startDate) {
        query = query.where('timestamp', '>=', startDate);
      }
      if (endDate) {
        query = query.where('timestamp', '<=', endDate);
      }
      if (eventType) {
        query = query.where('event', '==', eventType);
      }
      
      const snapshot = await query.limit(1000).get();
      
      const events = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Generate summary
      const summary = {
        totalEvents: events.length,
        uniqueUsers: new Set(events.filter(e => e.userId).map(e => e.userId)).size,
        eventTypes: events.reduce((acc, event) => {
          acc[event.event] = (acc[event.event] || 0) + 1;
          return acc;
        }, {}),
        topPages: events
          .filter(e => e.event === 'page_view')
          .reduce((acc, event) => {
            const page = event.properties?.page_name || 'unknown';
            acc[page] = (acc[page] || 0) + 1;
            return acc;
          }, {}),
        timeRange: {
          start: startDate || 'all',
          end: endDate || 'all'
        },
        storage: 'firebase'
      };
      
      res.json({
        success: true,
        summary,
        events: events.slice(0, 50) // Return first 50 events
      });
    } catch (firebaseError) {
      // Fallback to local data
      let events = localAnalytics;
      
      // Apply filters
      if (startDate) {
        events = events.filter(e => e.timestamp >= startDate);
      }
      if (endDate) {
        events = events.filter(e => e.timestamp <= endDate);
      }
      if (eventType) {
        events = events.filter(e => e.event === eventType);
      }
      
      const summary = {
        totalEvents: events.length,
        uniqueUsers: new Set(events.filter(e => e.userId).map(e => e.userId)).size,
        eventTypes: events.reduce((acc, event) => {
          acc[event.event] = (acc[event.event] || 0) + 1;
          return acc;
        }, {}),
        topPages: events
          .filter(e => e.event === 'page_view')
          .reduce((acc, event) => {
            const page = event.properties?.page_name || 'unknown';
            acc[page] = (acc[page] || 0) + 1;
            return acc;
          }, {}),
        timeRange: {
          start: startDate || 'all',
          end: endDate || 'all'
        },
        storage: 'local'
      };
      
      res.json({
        success: true,
        summary,
        events: events.slice(0, 50),
        firebaseError: firebaseError.message
      });
    }

  } catch (error) {
    console.error('Error getting analytics summary:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get analytics summary',
      details: error.message 
    });
  }
});

// Get user journey (for specific user)
router.get('/analytics/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 100 } = req.query;
    
    // Try Firebase first
    try {
      const snapshot = await admin.firestore()
        .collection('userBehavior')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .limit(parseInt(limit))
        .get();
      
      const events = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      res.json({
        success: true,
        userId,
        events,
        totalEvents: events.length,
        storage: 'firebase'
      });
    } catch (firebaseError) {
      // Fallback to local data
      const events = localAnalytics
        .filter(e => e.userId === userId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, parseInt(limit));
      
      res.json({
        success: true,
        userId,
        events,
        totalEvents: events.length,
        storage: 'local',
        firebaseError: firebaseError.message
      });
    }

  } catch (error) {
    console.error('Error getting user journey:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get user journey',
      details: error.message 
    });
  }
});

module.exports = router;
