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
  fission: {
    ffmpeg: FFMPEG_STATIC,
    tasks: [
      {
        rule: "live/*",
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
