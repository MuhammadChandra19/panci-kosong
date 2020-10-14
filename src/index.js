const { config } = require('dotenv');
const NodeMediaServer = require('node-media-server');
const nmsConfig = require('./config');
const makeRequest = require('./http-request');

//enable env
config();

var nms = new NodeMediaServer(nmsConfig);
nms.run();
nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // session.reject();
});

nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', async (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  let stream_key = getStreamKeyFromStreamPath(StreamPath);
  let session = nms.getSession(id);
  try {
    const liveData = await makeRequest(`${process.env.media_server}/livestream/check?id=${stream_key}`, 'GET')
    if (liveData) {
      makeRequest(`${process.env.socket_queue}/newLiveStream`, 'POST', liveData)
    } else {
      session.reject()
    }
  } catch (e) {
    session.reject();
    throw e
  }
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  let stream_key = getStreamKeyFromStreamPath(StreamPath);
  try {
    makeRequest(`${process.env.media_server}/livestream/end?id=${stream_key}`, 'GET')
  } catch (e) {
    throw e
  }
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

const getStreamKeyFromStreamPath = (path) => {
  let parts = path.split('/');
  return parts[parts.length - 1];
};



