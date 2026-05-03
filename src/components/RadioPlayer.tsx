import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RADIO_TRACKS } from '../data/radioTracks'
import { Disc, Pause, Play, SkipBack, SkipForward, Volume, VolumeMute } from './icons'

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = RADIO_TRACKS[trackIndex]

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((e) => console.log('Audio play failed:', e))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changeTrack = (direction: 'next' | 'prev') => {
    const newIndex =
      direction === 'next'
        ? (trackIndex + 1) % RADIO_TRACKS.length
        : (trackIndex - 1 + RADIO_TRACKS.length) % RADIO_TRACKS.length
    setTrackIndex(newIndex)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      audioRef.current.volume = isMuted ? 0 : volume
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log('Audio play failed:', e))
      }
    }
  }, [trackIndex])

  const handleTrackEnd = () => {
    changeTrack('next')
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const toggleMute = () => setIsMuted(!isMuted)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    setVolume(v)
    if (v > 0 && isMuted) setIsMuted(false)
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-end">
      <audio
        key={currentTrack.file}
        ref={audioRef}
        src={currentTrack.file}
        onEnded={handleTrackEnd}
        onError={() => console.warn('Radio: failed to load', currentTrack.file)}
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black dark:bg-white border-4 border-white dark:border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 rounded-xl flex items-center gap-3 max-w-[340px]"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className={`w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center border-2 border-white dark:border-black ${!isPlaying ? 'grayscale' : ''}`}
          >
            <Disc className="text-white dark:text-black w-6 h-6" />
          </motion.div>
          {isPlaying && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-pink-500"
            />
          )}
        </div>

        <div className="flex flex-col overflow-hidden w-40">
          <div className="text-[10px] font-bold text-pink-500 uppercase tracking-wider">Radio Espacial BH</div>
          <div className="relative h-5 overflow-hidden w-full">
            <motion.div
              key={trackIndex}
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="whitespace-nowrap text-white dark:text-black font-mono text-xs"
            >
              {currentTrack.name} • {currentTrack.name} •
            </motion.div>
          </div>
          <div className="text-[9px] font-mono text-gray-400 dark:text-gray-500">
            {trackIndex + 1}/{RADIO_TRACKS.length}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="group/vol flex items-center gap-1">
            <button
              type="button"
              onClick={toggleMute}
              className="w-7 h-7 bg-white dark:bg-black border border-black dark:border-white flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-800 active:translate-y-px transition-all"
              title="Mute"
            >
              {isMuted || volume === 0 ? (
                <VolumeMute className="w-3.5 h-3.5 text-black dark:text-white" />
              ) : (
                <Volume className="w-3.5 h-3.5 text-black dark:text-white" />
              )}
            </button>
            <div className="group-hover/vol:w-16 group-hover/vol:opacity-100 group-hover/vol:pointer-events-auto w-0 opacity-0 pointer-events-none transition-all duration-150 overflow-hidden">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-pink-500 cursor-pointer"
                title="Volumen"
              />
            </div>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => changeTrack('prev')}
              className="w-7 h-7 bg-white dark:bg-black border border-black dark:border-white flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-800 active:translate-y-px transition-all"
              title="Previous"
            >
              <SkipBack className="w-3.5 h-3.5 text-black dark:text-white" />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="w-7 h-7 bg-white dark:bg-black border border-black dark:border-white flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-800 active:translate-y-px transition-all"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-black dark:text-white" />
              ) : (
                <Play className="w-3.5 h-3.5 text-black dark:text-white" />
              )}
            </button>
            <button
              type="button"
              onClick={() => changeTrack('next')}
              className="w-7 h-7 bg-white dark:bg-black border border-black dark:border-white flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-800 active:translate-y-px transition-all"
              title="Next"
            >
              <SkipForward className="w-3.5 h-3.5 text-black dark:text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
