const spawn = require('child_process')
const FFMPEG_STATIC = require('ffmpeg-static')
const generateStreamThumbnail = (stream_key) => {
  const args = [
    '-y',
    '-i', `${process.env.BASE_URL_MEDIA_STREAM}/live/${stream_key}/index.m3u8`,
    '-ss', '00:00:01',
    '-vframes', '1',
    '-vf', 'scale=-2:300',
    'media/thumbnails/' + stream_key + '.png',
  ];
  spawn(FFMPEG_STATIC, args, {
    detached: true,
    stdio: 'ignore'
  }).unref();

}

module.exports = { generateStreamThumbnail }
