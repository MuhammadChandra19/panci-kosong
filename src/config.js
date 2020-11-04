const FFMPEG_STATIC = require('ffmpeg-static')

module.exports = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: false,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8888,
    allow_origin: '*',
    mediaroot: './media',
  },
  trans: {
    ffmpeg: FFMPEG_STATIC,
    tasks: [
      {
        app: 'live',
        vc: "-c:v libx264 -preset veryfast -tune zerolatency -maxrate 1000k -bufsize 1000k -g 60 -r 30 -s 858x480",
        ac: "-c:a aac -ac 1 -strict -2 -b:a 128k ",
        rtmp: true,
        rtmpApp: 'live2',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  },
  fission: {
    ffmpeg: FFMPEG_STATIC,
    tasks: [
      {
        rule: "live-src/*",
        model: [
          {
            ab: "128k",
            vb: "1500k",
            vs: "1280x720",
            vf: "30",
          },
          {
            ab: "96k",
            vb: "1000k",
            vs: "854x480",
            vf: "24",
          },
          {
            ab: "96k",
            vb: "600k",
            vs: "640x360",
            vf: "20",
          },
        ]
      },
    ]
  }
}
