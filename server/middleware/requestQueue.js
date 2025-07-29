const requestQueue = [];
const maxConcurrentRequests = 3; 
let activeRequests = 0;

const queueMiddleware = (req, res, next) => {
  if (activeRequests >= maxConcurrentRequests) {
    requestQueue.push({ req, res, next });
    
    res.status(202).json({
      message: "Your request is queued and will be processed shortly",
      position: requestQueue.length,
      estimatedWaitTime: `${requestQueue.length * 30} seconds`
    });
    
    return;
  }
  
  activeRequests++;
  
  const originalSend = res.send;
  res.send = function(data) {
    activeRequests--;
    processQueue();
    return originalSend.call(this, data);
  };
  
  next();
};

const processQueue = () => {
  if (requestQueue.length > 0 && activeRequests < maxConcurrentRequests) {
    const { req, res, next } = requestQueue.shift();
    activeRequests++;
    
    const originalSend = res.send;
    res.send = function(data) {
      activeRequests--;
      processQueue();
      return originalSend.call(this, data);
    };
    
    next();
  }
};

module.exports = queueMiddleware;

