'use client'

import React, { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
// import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize } from 'lucide-react'

export default function VideoPlayer({ 
  src = 'https://rs20.seedr.cc/ff_get/5542650511/www.1TamilMV.wf%20-%20Vettaiyan%20(2024)%20Tamil%20HQ%20HDRip%20-%20720p%20-%20x264%20-%20(DD_5.1%20-%20192Kbps%20_%20AAC)%20-%201.4GB%20-%20ESub.mkv?st=M1IQshFjBI_vywjNs7nFYQ&e=1731601528'
}) {
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js")
      videoElement.classList.add('vjs-big-play-centered')
      videoRef.current?.appendChild(videoElement)

      const player = videojs(videoElement, {
        controls: true,
        fluid: true,
        sources: [{ 
          src, 
          type: src.endsWith('.mkv') ? 'video/x-matroska' : 'video/mp4'
        }]
      }, () => {
        console.log('player is ready')
      })

      playerRef.current = player

      player.on('error', () => {
        setError('Unable to load video. Please check the video source.')
      })

      // Add custom buttons
      const controlBar = player.controlBar

      // Add skip backward button
      controlBar.addChild('button', {
        clickHandler: () => player.currentTime(player.currentTime() - 10),
        controlText: 'Back 10s',
        className: 'vjs-skip-back-10'
      }, 1)

      // Add skip forward button
      controlBar.addChild('button', {
        clickHandler: () => player.currentTime(player.currentTime() + 10),
        controlText: 'Forward 10s',
        className: 'vjs-skip-forward-10'
      }, 3)
    }
  }, [src])

  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}
      <div data-vjs-player>
        <div ref={videoRef} className="video-js  vjs-theme-city " />
      </div>
      <style jsx global>{`
        .video-js .vjs-skip-back-10,
        .video-js .vjs-skip-forward-10 {
          cursor: pointer;
        }
       
        .video-js .vjs-error-display {
          display: none;
        }
      `}</style>
    </div>
  )
}
